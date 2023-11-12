import Card from "../components/Card.js";
import "../pages/index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  profileEditButton,
  addNewCardButton,
  profilePicButton,
  profilePicModal,
  profileImage,
  profileModalForm,
  profileModalName,
  profileModalDescription,
  addNewCardModal,
  config,
} from "../utils/constants.js";

//API EVENTS
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5f2b588a-250e-4922-b74a-306ecb82bfe6",
    "Content-Type": "application/json",
  },
});

//SECTION RENDERER
const cardSection = new Section(
  {
    renderer: generateCard,
  },
  ".cards__list"
);

function generateCard(item) {
  const cardElement = renderCard(item);
  cardSection.addItem(cardElement);
}

//RENDER CARD
function renderCard(data) {
  const card = new Card(data, "#card-template", {
    handleImageClick: () => imagePopup.open(data),
    handleDeleteClick,
    handleCardLike,
  });
  return card.getCard();
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

const profileFormValidator = new FormValidator(config, profileModalForm);
const avatarFormValidator = new FormValidator(config, profilePicModal);
const cardFormValidator = new FormValidator(config, addNewCardModal);

profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();
cardFormValidator.enableValidation();

//FORM SUBMIT
function handleFormSubmit(data) {
  editProfile.setSubmitText(true, "Saving...");
  api
    .profileUpdate(data)
    .then(() => {
      userInfo.setUserInfo(data);
      editProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => editProfile.setSubmitText(false));
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
      openImagePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => openImagePopup.setSubmitText(false));
}

function profilePicEditSubmit(data) {
  profilePicEdit.setSubmitText(true, "Loading...");
  api
    .updateProfileAvatar(data.url)
    .then((data) => {
      userInfo.setUserInfo(data);
      profilePicEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => profilePicEdit.setSubmitText(false));
}

//IMAGE LIKE
function handleCardLike(card) {
  const newLikeStatus = !card.isLiked;
  if (newLikeStatus) {
    api
      .cardLike(card.getId())
      .then((res) => {
        card.setLikeStatus(res.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .removeLike(card.getId())
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
  const currentUser = userInfo.getUserInfo();
  profileModalName.value = currentUser.name;
  profileModalDescription.value = currentUser.title;
  editProfile.open();
});

addNewCardButton.addEventListener("click", () => {
  cardFormValidator.toggleButtonState();
  openImagePopup.open();
});

profilePicButton.addEventListener("click", () => {
  avatarFormValidator.toggleButtonState();
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
