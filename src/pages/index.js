import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { initialCards } from "../constants/pattern-cards.js";
import { Section } from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileEditBtn,
  profileAddBtn,
  itemsCard,
  profileInputName,
  profileInputProfession,
  popupEdit,
  popupAdd,
  popupOpenImage,
  template,
  popupEditForm,
  popupAddForm,
  settings,
} from "../constants/constants.js";

const validatorPopupEditForm = new FormValidator(settings, popupEditForm);
const validatorPopupAddForm = new FormValidator(settings, popupAddForm);

// валидация Popup
validatorPopupEditForm.enableValidation();
validatorPopupAddForm.enableValidation();

const openImage = new PopupWithImage(popupOpenImage);
openImage.setEventListeners();

function handleCardClick(item) {
  openImage.open(item);
}

const userInfo = new UserInfo(profileInputName, profileInputProfession);

const handleFormEditSubmit = (input) => {
  userInfo.setUserInfo(input.name, input.profession);
  editProfileForm.close();
};

const editProfileForm = new PopupWithForm(popupEdit, handleFormEditSubmit);

profileEditBtn.addEventListener("click", () => {
  editProfileForm.open();
  editProfileForm.setInputValues(userInfo.getUserInfo());
  validatorPopupEditForm.resetValidation();
});
editProfileForm.setEventListeners();

function createCard(item) {
  const cardElement = new Card(item, template, handleCardClick);
  return cardElement.createCard();
}
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardItem = createCard(item);
      itemsCard.prepend(cardItem);
    },
  },
  ".elements"
);
cardsList.renderer();

function handleFormAddSubmit(item) {
  const newCard = createCard(item);
  cardsList.addItem(newCard);
  addProfileForm.close();
}
const addProfileForm = new PopupWithForm(popupAdd, handleFormAddSubmit);
profileAddBtn.addEventListener("click", () => {
  addProfileForm.open();
  validatorPopupAddForm.resetValidation();
});
addProfileForm.setEventListeners();
