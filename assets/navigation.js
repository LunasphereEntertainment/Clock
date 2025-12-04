class FeatureNavigation extends HTMLElement {
    /** @type {HTMLAnchorElement[]} */
    navItems;

    constructor() {
        super();
        this.navItems = this.querySelectorAll("a");
    }

    connectedCallback() {
        const container = createElement('nav', 'container');
        container.append(...this.navItems);

        this.appendChild(container);
    }
}

customElements.define('clock-nav', FeatureNavigation);