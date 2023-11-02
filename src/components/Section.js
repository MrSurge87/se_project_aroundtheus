export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    // use this._renderer to create the elements for rendering
    items.forEach(this._renderer);
  }

  addItem(item) {
    // take the item and render it into this._element
    this._container.prepend(item);
  }
}
