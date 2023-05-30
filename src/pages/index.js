import './index.css';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { validationConfig } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm';
import Api from '../components/Api';

const api = new Api();

const info = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__text', avatarSeceltor: '.profile__avatar' });

function createNewCard(item) {
    const card = new Card({
        data: item, handleCardClick: () => {
            popupImage.open(item.name, item.link);
        },
        handleDeleteClick: (cardId) => {
            popupConfirm.open();
            popupConfirm.submitLogic = (evt) => {
                evt.preventDefault();
                popupConfirm.renderLoading(true)
                api.deleteCard(cardId)
                    .then(card.removeCardFromDom(), popupConfirm.close())
                    .catch(err => console.error(`Ошибка удаления карточки ${err}`))
                    .finally(popupConfirm.renderLoading(false));
            };
            popupConfirm.setSubmit();
        },
        handleLikeClick: (cardId, button) => {
            if (button.classList.contains('element__like-button_active')) {
                api.dislikeCard(cardId)
                    .then(res => card.setLikesAmount(res.likes.length))
                    .catch(err => console.error(`Ошибка обработки лайка карточки ${err}`));
            }
            else {
                api.likeCard(cardId)
                    .then(res => card.setLikesAmount(res.likes.length))
                    .catch(err => console.error(`Ошибка обработки лайка карточки ${err}`));
            }
        }
    }, '.picture-card-template');
    card.myId = info.myId;

    const cardItem = card.createCard();
    return cardItem
}

const nameInput = document.querySelector('.edit-form__input_value_name');
const infoInput = document.querySelector('.edit-form__input_value_job');

//full image
const popupImage = new PopupWithImage('.popup_event_open-picture');
popupImage.setEventListeners();

//confirmation popup
const popupConfirm = new PopupConfirm('.popup_event_confirm');
popupConfirm.setEventListeners();

// форма смены аватара
const popupAvatar = new PopupWithForm('.popup_event_update-avatar', (evt) => {
    evt.preventDefault();
    popupAvatar.renderLoading(true);
    api.changeAvatar(popupAvatar.getInputValues())
        .then(res => info.setUserInfo(res), popupAvatar.close())
        .catch(err => console.error(`Ошибка смены аватара ${err}`))
        .finally(popupAvatar.renderLoading(false));
});
popupAvatar.setEventListeners();

// связующая секция
const initialSection = new Section(
    (item) => {
        initialSection.addItem(createNewCard(item));
    }
    , '.elements');


Array.from(document.forms).forEach(item => {
    const toValidate = new FormValidator(validationConfig, item);
    toValidate.enableValidation()
})

// open buttons
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const buttonOpenAvatarPopup = document.querySelector('.profile__avatar-button')

// форма редактирования профиля
const popupEditProfile = new PopupWithForm('.popup_event_edit', (evt) => {
    evt.preventDefault();
    popupEditProfile.renderLoading(true);
    api.sendUserInfo(popupEditProfile.getInputValues())
        .then((res) => info.setUserInfo(res), popupEditProfile.close())
        .catch(err => console.error(`Ошибка изменения профиля ${err}`))
        .finally(popupEditProfile.renderLoading(false))
})
popupEditProfile.setEventListeners();

// изначальная отрисовка страницы
Promise.all([api.getUserInfo(), api.getAllCards()])
    .then(([userRes, cardRes]) => {
        info.myId = userRes._id; // get id
        info.setUserInfo(userRes); // set info on page
        initialSection.renderAll(cardRes.reverse()); //render all cards from server
    })
    .catch(err => console.error(`Ошибка при загрузке начальных данных страницы ${err}`))

// форма добавления карточки
const popupAddCard = new PopupWithForm('.popup_event_add-card', (evt) => {
    evt.preventDefault();
    popupAddCard.renderLoading(true);
    api.sendCard(popupAddCard.getInputValues())
        .then(res => initialSection.renderCard(res), popupAddCard.close())
        .catch(err => console.error(`Ошибка отправки карточки ${err}`))
        .finally(popupAddCard.renderLoading(false));
})
popupAddCard.setEventListeners();

// button listeners
buttonOpenEditProfilePopup.addEventListener('click', () => {
    popupEditProfile.open();
    const infoObject = info.getUserInfo();
    nameInput.value = infoObject.name;
    infoInput.value = infoObject.info;
});

buttonOpenAddCardPopup.addEventListener('click', () => {
    popupAddCard.open();
})

buttonOpenAvatarPopup.addEventListener('click', () => {
    popupAvatar.open();
})

