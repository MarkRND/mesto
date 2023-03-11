export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameArea = document.querySelector(nameSelector);
    this._jobArea = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameArea.textContent,
      profession: this._jobArea.textContent,
    };
  }

  setUserInfo(name, profession) {
    this._nameArea.textContent = name;
    this._jobArea.textContent = profession;
  }
}
