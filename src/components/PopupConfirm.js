import Popup from "./Popup";

export default class PopupConfirm extends Popup{
    constructor(popupSelector){
        super(popupSelector);
    }

    setSubmit(){
        this._submitButton.addEventListener('click', this.submitLogic);
    }
}