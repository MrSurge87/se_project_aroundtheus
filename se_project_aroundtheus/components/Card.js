export default class Card {
  constructor(initialCards, cardSelector, handleImageClick) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //".card__image"
    //".modal__image-preview"
    //".modal__image-preview-title"
    this._cardElement
      .querySelector(".card__image")
      .setAttribute("src", this._link)
      .addEventListener("click", () => {
        this._cardElement
          .querySelector(".modal__image-preview")
          .setAttribute("src", this._link);
        this._cardElement
          .querySelector(".modal__image-preview")
          .setAttribute("alt", `Preview of ${this._name}`);
        this._cardElement.querySelector(
          "modal__image-preview-title"
        ).textContent = this._name;
      });

    //".card_-title"
    this._cardElement
      .querySelector(".card__title")
      .setAttribute("alt", this._name);
    this._cardElement.querySelector(".card__title").textContent = this._name;

    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    //".card__button-delete"
    this._cardElement
      .querySelector("card__button-delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    //handleImageClick
    this._cardElement.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  // FUNCTIONS

  _openModal(modal) {
    modal.classLIst.remove("modal_opened");
    document.removeEventListener("keydown", closeModalEscape);
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    //get the card view
    //set event listeners
    this._setEventListeners();
    //return the card
  }
}
