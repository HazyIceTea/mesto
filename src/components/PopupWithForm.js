import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitLogic){
        super(popupSelector);
        this._submit = formSubmitLogic;
        this._currentForm = this._currentPopup.querySelector('.edit-form');
        this._inputList = this._currentForm.querySelectorAll('.edit-form__input');
        this._formValues = {};
    }

    getInputValues() {
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        return this._formValues;
      } 

    setEventListeners(){
        super.setEventListeners();
        this._currentForm.addEventListener('submit', this._submit)
    }

    close(){
        super.close();
        this._currentForm.reset();
    }
}