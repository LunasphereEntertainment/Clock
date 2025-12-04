/**
 * @typedef {{ detail: { time: Date }}} ClockTickEvent
 */

class ClockReadout extends HTMLElement {
    dateFormatter = new DateFormatter();
    timeFormatter = new TimeFormatter();

    connectedCallback() {
        this.parentElement.addEventListener(
            'tick',
            /**
             * 
             * @param {ClockTickEvent} event 
             */
            (event) => {
                this.renderTime(event.detail);
            })

        this.timeText = document.createElement('h1');
        this.timeText.className = "clock-readout";
        this.timeText.innerText = "XX : XX : XX"
        
        this.dateText = document.createElement('h3');
        this.dateText.className = "clock-readout";

        // this.className = "clock-face"

        this.replaceChildren(this.timeText, this.dateText);
    }

    /**
     * 
     * @param {ClockUpdateEvent} event
     */
    renderTime({ time }) {
        this.timeText.innerText = this.timeFormatter.format(time);

        this.dateText.innerHTML = this.dateFormatter.format(time);
    }
}

customElements.define('clock-readout', ClockReadout)