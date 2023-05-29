class UserInfo{
    constructor({nameSelector, infoSelector, avatarSeceltor}){
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSeceltor);
    }

    getUserInfo(){
        const data = {};
        data.name = this._name.textContent;
        data.info = this._info.textContent;
        return data; 
    }

    setUserInfo(data){
        this._name.textContent = data.name;
        this._info.textContent = data.about;
        this._avatar.src = data.avatar;
    }
}

export default UserInfo;