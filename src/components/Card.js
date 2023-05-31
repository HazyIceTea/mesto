class Card {
    constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick }, templateSelector) {
        this._name = data.name;
        this._url = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick; 
        this._handleDeleteClick = handleDeleteClick;
        this._ownerId = data.owner._id;
        this._card = this._getTemplate();
        this._deleteButton = this._card.querySelector('.element__button-delete');
        this._buttonLike = this._card.querySelector('.element__like-button');
        this._likes = data.likes;
        this._likesAmount = data.likes.length;
        this._likesCounter = this._card.querySelector('.element__like-button-counter');
        this._cardId = data._id;
        this._handleLikeClick = handleLikeClick;
    }

    _getTemplate() {
        const newCard = document.querySelector(this._templateSelector)
        .content.querySelector('.element')
        .cloneNode(true);

        return newCard;
    }

    createCard() {
        this._cardImage = this._card.querySelector('.element__image');
        this._cardImage.alt = (`Фотография ${this._name}`);
        this._card.querySelector('.element__name').textContent = this._name;
        this._cardImage.src = this._url;
        this._setEventListeners();
        this._removeDeleteButton();
        this._handleLikes();
        return this._card;
    }

    _setEventListeners = () => {
        this._buttonLike.addEventListener('click', this._onLike);
        this._cardImage.addEventListener('click', this._handleCardClick);
        this._deleteButton.addEventListener('click', this._onDelete);
    }

    _onLike = () => {
        this._handleLikeClick(this._cardId, this._buttonLike);
    }

    setLikesAmount(likes){
        this._likesCounter.textContent = likes;
        this._buttonLike.classList.toggle('element__like-button_active');
    }

    _onDelete = () => {
        this._handleDeleteClick(this._cardId);
    }

    removeCardFromDom(){
        this._card.remove();
        this._card = null;
    }
    _removeDeleteButton(){
        if(this.myId != this._ownerId){
            this._deleteButton.remove();
        }
    }

    _handleLikes(){
        this._likes.forEach(item => {
            if(item._id == this.myId){
                this._buttonLike.classList.add('element__like-button_active');
                return
            }
        })
        this._likesCounter.textContent = this._likesAmount;
    }

}

export default Card;