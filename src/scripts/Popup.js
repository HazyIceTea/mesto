class Popup {
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

class PopupWithImage extends Popup {
    constructor(popupSelector, src){
        super(popupSelector);
        this._src = src;
    }
    open(){
        this._currentPopup.querySelector('.popup__image-full').src = this._src;
        super.open();
    }
}

class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitLogic){
        super(popupSelector);
        this._submit = formSubmitLogic;
        this._currentForm = this._currentPopup.querySelector('.edit-form');
    }

    getInputValues(){
        const inputs = this._currentForm.querySelectorAll('.edit-form__input');
        const values = {};
        values.name = inputs[0].value;
        values.link = inputs[1].value;
        return values;
    }

    setEventListeners(){
        super.setEventListeners();
        this._currentForm.addEventListener('submit', this._submit)
    }

    close(){
        super.close();
        this._currentForm.reset();
    }


}

export {Popup, PopupWithForm, PopupWithImage};