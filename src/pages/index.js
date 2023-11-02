import Card from "../components/Card.js";
import "../pages/index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

//Profile Queries
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");

//Modal Queries
const profileModalForm = profileEditModal.querySelector(".modal__form");
const profileModalName = document.querySelector("#modal-input-name");
const profileModalDescription = document.querySelector(
  "#modal-input-description"
);
const newCardModalTitle = document.querySelector("#modal-input-title");
const newCardModalUrl = document.querySelector("#modal-Url");

//Card Queries
const addNewCardModal = document.querySelector("#add-new-card");
const addNewCardForm = document.querySelector("#add-card-form");
const addNewCardSubmit = document.querySelector("#new-card-submit");
const cardList = document.querySelector(".cards__list");
const cardDeleteButton = document.querySelector(".card__delete");

//API EVENTS
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5f2b588a-250e-4922-b74a-306ecb82bfe6",
    "Content-Type": "application/json",
  },
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
    renderer: generateCard,
  },
  ".cards__list"
);

function generateCard(item) {
  const cardElement = renderCard(item);
  cardSection.addItem(cardElement.getCard());
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

const openImagePopup = new PopupWithForm(
  "#add-new-card",
  handleImageFormSubmit
);
const editProfile = new PopupWithForm("#profile-edit-modal", handleFormSubmit);

editProfile.setEventListeners();
openImagePopup.setEventListeners();

const editFormValidator = new FormValidator(config, profileModalForm);
const cardFormValidator = new FormValidator(config, addNewCardModal);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

//FORM SUBMIT
function handleFormSubmit(data) {
  console.log(data);
  userInfo.setUserInfo(data);
  editProfile.close();
}

// //IMAGE SUBMIT
function handleImageFormSubmit() {
  const name = newCardModalTitle.value;
  const link = newCardModalUrl.value;
  generateCard({ name, link });
  openImagePopup.close();
}

//PROFILE EDIT POPUP
const userInfo = new UserInfo(".profile__title", ".profile__description");

//DELETE CARD

//EDIT PROFILE
profileEditButton.addEventListener("click", () => {
  profileModalName.value = profileName.textContent;
  profileModalDescription.value = profileDescription.textContent.trim();
  editProfile.open();
});

//EVENT LISTENERS
addNewCardButton.addEventListener("click", () => {
  cardFormValidator.toggleButtonState();
  openImagePopup.open();
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userInfo.setUserInfo({ description: data.about, title: data.name });
    //Add Avatar picture info

    cardList = new Section(
      { data: cards, renderer: renderCard },
      ".cards__list"
    );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
