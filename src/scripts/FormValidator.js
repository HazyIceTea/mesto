class FormValidator {

    constructor(validationConfig, form) {
        this.validationConfig = validationConfig;
        this.form = form;
        this.submitButton = this.form.querySelector(this.validationConfig.submitButtonSelector);
        this.inputFields = Array.from(this.form.querySelectorAll(this.validationConfig.inputSelector));
    }

    enableValidation = () => {
        this._setEventListeners();
    }

    _disableButton = () => {
        this.submitButton.setAttribute('disabled', true);
        this.submitButton.classList.add(this.validationConfig.inactiveButtonClass);
    }

    _enableButton = () => {
        this.submitButton.removeAttribute('disabled');
        this.submitButton.classList.remove(this.validationConfig.inactiveButtonClass);
    }

    _toggleButtonState = () => {
        if (this._hasInvalidField()) {
            this._disableButton(this.submitButton);
        }
        else {
            this._enableButton(this.submitButton);
        }
    }

    _hasInvalidField = () => {
        return this.inputFields.some(item => !item.validity.valid);
    }

    _checkCurrentValidity = (item) => {
        const inputError = document.querySelector(`#${item.id}-error`)
        if (item.checkValidity()) {
            item.classList.remove(this.validationConfig.inputErrorClass);
            inputError.textContent = '';
        }
        else {
            item.classList.add(this.validationConfig.inputErrorClass);
            inputError.textContent = item.validationMessage;
        }
    }

    _setEventListeners = () => {
        this.form.addEventListener('reset', () => { this._disableButton(); })
        this.inputFields.forEach((field) => field.addEventListener('input', () => {
            this._checkCurrentValidity(field);
            this._toggleButtonState();
        }));
    }
}

export default FormValidator;