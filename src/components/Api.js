export default class Api {
    constructor(){
        this._checkRes = (res => res.ok ? res.json() : Promise.reject);
        this._authCode = 'b66b2bcb-af09-40bb-b429-5ea9d883fa32';
    }

    getAllCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
            method: 'GET',
            headers: {
                authorization: this._authCode
            }
        })
        .then(this._checkRes)
    }

    sendCard(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards', {
            method: 'POST',
            headers: {
                authorization: this._authCode,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._checkRes)
    }

    deleteCard(cardId) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/cards/' + cardId, {
            method: 'DELETE',
            headers: {
                authorization: this._authCode
            }
        })
        .then(this._checkRes)
    }

    getUserInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me', {
            method: 'GET',
            headers: {
                authorization: this._authCode
            }
        })
        .then(this._checkRes)
    }

    sendUserInfo(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me', {
            method: 'PATCH',
            headers: {
                authorization: this._authCode,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.info
            })
        })
        .then(this._checkRes)
    }

    changeAvatar(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: this._authCode,
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._checkRes)
    }

    likeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._authCode,
            }
        })
        .then(this._checkRes)
    }

    dislikeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._authCode
            }
        })
        .then(this._checkRes)
    }
}