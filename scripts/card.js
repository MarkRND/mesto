export class Card {
  constructor(item, templateSelector, openImage) {
    this._item = item;
    this._templateSelector = templateSelector;
    this._openImage = openImage;
  }

  // получить шаблон карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  // добавляем данные
  createCard() {
    this._card = this._getTemplate();
    this._imgTemplate = this._card.querySelector(".element__image");
    this._nameTemplate = this._card.querySelector(".element__name");
    this._nameTemplate.textContent = this._item.name;
    this._imgTemplate.src = this._item.link;
    this._imgTemplate.alt = this._item.name;
    this._imgTemplate.addEventListener("click", () =>
      this._openImage(this._item)
    );
    this._card
      .querySelector(".element__button")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("element__button_active");
      });
    this._card
      .querySelector(".element__basket")
      .addEventListener("click", (evt) => {
        evt.target.closest(".element").remove();
      });
    return this._card;
  }
}