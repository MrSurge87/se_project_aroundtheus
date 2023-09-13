class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //".card__like-button"
    const likeButton = this._cardElement.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("card__like-button_active");
    });

    //".card__delete-button"
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    deleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });

    //get card image
    const imagePreviewModal = document.querySelector("modal__image-preview");
    const imagePreview = imagePreviewModal.querySelector(
      "modal__image-preview"
    );
    const imagePreviewtitle = imagePreviewModal.querySelector(
      ".modal__image-preview-title"
    );
    const cardImageElement = this._cardElement.querySelector(".card__image");
    cardImageElement.addEventListener("click", () => {
      imagePreview.src = this._link;
      imagePreview.alt = `Preview of ${data.name}`;
      imagePreviewtitle.textContent = this._name;
      openModal(imagePreviewModal);
    });
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    //get the card view
    //set event listeners
    this._setEventListeners();
    // return the card
  }
}

export default Card;
