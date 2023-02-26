import { FormValidator } from "./formValidator.js";
import { Card } from "./card.js";
import { initialCards } from "./pattern-cards.js";

const popups = document.querySelectorAll(".popup");
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
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_mode_error",
  errorClass: "popup__input-error_visible",
};
const validatorPopupEditForm = new FormValidator(settings, popupEditForm);
const validatorPopupAddForm = new FormValidator(settings, popupAddForm);

// валидация Popup
validatorPopupEditForm.enableValidation(settings);
validatorPopupAddForm.enableValidation(settings);

// открытие изображения в попапе
function openImage(item) {
  popupImg.src = item.link;
  popupCaption.textContent = item.name;
  popupImg.alt = item.name;
  openPopup(popupOpenImg);
}

function renderCards(item) {
  const card = new Card(item, ".template", openImage);
  const cardItem = card.createCard();
  itemsCard.prepend(cardItem);
}

initialCards.reverse().forEach(renderCards);

// добавление карточки
function addNewCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: popupFormName.value,
    link: popupFormLink.value,
  };
  renderCards(newCard);
  closePopup(popupAdd);
  popupAddForm.reset();
  hideErrors();
}

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

function openAddCard() {
  openPopup(popupAdd);
}

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
