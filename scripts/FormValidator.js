class FormValidator {

    constructor(validationConfig, form) {
        this.validationConfig = validationConfig;
        this.form = form;
    }

    enableValidation = () => {
        this._setEventListeners();
    }

    _disableButton = (button) => {
        button.setAttribute('disabled', true);
        button.classList.add(this.validationConfig.inactiveButtonClass);
    }

    _enableButton = (button) => {
        button.removeAttribute('disabled');
        button.classList.remove(this.validationConfig.inactiveButtonClass);
    }

    _hasInvalidField = (form) => {
        return form.some(item => !item.validity.valid);
    }

    _checkCurrentValidity = (item) => {
        const inputError = document.querySelector(`#${item.id}-error`)
        if (item.checkValidity()) {
            inputError.textContent = '';
        }
        else {
            inputError.textContent = item.validationMessage;
        }
    }

    _setEventListeners = () => {
        const inputFields = Array.from(this.form.querySelectorAll(this.validationConfig.inputSelector));
        const button = this.form.querySelector(this.validationConfig.submitButtonSelector);
        this.form.addEventListener('reset', () => { this._disableButton(button); })
        inputFields.forEach((field) => field.addEventListener('input', () => {
            this._checkCurrentValidity(field);
            if (field.checkValidity()) {
                field.classList.remove(this.validationConfig.inputErrorClass);
            }
            else {
                field.classList.add(this.validationConfig.inputErrorClass);
            }
            if (this._hasInvalidField(inputFields)) {
                this._disableButton(button);
            }
            else {
                this._enableButton(button);
            }
        }));
    }
}

export default FormValidator;