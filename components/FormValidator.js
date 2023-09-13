class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputElement.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorMessageEl = this._formElement.querySelector(
      `#${inputEl.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _checkInputValidity(formElement, inputElement, options) {
    if (!inputElement.validity.valid) {
      return showInputError(formElement, inputElement, options);
    }
    hideInputError(formElement, inputElement, options);
  }

  _toggleButtonState(inputElement, submitButton) {
    if (hasInvalidInput(inputElement)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }
    submitButton.classList.remove(this._inactiveButtonClass);
    submitButton.disabled = false;
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  _setEventListeners(formElement) {
    const { inputSelector, submitButtonSelector } = options;
    const inputElement = [...formElement.querySelectorAll(this._inputSelector)];
    const submitButton = formElement.querySelector(this._submitButtonSelector);
    inputElement.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        checkInputValidity(formElement, inputElement, options);
        toggleButtonState(inputElement, submitButton, options);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
