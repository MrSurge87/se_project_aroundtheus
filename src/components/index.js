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

//Profile Queries
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");

//Modal Queries
const profileModalForm = profileEditModal.querySelector(".modal__form");
const profileModalName = document.querySelector("#modal-input-name");
const profileModalDescription = document.querySelector("#modal-input-description");
const newCardModalTitle = document.querySelector("#modal-input-title");
const newCardModalUrl = document.querySelector("#modal-Url")

//Card Queries
const addNewCardModal = document.querySelector("#add-new-card");
const addNewCardSubmit = document.querySelector("#new-card-submit");
const cardList = document.querySelector(".cards__list");


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

//RENDER CARD
function renderCard(data) {
  const card = new Card(data, "#card-template", {
    handleImageClick: () => imagePopup.open(data),
  });
  return card;
}

//IMAGE POPUP
const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

//FORM POPUP

const openImagePopup = new PopupWithForm("#add-new-card", handleImageFormSubmit);
const openFormPopup = new PopupWithForm("#profile-edit-modal", handleFormSubmit);
openFormPopup.setEventListeners();
openImagePopup.setEventListeners();

const editFormValidator = new FormValidator(config, profileModalForm);
const cardFormValidator = new FormValidator(config, addNewCardModal);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

//FORM SUBMIT
function handleFormSubmit() {
  profileName.textContent = profileModalName.value;
  profileDescription.textContent = profileModalDescription.value;
  editProfile.close();
}


// //IMAGE SUBMIT
function handleImageFormSubmit() {
  const name = newCardModalTitle.value;
  const link = newCardModalUrl.value;
  const card = renderCard({ name, link });
  cardList.prepend(card);
  addNewCardModal.reset();
  cardFormValidator.toggleButtonState();
  addNewCardModal.close();
}

//PROFILE EDIT POPUP
const userInfo = new UserInfo(".profile__title", ".profile__description");
const editProfile = new PopupWithForm("#profile-edit-modal", (data) => {
  userInfo.setUserInfo(data);
});
editProfile.setEventListeners();

//EDIT PROFILE
profileEditButton.addEventListener("click", () => {
  profileModalName.value = profileName.textContent;
  profileModalDescription.value = profileDescription.textContent.trim();
  openFormPopup.open();
});

//EVENT LISTENERS
addNewCardButton.addEventListener("click", () => {
  openImagePopup.open();
});
// addNewCardSubmit.addEventListener("click", () => {
//   addNewCardModal.close();
// });


