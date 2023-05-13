// import { openPopup, popupPicture, imageFull, imageTitle } from './scripts.js'

class Card {
    constructor({ data, handleCardClick }, templateSelector) {
        this._name = data.name;
        this._url = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick; 
    }

    _getTemplate() {
        const newCard = document.querySelector(this._templateSelector)
        .content.querySelector('.element')
        .cloneNode(true);

        return newCard;
    }

    createCard() {
        this._card = this._getTemplate();
        this._cardImage = this._card.querySelector('.element__image');
        this._cardImage.alt = (`Фотография ${this._name}`);
        this._card.querySelector('.element__name').textContent = this._name;
        this._cardImage.src = this._url;
        this._setEventListeners();
        return this._card;
    }

    _setEventListeners = () => {
        this._card.querySelector('.element__button-delete').addEventListener('click', this._onDelete);
        this._buttonLike = this._card.querySelector('.element__like-button')
        this._buttonLike.addEventListener('click', this._onLike);
        this._cardImage.addEventListener('click', this._handleCardClick);
    }

    _onLike = () => {
        this._buttonLike.classList.toggle('element__like-button_active');
    }

    _onDelete = () => {
        this._card.remove();
        this._card = null;
    }

    // _onZoom = () => {
    //     openPopup(popupPicture);
    //     imageFull.src = this._url;
    //     imageFull.alt = `Фотография ${this._name}`;
    //     imageTitle.textContent = this._name;
    // }

}

export default Card;