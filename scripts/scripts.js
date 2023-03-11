let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.edit-form__close-button');
let buttonEdit = document.querySelector('.profile__edit');
let nameInput = document.querySelector('.edit-form__input_value_name');
let jobInput = document.querySelector('.edit-form__input_value_job');
let editForm = document.querySelector('.edit-form');
let nameNew = document.querySelector('.profile__name');
let jobNew = document.querySelector('.profile__text');

function handleFormSubmit (evt){
    evt.preventDefault();
    nameNew.textContent = nameInput.value;
    jobNew.textContent = jobInput.value;
    popupClose();
}

function popupOpen(){
    nameInput.value = document.querySelector('.profile__name').textContent;
    jobInput.value = document.querySelector('.profile__text').textContent;
    popup.classList.add('popup_opened');
}

function popupClose(){
    popup.classList.remove('popup_opened');
}


editForm.addEventListener('submit', handleFormSubmit);
buttonEdit.addEventListener('click', popupOpen);
buttonClose.addEventListener('click', popupClose);
