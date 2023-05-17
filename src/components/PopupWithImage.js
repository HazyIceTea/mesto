import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._fullImage = this._currentPopup.querySelector('.popup__image-full');
        this._fullImageName = document.querySelector('.popup__image-title');
    }
    open(name, link){
        this._fullImage.alt = name;
        this._fullImage.src = link;
        this._fullImageName.textContent = name;
        super.open();
    }
}