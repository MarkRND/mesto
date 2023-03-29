import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._form = this._popup.querySelector(".popup__form");
  }
  setConfirmation(callback) {
    this._confirmation = callback;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._confirmation();
    });
    super.setEventListeners();
  }
}
