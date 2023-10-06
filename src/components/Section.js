export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderItems() {
    // use this._renderer to create the elements for rendering
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItems(item) {
    // take the item and render it into this._element
    this._selector.prepend(item);
  }
}
