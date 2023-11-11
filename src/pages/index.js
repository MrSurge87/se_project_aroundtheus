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
const profilePicButton = document.querySelector(".profile__image-button");
const profilePicModal = document.querySelector("#profile__image-edit");
const profilePicUrl = document.querySelector("#modal-input-url");
const profileImage = document.querySelector(".profile__image");

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
    handleDeleteClick,
    handleCardLike
  });
  return card;
}

//IMAGE POPUP
const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

//DELETE CARD POPUP
const deleteCardPopup = new PopupWithConfirmation("#card__delete-modal");
deleteCardPopup.setEventListeners();


function handleDeleteClick(card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.setSubmitText(true, "Deleting...");
    api
      .deleteCard(card.id)
      .then(() => {
        deleteCardPopup.setSubmitText(true, "Deleted...");
        deleteCardPopup.close();
        card.removeCard();
      })
      .catch((err) => console.log(err))
      .finally(() => deleteCardPopup.setSubmitText(false));
  });
}



//FORM POPUP
const openImagePopup = new PopupWithForm(
  "#add-new-card",
  handleImageFormSubmit
);
const editProfile = new PopupWithForm("#profile-edit-modal", handleFormSubmit);
const profilePicEdit = new PopupWithForm(
  "#profile__image-edit",
  profilePicEditSubmit
);

editProfile.setEventListeners();
profilePicEdit.setEventListeners();
openImagePopup.setEventListeners();

const handleEditFormSubmit = new FormValidator(config, profileModalForm);
const handleProfileFormSubmit = new FormValidator(config, profilePicModal);
const handleCardFormSubmit = new FormValidator(config, addNewCardModal);

handleEditFormSubmit.enableValidation();
handleProfileFormSubmit.enableValidation();
handleCardFormSubmit.enableValidation();

//FORM SUBMIT
function handleFormSubmit(data) {
  editProfile.setSubmitText(true, "Saving...");
  api
    .profileUpdate(data)
    .then(() => {
      userInfo.setUserInfo(data);
      editProfile.setSubmitText(false);
      editProfile.close();
    })
    .catch((err) => {
      console.log(err);
    });

}

// //IMAGE SUBMIT
function handleImageFormSubmit(data) {
  const name = data.name;
  const link = data.url;
  openImagePopup.setSubmitText(true, "Saving...");
  api
    .addCard(name, link)
    .then((card) => {
      generateCard(card);
      openImagePopup.setSubmitText(false)
      openImagePopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
  
}

function profilePicEditSubmit() {
  const url = profilePicUrl.value;
  api
    .updateProfileAvatar(url)
    .then(() => {
      profileImage.src = url;
      profilePicEdit.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

//IMAGE LIKE
function handleCardLike(card) {
  const newLikeStatus = !card.isLiked;
  if(newLikeStatus) {
    api.cardLike(card.getId())
    .then((res) => {
      card.setLikeStatus(res.isLiked);
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    api.removeLike(card.getId())
    .then((res) => {
      card.setLikeStatus(res.isLiked);
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

//PROFILE EDIT POPUP
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__description",
  ".profile__image"
);

//EVENT LISTENERS
profileEditButton.addEventListener("click", () => {
  profileModalName.value = profileName.textContent;
  profileModalDescription.value = profileDescription.textContent.trim();
  editProfile.open();
});

addNewCardButton.addEventListener("click", () => {
  handleCardFormSubmit.toggleButtonState();
  openImagePopup.open();
});

profilePicButton.addEventListener("click", () => {
  profilePicEdit.open();
});

//API CALLS
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userInfo.setUserInfo({
      about: data.about,
      title: data.name,
      avatar: data.avatar,
    });
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });
