const popups = document.querySelectorAll(".popup");
const buttonClose = document.querySelectorAll(".popup__close-button");
const popupEdit = document.querySelector(".popup_mode_edit");
const nameArea = document.querySelector(".profile__name");
const jobArea = document.querySelector(".profile__profession");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_mode_add");
const popupOpenImg = document.querySelector(".popup_mode_image");
const popupImg = document.querySelector(".popup__image");
const popupCaption = popupOpenImg.querySelector(".popup__caption");
const itemsCard = document.querySelector(".elements");
const popupEditForm = document.forms.popupEdit;
const nameUser = popupEditForm.elements.name;
const professionUser = popupEditForm.elements.profession;
const popupAddForm = document.forms.popupAdd;
const popupFormName = popupAddForm.elements.title;
const popupFormLink = popupAddForm.elements.link;
const cardTemplate = document
  .querySelector(".template")
  .content.querySelector(".element");

function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  const imgTemplate = card.querySelector(".element__image");
  const nameTemplate = card.querySelector(".element__name");
  nameTemplate.textContent = item.name;
  imgTemplate.src = item.link;
  imgTemplate.alt = item.name;
  imgTemplate.addEventListener("click", () => openImage(item));
  card.querySelector(".element__button").addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__button_active");
  });
  card.querySelector(".element__basket").addEventListener("click", (evt) => {
    evt.target.closest(".element").remove();
  });
  return card;
}

// открытие изображения в попапе
openImage = (item) => {
  popupImg.src = item.link;
  popupCaption.textContent = item.name;
  popupImg.alt = item.name;
  openPopup(popupOpenImg);
};

const renderCards = (item) => {
  const cardItem = createCard(item);
  itemsCard.prepend(cardItem);
};
// Добавление массива карточек
initialCards.reverse().forEach(renderCards);

// добавление карточки
const addNewCard = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: popupFormName.value,
    link: popupFormLink.value,
  };
  renderCards(newCard);
  closePopup(popupAdd);
  popupAddForm.reset();
  hideErrors();
};

popupAddForm.addEventListener("submit", addNewCard);

// редактирование профиля
function editPopupOpen() {
  nameUser.value = nameArea.textContent;
  professionUser.value = jobArea.textContent;
  openPopup(popupEdit);
  hideErrors();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameArea.textContent = nameUser.value;
  jobArea.textContent = professionUser.value;
  closePopup(popupEdit);
}
popupEditForm.addEventListener("submit", handleProfileFormSubmit);

// закрытие popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}
// открытие popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

const openAddCard = () => {
  openPopup(popupAdd);
};

profileEditBtn.addEventListener("click", editPopupOpen);
profileAddBtn.addEventListener("click", openAddCard);

// закрытие попапа по оверлей и кресту
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
}

// функции очистки от ошибок
function hideErrors() {
  const inputs = Array.from(document.querySelectorAll(".popup__input"));
  const errorInput = Array.from(
    document.querySelectorAll(".popup__input-error")
  );
  errorInput.forEach((errorElement) => (errorElement.textContent = ""));
  inputs.forEach((input) => {
    input.classList.remove("popup__input_mode_error");
  });
}