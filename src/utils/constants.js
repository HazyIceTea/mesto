const initialCards = [
    {
      name: 'Река Мегуро',
      link: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      name: 'Храм Ицукушима',
      link: 'https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80'
    },
    {
      name: 'Акабанэ',
      link: 'https://images.unsplash.com/photo-1534214526114-0ea4d47b04f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      name: 'Кавагоэ',
      link: 'https://images.unsplash.com/photo-1555050551-82f8d95a0614?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      name: 'Арашияма',
      link: 'https://images.unsplash.com/photo-1532884928231-ef40895eb654?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80'
    },
    {
      name: 'Национальный парк Синдзюку',
      link: 'https://images.unsplash.com/photo-1532188978303-4bfaccc429d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    }
]; 

const validationConfig = ({
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.edit-form__save-button',
  inactiveButtonClass: 'edit-form__save-button_disabled',
  inputErrorClass: 'edit-form__input_type_error',
  errorClass: 'edit-form__validation-error'
});

export {initialCards, validationConfig};
