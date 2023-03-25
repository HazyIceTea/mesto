const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
]; 

// popup bodies
const popupEdit = document.querySelector('.popup_event_edit');
const popupAdd = document.querySelector('.popup_event_add-card');
const popupPicture = document.querySelector('.popup_event_open-picture');

// open buttons
const buttonEdit = document.querySelector('.profile__edit');
const buttonAdd = document.querySelector('.profile__add-button');

// close buttons
const buttonCloseEdit = document.querySelector('.popup__close-button_event_edit');
const buttonCloseAdd = document.querySelector('.popup__close-button_event_add-card');
const buttonClosePicture = document.querySelector('.popup__close-button_event_open-picture');

// popup edit
const nameInput = document.querySelector('.edit-form__input_value_name');
const jobInput = document.querySelector('.edit-form__input_value_job');
const editForm = document.querySelector('.edit-form');
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


// handlers
function handleFormSubmit (evt){
    evt.preventDefault();
    nameNew.textContent = nameInput.value;
    jobNew.textContent = jobInput.value;
    togglePopupp(popupEdit);
}

function handleAddSave(evt){
    evt.preventDefault();
    const name = cardName.value;
    const source = cardSource.value;
    renderCard(name, source);
    togglePopupp(popupAdd);
}



// popup toggling

const togglePopupp = function (popup){
    popup.classList.toggle('popup_opened');
}

// rendering

function renderCard(name, link){
    if (!name || !link){
        alert('Заполните все поля ввода');
        return;
    }
    const newCard = cardTemplate.cloneNode(true);
    const cardTitle = newCard.querySelector('.element__name');
    const cardImage = newCard.querySelector('.element__image');
    const likeButton = newCard.querySelector('.element__like-button');
    const deleteButton = newCard.querySelector('.element__button-delete');
    deleteButton.addEventListener('click', function (evt){
        const card = evt.target.closest('.element');
        card.remove();
    });
    likeButton.addEventListener('click', function(evt){evt.target.classList.toggle('element__like-button_active');});
    cardImage.addEventListener('click', function(){togglePopupp(popupPicture); imageFull.src = link; imageFull.alt = `Фотография ${name}`; imageTitle.textContent = name;});
    cardTitle.textContent = name;
    cardImage.src = link;
    imageList.prepend(newCard);
    cardName.value='';
    cardSource.value='';
}


// popup edit listeners
editForm.addEventListener('submit', handleFormSubmit);
buttonEdit.addEventListener('click', function(){
    togglePopupp(popupEdit);
    nameInput.value = nameNew.textContent;
    jobInput.value = jobNew.textContent;
});
buttonCloseEdit.addEventListener('click', function(){togglePopupp(popupEdit)});

// popup add listeners
buttonAdd.addEventListener('click', function(){togglePopupp(popupAdd);});
buttonCloseAdd.addEventListener('click', function(){
    togglePopupp(popupAdd);
    cardName.value='';
    cardSource.value='';});
pictureForm.addEventListener('submit', handleAddSave);

// popup picture listeners
buttonClosePicture.addEventListener('click', function(){togglePopupp(popupPicture)});

initialCards.forEach(card => {renderCard(card.name, card.link);});