class UserInfo{
    constructor({nameSelector, infoSelector}){
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
    }

    getUserInfo(){
        const data = {};
        data.name = this._name.textContent;
        data.info = this._info.textContent;
        return data; 
    }

    setUserInfo(data){
        this._name.textContent = data.name;
        this._info.textContent = data.info;
    }
}

export default UserInfo;