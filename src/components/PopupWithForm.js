import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = this._popupForm.querySelectorAll(".modal__input");
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setSubmitText(submit, submitText = "Saving..."){
    if (submit) {
        this._popupSubmit.textContent = submitText;
    } else {
        this._popupSubmit.textContent = "Yes";
    }
}

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () => {
      //evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });

  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
