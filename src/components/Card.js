export class Card {
  constructor({
    item,
    templateSelector,
    userId,
    handleCardClick,
    handleCardLike,
    handleCardDelete,
  }) {
    this._item = item;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._cardId = item._id;
    this._ownerId = item.owner._id;
    this._likes = item.likes;
    this._userId = userId;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
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

  basketCard = () => {
    this._card.remove();
    this._card = null;
  };

  _deleteButton() {
    if (this._ownerId !== this._userId) {
      this._card.querySelector(".element__basket").remove();
    }
  }

  unsetLike() {
    this._cardLiKe.classList.remove("element__button_active");
    this.isLiked = false;
  }
  setLike() {
    this._cardLiKe.classList.add("element__button_active");
    this.isLiked = true;
  }

  likesUpdate(data) {
    this._likeCount.textContent = data.length;
  }

  _checkLike() {
    return this._likes.some((item) => item._id === this._userId);
  }

  _toggleLikeState() {
    if (!this._checkLike()) {
      this.unsetLike();
    } else {
      this.setLike();
    }
  }

  createCard() {
    this._card = this._getTemplate();
    this._imgTemplate = this._card.querySelector(".element__image");
    this._nameTemplate = this._card.querySelector(".element__name");
    this._cardBasket = this._card.querySelector(".element__basket");
    this._cardLiKe = this._card.querySelector(".element__button");
    this._likeCount = this._card.querySelector(".element__like-quantity");
    this._nameTemplate.textContent = this._item.name;
    this._imgTemplate.src = this._item.link;
    this._imgTemplate.alt = this._item.name;
    this._likeCount.textContent = this._likes.length;
    this._toggleLikeState();
    this._deleteButton();
    this._setEventListeners();
    return this._card;
  }
  _setEventListeners() {
    this._imgTemplate.addEventListener("click", () => {
      this._handleCardClick(this._item);
    });
    this._cardLiKe.addEventListener("click", () => {
      this._handleCardLike();
    });
    this._cardBasket.addEventListener("click", () => {
      this._handleCardDelete();
    });
  }
}
