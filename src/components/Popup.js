export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._currentPopup = document.querySelector(popupSelector);
    }

    open() {
        this._currentPopup.classList.add('popup_opened');
        document.addEventListener('keydown', evt => {this._handleEscClose(evt)});
    }

    close() {
        this._currentPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', evt => {this._handleEscClose(evt)});
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
        })
    }

}