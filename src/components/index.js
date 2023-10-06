import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import "../pages/index.css";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

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
const addNewCardButton = document.querySelector(".profile__add-button");

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

function handleImageClick(data) {
  imagePreview.src = data.link;
  imagePreview.alt = `Photo of ${data.name}`;
  imagePreviewTitle.textContent = data.name;
  imagePopup.open(imagePreviewModal);
}

// OPENS EDIT PROFILE
profileEditButton.addEventListener("click", () => {
  profileModalName.value = profileName.textContent;
  profileModalDescription.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

// OPENS POPUP TO ADD NEW IMG
addNewCardButton.addEventListener("click", () => {
  openModal(addNewCardModal);
});

//VALIDATION
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
//SECTION RENDERER
const cardSection = new Section(
  {
    items: initialCards,
    renderer: generateCard,
  },
  ".cards__list"
);
cardSection.renderItems();

function generateCard(item) {
  const cardElement = renderCard(item);
  return cardSection.addItems(cardElement.getCard());
}

//IMAGE POPUP
const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

const editFormValidator = new FormValidator(config, profileModalForm);
const cardFormValidator = new FormValidator(config, addNewCardModal);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

//RENDER CARD
function renderCard(data) {
  const card = new Card(data, "#card-template", {
    handleImageClick: () => imagePopup.open(data),
  });
  return card;
}

//FORM POPUP

const openModalPopup = new PopupWithForm("#add-new-card", handleFormSubmit);
openModalPopup.setEventListeners();

//PROFILE EDIT POPUP
const userInfo = new UserInfo(".profile__title", ".profile__description");
const editProfile = new PopupWithForm("#profile-edit-modal", (data) => {
  userInfo.setUserInfor(data);
  editProfile.close();
});
editProfile.setEventListeners();
