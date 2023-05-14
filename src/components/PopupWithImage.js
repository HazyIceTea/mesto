import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, src){
        super(popupSelector);
        this.src = src;
        this.alt = '';
        this._fullImage = this._currentPopup.querySelector('.popup__image-full');
    }
    open(){
        this._fullImage.alt = this.alt;
        this._fullImage.src = this.src;
        super.open();
    }
}