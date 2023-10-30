export default class Card {
  constructor(data, cardSelector, { handleImageClick }) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    //".card__delete-button"
    this._cardElement
      .querySelector(".card__button-delete")
      .addEventListener("click", () => this._handleDeleteCard());

  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  getCard() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    //get the card view
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.style.backgroundImage = `url(${this._link})`;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    //set event listeners
    this._cardImage.addEventListener("click", this._handleImageClick);
    this._setEventListeners();
    // return the card
    return this._cardElement;
  }
}
