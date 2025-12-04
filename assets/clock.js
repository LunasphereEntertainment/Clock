class Clock extends HTMLElement {
    connectedCallback() {
        setInterval(this._tick.bind(this), 1000);

        this.minutesHand = document.createElement('clock-mins-hand');
        this.hoursHand = document.createElement('clock-hour-hand');
        this.clockReadout = document.createElement('clock-readout');

        this.appendChild(this.minutesHand);
        this.appendChild(this.hoursHand);
        this.appendChild(this.clockReadout);

        this.addEventListener('click', () => {
            this.toggleExpansion();
        })
    }

    toggleExpansion() {
        this._expanded = !this._expanded;

        if (this._expanded) this.classList.add('expanded');
        else this.classList.remove('expanded');
    }

    _tick() {
        const now = new Date();

        this.dispatchEvent(new CustomEvent('tick', { detail: { time: now } }));
    }
}

customElements.define('luna-clock', Clock);
