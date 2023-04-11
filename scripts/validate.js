const validationConfig = ({
    formSelector: '.edit-form',
    inputSelector: '.edit-form__input',
    submitButtonSelector: '.edit-form__save-button',
    inactiveButtonClass: 'edit-form__save-button_disabled',
    inputErrorClass: 'edit-form__input_type_error',
    errorClass: 'edit-form__validation-error'
  }); 


function enableValidation({formSelector, ...rest}){
  const forms = Array.from(document.querySelectorAll(formSelector))
  forms.forEach((form) => setEventListeners(form, rest))
}

const disableButton = (button, {inactiveButtonClass}) => {
    button.setAttribute('disabled', true);
    button.classList.add(inactiveButtonClass);
}

const enableButton = (button, {inactiveButtonClass}) => {
    button.removeAttribute('disabled');
    button.classList.remove(inactiveButtonClass);
}

const hasInvalidField = (form) =>{
  return form.some(item => !item.validity.valid);
}

const checkCurrentValidity = (item) =>{
    const inputError = document.querySelector(`#${item.id}-error`)
    if(item.checkValidity()){
        inputError.textContent = '';
    }
    else{
        inputError.textContent = item.validationMessage;
    }
}

const setEventListeners = (form, {inputSelector, submitButtonSelector, inputErrorClass, ...rest}) =>{
    const inputFields = Array.from(form.querySelectorAll(inputSelector));
    const button = form.querySelector(submitButtonSelector);
    inputFields.forEach((field) => field.addEventListener('input', () => {
        checkCurrentValidity(field);
        if(field.checkValidity()){
            field.classList.remove(inputErrorClass);
        }
        else{
            field.classList.add(inputErrorClass);
        }
        if(hasInvalidField(inputFields)){
            disableButton(button, rest);
        }
        else{
            enableButton(button, rest);
        }
    }));
}

enableValidation(validationConfig);