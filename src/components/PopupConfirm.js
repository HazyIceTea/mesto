import Popup from "./Popup";

export default class PopupConfirm extends Popup{
    constructor(popupSelector){
        super(popupSelector);
    }

    setSubmit(){
        this._submitButton.addEventListener('click', this.submitLogic);
    }
    close(){
        this._submitButton.removeEventListener('click', this.submitLogic);
        super.close();
    }

    renderLoading(isTrue){
        if(isTrue){
            this._submitButton.textContent = 'Сохранение...';
        }
        else{
            this._submitButton.textContent = this._initialSubmitText;
        }
    }
}