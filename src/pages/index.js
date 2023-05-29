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

api.getUserInfo()
    .then(res => info.myId = res._id)
    .catch(err => console.error(`Ошибка получения ID ${err}`)); // get id

function createNewCard(item) {
    const card = new Card({
        data: item, handleCardClick: () => {
            popupImage.open(item.name, item.link);
        },
        handleDeleteClick: (cardId) => {
            popupConfirm.open();
            popupConfirm.submitLogic = () => {
                api.deleteCard(cardId)
                    .catch(err => console.error(`Ошибка удаления карточки ${err}`));
                card.removeCardFromDom();
                popupConfirm.close();
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
    api.changeAvatar(popupAvatar.getInputValues())
        .then(res => info.setUserInfo(res))
        .catch(err => console.error(`Ошибка смены аватара ${err}`));
    popupAvatar.close();
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
        .then((res) => info.setUserInfo(res))
        .catch(err => console.error(`Ошибка изменения профиля ${err}`));
    popupEditProfile.renderLoading(false);
    popupEditProfile.close();
})
popupEditProfile.setEventListeners();

// Изначальная отрисовка страницы
api.getUserInfo()
    .then(res => info.setUserInfo(res))
    .catch(err => console.error(`Ошибка получения информации о пользователе ${err}`)); //установить инфо с сервера в профиль
api.getAllCards()
    .then(res => initialSection.renderAll(res.reverse()))
    .catch(err => console.error(`Ошибка получения карточек с сервера ${err}`)) //грузануть карточки

// форма добавления карточки
const popupAddCard = new PopupWithForm('.popup_event_add-card', (evt) => {
    evt.preventDefault();
    initialSection.cardData = popupAddCard.getInputValues();
    initialSection.cardData.owner = {};
    initialSection.cardData.owner._id = info.myId;
    initialSection.cardData.likes = [];
    initialSection.renderCard();
    api.sendCard(initialSection.cardData)
        .catch(err => console.error(`Ошибка отправки карточки ${err}`));
    popupAddCard.close();
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

