import { openPopup, popupPicture } from './scripts.js'

class Card {
    constructor(name, url, templateSelector) {
        this._name = name;
        this._url = url;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const newCard = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

        return newCard;
    }

    createCard() {
        this._card = this._getTemplate();
        this._card.querySelector('.element__name').textContent = this._name;
        this._card.querySelector('.element__image').src = this._url;
        this._setEventListeners();
        return this._card;
    }

    _setEventListeners = () => {
        this._card.querySelector('.element__button-delete').addEventListener('click', this._onDelete);
        this._card.querySelector('.element__like-button').addEventListener('click', this._onLike);
        this._card.querySelector('.element__image').addEventListener('click', this._onZoom);
    }

    _onLike = () => {
        this._card.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    _onDelete = () => {
        this._card.remove();
    }

    _onZoom = () => {
        openPopup(popupPicture);
        document.querySelector('.popup__image-full').src = this._url;
        document.querySelector('.popup__image-full').alt = `Фотография ${this._name}`;
        document.querySelector('.popup__image-title').textContent = this._name;
    }


}

// const test = new Card(2, 'https://media.tenor.com/zkVAO6hRoSkAAAAC/pink-hair-anime-girl-anya.gif', '.picture-card-template');
// const test2 = new Card('ssss', 'https://img.freepik.com/premium-photo/anime-girl-watching-sunset-3d-illustration_717906-1415.jpg', '.picture-card-template');

export default Card;