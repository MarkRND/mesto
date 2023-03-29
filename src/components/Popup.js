export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._buttonSubmit = this._popup.querySelector(".popup__save-button");
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    });
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("click", () => {
        this.close();
      });
  }
  setSubmitButton(isStarted) {
    if (!isStarted) {
      this._buttonSubmit.textContent = "Сохранить";
    } else {
      this._buttonSubmit.textContent = "Сохранение...";
    }
  }
}
