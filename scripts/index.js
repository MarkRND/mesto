const closeBtnEdit = document.querySelector(".popup__close-button_mode_edit");
const formElement = document.querySelector(".popup__form");
const popupEdit = document.querySelector(".popup_mode_edit");
const nameUser = formElement.querySelector(".popup__input_mode_name");
const professionUser = formElement.querySelector(
  ".popup__input_mode_profession"
);
const nameArea = document.querySelector(".profile__name");
const jobArea = document.querySelector(".profile__profession");
const editBtn = document.querySelector(".profile__edit-button");

const addBtn = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_mode_add");

const formAdd = document.querySelector(".popup__form_add");
const formName = document.querySelector(".popup__input_mode_title");
const formLink = document.querySelector(".popup__input_mode_link");
const closeBtnAdd = document.querySelector(".popup__close-button_mode_add");

const popupImg = document.querySelector(".popup_mode_image");
const imgBtn = document.querySelector(".popup__image");
const closeBtnImg = document.querySelector(".popup__close-button_mode_image");

const itemsCard = document.querySelector(".elements");
const cardTemplate = document
  .querySelector(".template")
  .content.querySelector(".element");
const initialCards = [
  {
    name: "Ростов-на-Дону",
    link: "./images/rostov.jpeg",
  },
  {
    name: "Азов",
    link: "./images/azov.jpg",
  },
  {
    name: "Гуково",
    link: "./images/Gukovo.jpg",
  },
  {
    name: "Новочеркаск",
    link: "./images/Novocherkassk.jpg",
  },
  {
    name: "Шахты",
    link: "./images/shahty.png",
  },
  {
    name: "Таганрог",
    link: "./images/taganrog.jpg",
  },
];

// =====================================================

function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector(".element__name").textContent = item.name;
  card.querySelector(".element__image").src = item.link;
  card.querySelector(".element__image").alt = item.name;
  card
    .querySelector(".element__image")
    .addEventListener("click", () => openImage(item));
  card.querySelector(".element__button").addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__button_active");
  });
  card.querySelector(".element__basket").addEventListener("click", (evt) => {
    evt.target.closest(".element").remove();
  });

  return card;
}

openImage = (item) => {
  popupImg.querySelector(".popup__image").src = item.link;
  popupImg.querySelector(".popup__caption").textContent = item.name;
  popupImg.querySelector(".popup__caption").alt = item.name;
  popupOpenImg(popupImg);
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
    name: formName.value,
    link: formLink.value,
  };
  renderCards(newCard);
  popupHideAdd();
};

popupHideAdd();
formAdd.addEventListener("submit", addNewCard);

function popupOpen() {
  nameUser.value = nameArea.textContent;
  professionUser.value = jobArea.textContent;
  popupEdit.classList.add("popup_opened");
}

function popupHide() {
  popupEdit.classList.remove("popup_opened");
}

function popupOpenAdd() {
  popupAdd.classList.add("popup_opened");
}

function popupHideAdd() {
  popupAdd.classList.remove("popup_opened");
}

function popupOpenImg() {
  popupImg.classList.add("popup_opened");
}

function popupHideImg() {
  popupImg.classList.remove("popup_opened");
}

imgBtn.addEventListener("click", popupOpenImg);
closeBtnImg.addEventListener("click", popupHideImg);
addBtn.addEventListener("click", popupOpenAdd);
closeBtnAdd.addEventListener("click", popupHideAdd);
editBtn.addEventListener("click", popupOpen);
closeBtnEdit.addEventListener("click", popupHide);

function FormSubmit(evt) {
  evt.preventDefault();
  nameArea.textContent = nameUser.value;
  jobArea.textContent = professionUser.value;
  popupHide();
}

formElement.addEventListener("submit", FormSubmit);
