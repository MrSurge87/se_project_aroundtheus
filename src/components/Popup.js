export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupClose = this._popupElement.querySelector(".modal__close");
  }

  open() {
    //opens popup
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._closeModalEscape);
  }

  close() {
    //closes popup
    this._popupElement.classList.remove(".modal_opened");
    document.removeEventListener("keydown", this._closeModalEscape);
  }

  _closeModalEscape = (evt) => {
    //listens for esc button
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    //sets event listeners
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
