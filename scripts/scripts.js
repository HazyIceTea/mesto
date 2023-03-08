let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.edit-form__close-icon');
let editButton = document.querySelector('.profile__edit');
let saveButton = document.querySelector('.edit-form__save-button');
let nameInput = document.querySelector('.edit-form__input-name');
let jobInput = document.querySelector('.edit-form__input-job');
let editForm = document.querySelector('.edit-form');

function handleFormSubmit (evt){
    evt.preventDefault();
    let nameNew = document.querySelector('.profile__name');
    let jobNew = document.querySelector('.profile__text');
    nameNew.textContent = nameInput.value;
    jobNew.textContent = jobInput.value;
    popup.classList.toggle('popup_opened');
}



editForm.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', function(){popup.classList.toggle('popup_opened')});
closeButton.addEventListener('click', function(){popup.classList.toggle('popup_opened')});
