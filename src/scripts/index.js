import Card from './Card.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';
import { Popup, PopupWithForm, PopupWithImage } from './Popup.js'
import { initialCards, validationConfig } from './constants.js';
import FormValidator from './FormValidator.js';
import '../pages/index.css';

Array.from(document.forms).forEach(item => {
    const toValidate = new FormValidator(validationConfig, item);
    toValidate.enableValidation()
})

const initialSection = new Section({
    items: initialCards, renderer: (item) => {
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
        initialSection.addItem(cardItem);
    }
}, '.elements');

initialSection.renderAll();

// // popup bodies
// const popups = Array.from(document.querySelectorAll('.popup'));
// const popupEdit = document.querySelector('.popup_event_edit');
// const popupAdd = document.querySelector('.popup_event_add-card');
// const popupPicture = document.querySelector('.popup_event_open-picture');

// // open buttons
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');

const popupEditProfile = new PopupWithForm('.popup_event_edit', (evt) => {
    evt.preventDefault();
    const info = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__text' });
    info.setUserInfo(popupEditProfile.getInputValues());
    popupEditProfile.close();
})

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

buttonOpenEditProfilePopup.addEventListener('click', () => {
    popupEditProfile.setEventListeners();
    popupEditProfile.open();
});

buttonOpenAddCardPopup.addEventListener('click', () => {
    popupAddCard.setEventListeners();
    popupAddCard.open();
})


// // popup edit
// const nameInput = document.querySelector('.edit-form__input_value_name');
// const jobInput = document.querySelector('.edit-form__input_value_job');
// const formEditProfile = document.forms['profile-edit'];
// const nameNew = document.querySelector('.profile__name');
// const jobNew = document.querySelector('.profile__text');

// // pictures elements here
// const pictureAddForm = document.forms['add-card'];
// const imageList = document.querySelector('.elements');
// const cardName = document.querySelector('.edit-form__input_value_card-name');
// const cardSource = document.querySelector('.edit-form__input_value_image-src');
// const imageFull = document.querySelector('.popup__image-full');
// const imageTitle = document.querySelector('.popup__image-title');

// // handlers
// function handleProfileFormSubmit(evt) {
//     evt.preventDefault();
//     nameNew.textContent = nameInput.value;
//     jobNew.textContent = jobInput.value;
//     closePopup(popupEdit);
// }

// function handleAddFormSubmit(evt) {
//     evt.preventDefault();
//     const name = cardName.value;
//     const source = cardSource.value;
//     addCard(makeCard(name, source));
//     closePopup(popupAdd);
// }

// function handleFormInputClear(form) {
//     form.reset();
// }

// popup toggling

// function closeByEscape(evt) {
//     if (evt.key == 'Escape') {
//         const openedPopup = document.querySelector('.popup_opened');
//         closePopup(openedPopup);
//     }
// }

// const openPopup = function (popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', closeByEscape);
// }

// const closePopup = function (popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closeByEscape);
// }


// popups.forEach((popup) => {
//     popup.addEventListener('mousedown', (evt) => {
//         if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
//             closePopup(popup);
//         }
//     })
// })

// function makeCard(name, link){
//     return new Card(name, link, '.picture-card-template').createCard();
// }

// function addCard(card) {
//     imageList.prepend(card);
// }

// // popup edit listeners
// formEditProfile.addEventListener('submit', handleProfileFormSubmit);
// buttonOpenEditProfilePopup.addEventListener('click', function () {
//     openPopup(popupEdit);
//     nameInput.value = nameNew.textContent;
//     jobInput.value = jobNew.textContent;
// });

// // popup add listeners
// buttonOpenAddCardPopup.addEventListener('click', function () {
//     openPopup(popupAdd);
//     handleFormInputClear(pictureAddForm);
// });
// pictureAddForm.addEventListener('submit', handleAddFormSubmit);

// initialCards.forEach(item => { addCard(makeCard(item.name, item.link)); });

// export {openPopup, popupPicture, imageFull, imageTitle};
