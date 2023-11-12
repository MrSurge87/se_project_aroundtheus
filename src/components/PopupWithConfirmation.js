import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupConfirm = this._popupElement.querySelector(".modal__form");
    this._popupSubmit = this._popupElement.querySelector(
      ".modal__button-delete"
    );
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setSubmitText(submit, submitText = "Saving...") {
    if (submit) {
      this._popupSubmit.textContent = submitText;
    } else {
      this._popupSubmit.textContent = "Yes";
    }
  }

  setEventListeners() {
    this._popupConfirm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}
