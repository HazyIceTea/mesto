import './index.css'; //Перепроверил всё по стилям, должно подключаться, скриншот был битый, так что не видел что там
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { initialCards, validationConfig } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

Array.from(document.forms).forEach(item => {
    const toValidate = new FormValidator(validationConfig, item);
    toValidate.enableValidation()
})

const imagePopup = new PopupWithImage('.popup_event_open-picture', '');
imagePopup.setEventListeners();

const initialSection = new Section({
    items: initialCards, renderer: (item) => {
        const card = new Card({
            data: item, handleCardClick: () => {
                imagePopup.src = item.link;
                imagePopup.alt = item.name;
                document.querySelector('.popup__image-title').textContent = item.name;
                imagePopup.open();
            }
        }, '.picture-card-template');
        const cardItem = card.createCard();
        initialSection.addItem(cardItem);
    }
}, '.elements');

initialSection.renderAll();

// // open buttons
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');

const popupEditProfile = new PopupWithForm('.popup_event_edit', (evt) => {
    evt.preventDefault();
    const info = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__text' });
    info.setUserInfo(popupEditProfile.getInputValues());
    popupEditProfile.close();
})
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_event_add-card', (evt) => {
    evt.preventDefault();
    const newCardSection = new Section({
        items: popupAddCard.getInputValues(), renderer: (item) => {
            const card = new Card({
                data: item, handleCardClick: () => {
                    const imagePopup = new PopupWithImage('.popup_event_open-picture', item.link);
                    imagePopup.alt = item.name;
                    document.querySelector('.popup__image-title').textContent = item.name;
                    imagePopup.setEventListeners();
                    imagePopup.open();
                }
            }, '.picture-card-template');
            const cardItem = card.createCard();
            newCardSection.addItem(cardItem);
            popupAddCard.close();

        }
    }, '.elements');
    newCardSection.renderCard();
})
popupAddCard.setEventListeners();

buttonOpenEditProfilePopup.addEventListener('click', () => {
    popupEditProfile.open();
});

buttonOpenAddCardPopup.addEventListener('click', () => {
    popupAddCard.open();
})
