import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const initialCards = [
  {
    name: "Yosemit Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braises",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");
const profileModalName = document.querySelector("#modal-input-name");
const profileModalDescription = document.querySelector(
  "#modal-input-description"
);
const profileModalForm = profileEditModal.querySelector(".modal__form");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditClose = document.querySelector("#profile-modal-close");
const addNewCardClose = document.querySelector("#new-card-close");
const addNewCardSubmit = document.querySelector("#new-card-submit");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardListElement = document.querySelector(".cards__list");
const addNewCardModal = document.querySelector("#add-new-card");
const addNewCardForm = addNewCardModal.querySelector("#add-card-form");
const cardTitleInput = addNewCardModal.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addNewCardModal.querySelector(".modal__input_type_url");
const imagePreviewModal = document.querySelector("#preview-image-modal");
const imagePreview = imagePreviewModal.querySelector(".modal__image-preview");
const imagePreviewTitle = imagePreviewModal.querySelector(
  ".modal__image-preview-title"
);
const imagePreviewClose = imagePreviewModal.querySelector(".modal__close");

const cardSelector = "#card-template";

/* FUNCTIONS */

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEscape);
}

function closeModalEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

[profileEditModal, addNewCardModal, imagePreviewModal].forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("modal") ||
      evt.target.classList.contains("modal__close")
    ) {
      closeModal(modal);
    }
  });
});

function handleImageClick(data) {
  imagePreview.src = data.link;
  imagePreview.alt = `Photo of ${data.name}`;
  imagePreviewTitle.textContent = data.name;

  openModal(imagePreviewModal);
}

//RENDER CARD
function renderCard(data, wrapper) {
  const card = new Card(data, "#card-template", handleImageClick);
  wrapper.prepend(card.getView());
}

//function getCardElement(data) {
//const cardElement = cardTemplate.cloneNode(true);
//const cardImageElement = cardElement.querySelector(".card__image");
//const cardTitleElement = cardElement.querySelector(".card__title");
//const likeButton = cardElement.querySelector(".card__like-button");
//const deleteButton = cardElement.querySelector(".card__button-delete");

//cardImageElement.setAttribute("src", data.link);
//cardImageElement.setAttribute("alt", data.name);
//cardTitleElement.textContent = data.name;

// likeButton.addEventListener("click", () => {
//   likeButton.classList.toggle("card__like-button_active");
// });

// deleteButton.addEventListener("click", () => {
//   cardElement.remove();
// });

// cardImageElement.addEventListener("click", () => {
//   imagePreview.src = data.link;
//   imagePreview.alt = `Preview of ${data.name}`;
//   imagePreviewTitle.textContent = data.name;
//   openModal(imagePreviewModal);
// });

//return cardElement;
//}

/* EVENT HANDLERS */

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileModalName.value;
  profileDescription.textContent = profileModalDescription.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListElement);
  addNewCardForm.reset();
  // diable button
  closeModal(addNewCardModal);
}

/* OPENS EDIT PROFILE */
profileEditButton.addEventListener("click", () => {
  profileModalName.value = profileName.textContent;
  profileModalDescription.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

/* SAVES NAME CHANGE AND DESRIPTION */
profileModalForm.addEventListener("submit", handleProfileFormSubmit);

/* OPENS POPUP TO ADD NEW IMG */
addNewCardButton.addEventListener("click", () => {
  openModal(addNewCardModal);
});

/* SUBMITS NEW CARD IMG */
addNewCardModal.addEventListener("submit", handleAddCardFormSubmit);

/* CARDS FOR EACH */
initialCards.forEach((cardData) => renderCard(cardData, cardListElement));

//VALIDATION
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(config, profileModalForm);
const cardFormValidator = new FormValidator(config, addNewCardModal);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
