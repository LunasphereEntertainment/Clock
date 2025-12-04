/**
 * 
 * @param {keyof HTMLElementTagNameMap} tagName tag of element to create
 * @param {string} classNames optional list of class names to apply to the new element
 * @param {CSSStyleDeclaration} style optional collection of in-line styles to apply to the element
 * @returns 
 */
function createElement(tagName, classNames, style) {
    const elem = document.createElement(tagName);
    if (classNames) elem.className = classNames;
    if (style) elem.style = style;
    return elem;
}