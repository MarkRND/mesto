export class Card {
  constructor(item, templateSelector, handleCardClick) {
    this._item = item;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardBasket = this._card.querySelector(".element__basket");
    this._cardLiKe = this._card.querySelector(".element__button");
    this._nameTemplate.textContent = this._item.name;
    this._imgTemplate.src = this._item.link;
    this._imgTemplate.alt = this._item.name;
    this._setEventListeners();
    return this._card;
  }

  _likeCard = () => {
    this._cardLiKe.classList.toggle("element__button_active");
  };

  _basketCard = () => {
    this._card.remove();
    this._card = null;
  };

  _setEventListeners() {
    this._imgTemplate.addEventListener("click", () => {
      this._handleCardClick(this._item);
    });
    this._cardLiKe.addEventListener("click", this._likeCard);
    this._cardBasket.addEventListener("click", this._basketCard);
  }
}
