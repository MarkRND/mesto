const buttonCloseList = document.querySelectorAll(".popup__close-button");
const popupEditForm = document.querySelector(".popup__form_edit");
const popupEdit = document.querySelector(".popup_mode_edit");
const nameUser = popupEditForm.querySelector(".popup__input_mode_name");
const professionUser = popupEditForm.querySelector(
  ".popup__input_mode_profession"
);
const nameArea = document.querySelector(".profile__name");
const jobArea = document.querySelector(".profile__profession");
const profileEditBtn = document.querySelector(".profile__edit-button");

const profileAddBtn = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_mode_add");

const popupFormAddBtn = document.querySelector(".popup__form_add");
const popupFormName = document.querySelector(".popup__input_mode_title");
const popupFormLink = document.querySelector(".popup__input_mode_link");

const popupBigImg = document.querySelector(".popup_mode_image");
const popupImg = document.querySelector(".popup__image");
const popupCaption = popupBigImg.querySelector(".popup__caption");

const itemsCard = document.querySelector(".elements");
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
  openPopup(popupBigImg);
};

const renderCards = (item) => {
  const cardItem = createCard(item);
  itemsCard.append(cardItem);
};

initialCards.forEach(function (item) {
  renderCards(item);
});

const addNewCard = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: popupFormName.value,
    link: popupFormLink.value,
  };
  renderCards(newCard);
  closePopup(popupAdd);
  popupFormAddBtn.reset();
};

popupFormAddBtn.addEventListener("submit", addNewCard);

function editPopupOpen() {
  nameUser.value = nameArea.textContent;
  professionUser.value = jobArea.textContent;
  popupEdit.classList.add("popup_opened");
}

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

// редактирование профиля
function formEditSubmit(evt) {
  evt.preventDefault();
  nameArea.textContent = nameUser.value;
  jobArea.textContent = professionUser.value;
  closePopup(popupEdit);
}
popupEditForm.addEventListener("submit", formEditSubmit);
