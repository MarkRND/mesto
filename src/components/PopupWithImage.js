import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupCaption = this._popup.querySelector(".popup__caption");
    this._popupImg = this._popup.querySelector(".popup__image");
  }

  open(item) {
    super.open();
    this._popupImg.src = item.link;
    this._popupCaption.textContent = item.name;
    this._popupImg.alt = item.name;
  }
}
