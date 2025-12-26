const loadClockHandSvg = async () => {
    const res = await fetch("/assets/clock-hand.svg");

    if (!res.ok) throw new Error('fetch clock-hand.svg returned status:', res.status);

    const svg = await res.text();

    const parser = new DOMParser();
    return parser.parseFromString(svg, 'image/svg+xml').querySelector("svg");
}

/**
 * @typedef {CustomEvent} ClockTickEvent
 * @property {{ time: Date }} detail event data
 */

class ClockHand extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        this.replaceChildren(await loadClockHandSvg());
        
        this.hand = this.querySelector("svg");

        this.parentElement.addEventListener(
            'tick',
            /**
            * @param {ClockTickEvent} event
            */
            (event) => {
                this.updatePosition(event.detail);
            }
        );
    }

    /**
     * @param {ClockTickEvent} event
     */
    updatePosition({ time }) {
        throw new Error('not yet implemented');
    }
}

class MinutesHand extends ClockHand {
    /**
     * @param {ClockTickEvent} event
     */
    updatePosition({ time }) {
        const progress = time.getMinutes() / 60;
        this.hand.style.transform = `rotate(${progress * 360}deg)`;
    }
}

class HourHand extends ClockHand {
    /**
     * @param {ClockTickEvent} time
     */
    updatePosition({ time }) {
        const progress = (time.getHours() % 12) / 12;
        this.hand.style.transform = `rotate(${progress * 360}deg)`;
    }
}

customElements.define('clock-mins-hand', MinutesHand);
customElements.define('clock-hour-hand', HourHand);