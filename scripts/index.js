const buttonCloseList = document.querySelectorAll(".popup__close-button");
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
  popupCaption.alt = item.name;
  openPopup(popupOpenImg);
};

const renderCards = (item) => {
  const cardItem = createCard(item);
  itemsCard.prepend(cardItem);
};
// Добавление массива карточек
initialCards.reverse().forEach(function (item) {
  renderCards(item);
});
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
  hidingRedLine();
  validRedLine();
  Validation(popupAdd);
};

popupAddForm.addEventListener("submit", addNewCard);

// редактирование профиля
function editPopupOpen() {
  nameUser.value = nameArea.textContent;
  professionUser.value = jobArea.textContent;
  openPopup(popupEdit);
  popupEditForm.reset();
  hidingRedLine();
  validRedLine();
  Validation(popupEdit);
}

function formEditSubmit(evt) {
  evt.preventDefault();
  nameArea.textContent = nameUser.value;
  jobArea.textContent = professionUser.value;
  closePopup(popupEdit);
}
popupEditForm.addEventListener("submit", formEditSubmit);

// закрытие popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
// открытие popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closePopup(popup));
});

const cardAddOpen = () => {
  openPopup(popupAdd);
};

profileEditBtn.addEventListener("click", editPopupOpen);
profileAddBtn.addEventListener("click", cardAddOpen);

// закрытие по оверлею
document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
});
// закрытие по Esk
document.addEventListener("keydown", function (evt) {
  const popupEsc = Array.from(document.querySelectorAll(".popup"));
  popupEsc.forEach((popupElement) => {
    if (evt.key === "Escape") {
      closePopup(popupElement);
    }
  });
});

// красная линия при ошибке
function validRedLine() {
  const inputs = Array.from(document.querySelectorAll(".popup__input"));
  inputs.forEach((input) => {
    input.classList.remove("popup__input_mode_error");
  });
}

// скрытие красной линии ошибки
function hidingRedLine() {
  const errorInput = Array.from(
    document.querySelectorAll(".popup__input-error")
  );
  errorInput.forEach((errorElement) => (errorElement.textContent = ""));
}

//активация кнопки при успешной валидации
function activationPopupButton(item) {
  const popupButton = Array.from(
    document.querySelectorAll(".popup__save-button")
  );
  popupButton.forEach((buttonElement) => {
    buttonElement.setAttribute("disabled", true);
    buttonElement.classList.add(item.inactiveButtonClass);
  });
}
