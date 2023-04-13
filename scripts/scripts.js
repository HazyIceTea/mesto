// // popup bodies
const popups = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup_event_edit');
const popupAdd = document.querySelector('.popup_event_add-card');
const popupPicture = document.querySelector('.popup_event_open-picture');

// open buttons
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');

// popup edit
const nameInput = document.querySelector('.edit-form__input_value_name');
const jobInput = document.querySelector('.edit-form__input_value_job');
const formEditProfile = document.forms['profile-edit'];
const nameNew = document.querySelector('.profile__name');
const jobNew = document.querySelector('.profile__text');

// pictures elements here
const pictureAddForm = document.forms['add-card'];
const buttonLike = document.querySelector('.element__like-button');
const imageList = document.querySelector('.elements');
const cardName = document.querySelector('.edit-form__input_value_card-name');
const cardSource = document.querySelector('.edit-form__input_value_image-src');
const cardTemplate = document.querySelector('.picture-card-template').content;
const imageFull = document.querySelector('.popup__image-full');
const imageTitle = document.querySelector('.popup__image-title');

// handlers
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    nameNew.textContent = nameInput.value;
    jobNew.textContent = jobInput.value;
    closePopup(popupEdit);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const name = cardName.value;
    const source = cardSource.value;
    addCard(name, source);
    closePopup(popupAdd);
}

function handleFormInputClear(form) {
    form.reset();
}

// popup toggling

function closeByEscape(evt) {
    if (evt.key == 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}


popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    })
})

// rendering
function renderCard(name, link) {
    const newCard = cardTemplate.cloneNode(true);
    const cardTitle = newCard.querySelector('.element__name');
    const cardImage = newCard.querySelector('.element__image');
    const likeButton = newCard.querySelector('.element__like-button');
    const buttonDelete = newCard.querySelector('.element__button-delete');
    buttonDelete.addEventListener('click', function (evt) {
        const card = evt.target.closest('.element');
        card.remove();
    });
    likeButton.addEventListener('click', function (evt) { evt.target.classList.toggle('element__like-button_active'); });
    cardImage.addEventListener('click', function () {
        openPopup(popupPicture);
        imageFull.src = link;
        imageFull.alt = `Фотография ${name}`;
        imageTitle.textContent = name;
    });
    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = `Фотография ${name}`;
    return newCard;
}

function addCard(name, link) {
    const result = renderCard(name, link);
    imageList.prepend(result);
}

// popup edit listeners
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
buttonOpenEditProfilePopup.addEventListener('click', function () {
    openPopup(popupEdit);
    nameInput.value = nameNew.textContent;
    jobInput.value = jobNew.textContent;
});

// popup add listeners
buttonOpenAddCardPopup.addEventListener('click', function () {
    openPopup(popupAdd);
    handleFormInputClear(pictureAddForm);
});
pictureAddForm.addEventListener('submit', handleAddFormSubmit);

initialCards.forEach(card => { addCard(card.name, card.link); });