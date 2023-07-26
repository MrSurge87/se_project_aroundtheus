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

/* ELEMENTS */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditClose = document.querySelector("#profile-modal-close");
const profileName = document.querySelector("#profile__name");
const profileDescription = document.querySelector("#profile__description");
const profileModalName = document.querySelector("#modal-input-name");
const profileModalDescription = document.querySelector(
  "#modal-input-description"
);
const profileModalForm = profileEditModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* FUNCTIONS */

function closeEditModal() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardImageElement.setAttribute("src", data.link);
  cardImageElement.setAttribute("alt", data.name);
  cardTitleElement.textContent = data.name;
  return cardElement;
}

/* EVENT HANDLERS */

function handleProfileModalSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileModalName.value;
  profileDescription.textContent = profileModalDescription.value;
  closeEditModal();
}

/* EVENT LISTENERS */

profileEditButton.addEventListener("click", () => {
  profileModalName.value = profileName.textContent;
  profileModalDescription.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileEditClose.addEventListener("click", closeEditModal);

profileModalForm.addEventListener("submit", handleProfileModalSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardListElement.prepend(cardElement);
});
