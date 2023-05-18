import './index.css';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import { initialCards, validationConfig } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

function createNewCard(item) {
    const card = new Card({
        data: item, handleCardClick: () => {
            imagePopup.open(item.name, item.link);
        }
    }, '.picture-card-template');
    const cardItem = card.createCard();
    return cardItem
}

const info = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__text' });

const nameInput = document.querySelector('.edit-form__input_value_name');
const infoInput = document.querySelector('.edit-form__input_value_job');

const imagePopup = new PopupWithImage('.popup_event_open-picture');
imagePopup.setEventListeners();

const initialSection = new Section({
    items: initialCards, renderer: (item) => {
        initialSection.addItem(createNewCard(item));
    }
}, '.elements');


Array.from(document.forms).forEach(item => {
    const toValidate = new FormValidator(validationConfig, item);
    toValidate.enableValidation()
})

initialSection.renderAll();

// // open buttons
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');

const popupEditProfile = new PopupWithForm('.popup_event_edit', (evt) => {
    evt.preventDefault();
    info.setUserInfo(popupEditProfile.getInputValues());
    popupEditProfile.close();
})
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_event_add-card', (evt) => {
    evt.preventDefault();
    initialSection.cardData = popupAddCard.getInputValues();
    initialSection.renderCard();
    popupAddCard.close();
})
popupAddCard.setEventListeners();

buttonOpenEditProfilePopup.addEventListener('click', () => {
    popupEditProfile.open();
    const infoObject = info.getUserInfo();
    nameInput.value = infoObject.name;
    infoInput.value = infoObject.info; 
});

buttonOpenAddCardPopup.addEventListener('click', () => {
    popupAddCard.open();
})
