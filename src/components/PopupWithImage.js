import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__image-preview");
    this._caption = document.querySelector(".modal__image-preview-title");
  }

  open(data) {
    this._image.src = data.link;
    this._image.alt = `Photo of ${data.name}`;
    this._caption.textContent = data.name;
    super.open();
  }
}
