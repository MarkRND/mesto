export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameArea = document.querySelector(nameSelector);
    this._jobArea = document.querySelector(jobSelector);
    this._avatarArea = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameArea.textContent,
      profession: this._jobArea.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._nameArea.textContent = name;
    this._jobArea.textContent = about;
    this._avatarArea.src = avatar;
  }

  setUserAvatar(avatar) {
    this._avatarArea.src = avatar;
  }
}
