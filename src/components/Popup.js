export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._currentPopup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._submitButton = this._currentPopup.querySelector('.edit-form__save-button');
    }

    open() {
        this._currentPopup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._currentPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key == 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._currentPopup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        });
    }
}