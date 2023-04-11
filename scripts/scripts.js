// // popup bodies
const popupEdit = document.querySelector('.popup_event_edit');
const popupAdd = document.querySelector('.popup_event_add-card');
const popupPicture = document.querySelector('.popup_event_open-picture');

// open buttons
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');

// close buttons
const buttonCloseEdit = document.querySelector('.popup__close-button_event_edit');
const buttonCloseAdd = document.querySelector('.popup__close-button_event_add-card');
const buttonClosePicture = document.querySelector('.popup__close-button_event_open-picture');

// popup edit
const nameInput = document.querySelector('.edit-form__input_value_name');
const jobInput = document.querySelector('.edit-form__input_value_job');
const formEditProfile = document.querySelector('.edit-form_event_edit');
const nameNew = document.querySelector('.profile__name');
const jobNew = document.querySelector('.profile__text');

// pictures elements here
const pictureForm = document.querySelector('.edit-form_event_add-card');
const buttonLike = document.querySelector('.element__like-button');
const imageList = document.querySelector('.elements');
const cardName = document.querySelector('.edit-form__input_value_card-name');
const cardSource = document.querySelector('.edit-form__input_value_image-src');
const cardTemplate = document.querySelector('.picture-card-template').content;
const imageFull = document.querySelector('.popup__image-full');
const imageTitle = document.querySelector('.popup__image-title');
const buttonSubmitCard = document.querySelector('.edit-form__save-button_type_card');

// handlers
function handleFormSubmit (evt){
    evt.preventDefault();
    nameNew.textContent = nameInput.value;
    jobNew.textContent = jobInput.value;
    closePopup(popupEdit);
}

function handleAddSave(evt){
    evt.preventDefault();
    const name = cardName.value;
    const source = cardSource.value;
    addCard(name, source);
    closePopup(popupAdd);
}

function handleCardInputClear(){
    pictureForm.reset();
}

// popup toggling
const openPopup = function (popup){
    popup.classList.add('popup_opened');
}

const closePopup = function (popup){
    popup.classList.remove('popup_opened');
}

// rendering
function renderCard(name, link){
    const newCard = cardTemplate.cloneNode(true);
    const cardTitle = newCard.querySelector('.element__name');
    const cardImage = newCard.querySelector('.element__image');
    const likeButton = newCard.querySelector('.element__like-button');
    const buttonDelete = newCard.querySelector('.element__button-delete');
    buttonDelete.addEventListener('click', function (evt){
        const card = evt.target.closest('.element');
        card.remove();
    });
    likeButton.addEventListener('click', function(evt){evt.target.classList.toggle('element__like-button_active');});
    cardImage.addEventListener('click', function(){openPopup(popupPicture); imageFull.src = link; imageFull.alt = `Фотография ${name}`; imageTitle.textContent = name;});
    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = `Фотография ${name}`;
    return newCard;
}

function addCard(name, link){
    const result = renderCard(name, link);
    imageList.prepend(result);
}

// popupAll.forEach((item)=>item.addEventListener('keypress',(evt)=>{closePopup(evt.target); console.log(evt)}));

// popup edit listeners
formEditProfile.addEventListener('submit', handleFormSubmit);
buttonOpenEditProfilePopup.addEventListener('click', function(){
    openPopup(popupEdit);
    nameInput.value = nameNew.textContent;
    jobInput.value = jobNew.textContent;
});
buttonCloseEdit.addEventListener('click', function(){closePopup(popupEdit)});
popupEdit.addEventListener('click', (evt) => {if(evt.target.classList.contains('popup')){closePopup(popupEdit)}});
document.addEventListener('keyup', (evt) => {if(evt.key=='Escape' && popupEdit.classList.contains('popup_opened')){closePopup(popupEdit)}});

// popup add listeners
buttonOpenAddCardPopup.addEventListener('click', function(){openPopup(popupAdd); handleCardInputClear(); disableButton(buttonSubmitCard, validationConfig)});
buttonCloseAdd.addEventListener('click', function(){closePopup(popupAdd);});
pictureForm.addEventListener('submit', handleAddSave);
popupAdd.addEventListener('click', (evt) => {if(evt.target.classList.contains('popup')){closePopup(popupAdd)}});
document.addEventListener('keyup', (evt) => {if(evt.key=='Escape' && popupAdd.classList.contains('popup_opened')){closePopup(popupAdd)}});

// popup picture listeners
buttonClosePicture.addEventListener('click', function(){closePopup(popupPicture)});
popupPicture.addEventListener('click', (evt) => {if(evt.target.classList.contains('popup')){closePopup(popupPicture)}});
document.addEventListener('keyup', (evt) => {if(evt.key=='Escape' && popupPicture.classList.contains('popup_opened')){closePopup(popupPicture)}});

initialCards.forEach(card => {addCard(card.name, card.link);});