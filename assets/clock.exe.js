class Clock {
    constructor() {
        this.currentTime = new Date();

        this._loop = setInterval(this._update.bind(this), 1000);

        this._listeners = {};
    }

    registerListener(name, cb) {
        this._listeners[name] = cb;
    }

    deregisterListener(name) {
        delete this._listeners[name];
    }

    _update() {
        const currentTime = new Date(),
            hourProgress = this.currentTime.getHours() / 12,
            minuteProgress = this.currentTime.getMinutes() / 60;

        const event = new ClockUpdateEvent(currentTime, hourProgress, minuteProgress);

        for (let name in this._listeners) {
            this._listeners[name](event);
        }
    }

    deregister() {
        clearInterval(this._loop);
    }
}

class ClockUpdateEvent {
    constructor(currentTime, hourProgress, minuteProgress) {
        this.currentTime = currentTime;
        this.hourProgress = hourProgress;
        this.minuteProgress = minuteProgress;
    }
}

class AnalogClockRenderer {
    constructor(containerSelector) {
        const container = document.querySelector(containerSelector);

        if (container) {
            this._elems = {
                hour_hand: container.querySelector('#hours'),
                minute_hand: container.querySelector('#minutes'),
            };

        } else {
            throw new Error("Container Selector must match a valid DOM element.");
        }
    }

    update(event) {
        const { hourProgress, minuteProgress } = event;

        let hh = this._elems.hour_hand,
            mh = this._elems.minute_hand;

        if (!hh || !mh)
            return

        const hourDegrees = simplifyRotation(hourProgress * 360),
            minuteDegrees = simplifyRotation(minuteProgress * 360);

        hh.style.transform = `rotate(${hourDegrees}deg)`;
        mh.style.transform = `rotate(${minuteDegrees}deg)`;
    }
}

class DigitalClockRenderer {
    constructor(containerSelector, options) {
        const container = document.querySelector(containerSelector);
        this._options = options || {};

        if (container) {
            // Initialise/set elems
            this._elems = {
                timeReadout: container.querySelector('#timeReadout'),
                dateReadout: container.querySelector('#dateReadout')
            };

        } else {
            throw new Error("Container Selector must match a valid DOM element.");
        }
    }

    update(event) {
        const { currentTime } = event;

        let tR = this._elems.timeReadout,
            dR = this._elems.dateReadout;

        if (tR) {
            let hours = pad(currentTime.getHours(), 2),
                mins =  pad(currentTime.getMinutes(), 2),
                secs = pad(currentTime.getSeconds(), 2);

            tR.innerHTML = `${hours} : ${mins} : ${secs}`;
        }

        if (dR) {
            // Check if DateFormatter is configure
            //  if not, instantiate new default one
            if (!this._options.formatter)
                this._options.formatter = new DateFormatter();

            dR.innerHTML = this._options.formatter.format(currentTime);
        }
    }
}
