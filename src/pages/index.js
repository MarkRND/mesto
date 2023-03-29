import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
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
  profileAvatar,
  popupAvatar,
  profileAvatarBtn,
  popupAvatarForm,
  popupDelCard,
} from "../constants/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "c9747e71-adc0-4f90-b3cb-7c3fb37d6c43",
    "Content-Type": "application/json",
  },
});
let userId;
Promise.all([api.getInfoUser(), api.getCards()])
  .then(([infoUser, cards]) => {
    userId = infoUser._id;
    cardsList.renderer(cards);
    userInfo.setUserInfo(infoUser);
    userInfo.setUserAvatar(infoUser.avatar);
  })
  .catch((err) => console.log(`Ошибка ${err}`));

const validatorPopupEditForm = new FormValidator(settings, popupEditForm);
const validatorPopupAddForm = new FormValidator(settings, popupAddForm);
const validatorPopupAvatarForm = new FormValidator(settings, popupAvatarForm);
// валидация Popup
validatorPopupEditForm.enableValidation();
validatorPopupAddForm.enableValidation();
validatorPopupAvatarForm.enableValidation();

const PopupOpenPicture = new PopupWithImage(popupOpenImage);
PopupOpenPicture.setEventListeners();

function handleCardClick(item) {
  PopupOpenPicture.open(item);
}

const userInfo = new UserInfo({
  nameSelector: profileInputName,
  jobSelector: profileInputProfession,
  avatarSelector: profileAvatar,
});

const handleFormEditSubmit = (input) => {
  editProfileForm.setSubmitButton(true);
  api
    .editUser(input)
    .then((item) => {
      userInfo.setUserInfo(item);
    })
    .then(() => editProfileForm.close())
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => {
      editProfileForm.setSubmitButton(false);
    });
};

const handleAvatarSubmit = (item) => {
  editAvatarForm.setSubmitButton(true);
  api
    .updateAvatar(item)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .then(() => editAvatarForm.close())
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => {
      editAvatarForm.setSubmitButton(false);
    });
};

const editAvatarForm = new PopupWithForm(popupAvatar, handleAvatarSubmit);
profileAvatarBtn.addEventListener("click", () => {
  validatorPopupEditForm.resetValidation();
  editAvatarForm.open();
});
editAvatarForm.setEventListeners();

const editProfileForm = new PopupWithForm(popupEdit, handleFormEditSubmit);
profileEditBtn.addEventListener("click", () => {
  validatorPopupEditForm.resetValidation();
  editProfileForm.open();
  editProfileForm.setInputValues(userInfo.getUserInfo());
});
editProfileForm.setEventListeners();

function createCard(item) {
  const cardElement = new Card({
    item,
    templateSelector: template,
    userId,
    handleCardClick,
    handleCardLike: () => {
      if (cardElement.isLiked) {
        api
          .deleteLikeCard(item._id)
          .then((item) => {
            cardElement.unsetLike();
            cardElement.likesUpdate(item.likes);
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`);
          });
      } else {
        api
          .addLikeCard(item._id)
          .then((item) => {
            cardElement.setLike();
            cardElement.likesUpdate(item.likes);
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`);
          });
      }
    },
    handleCardDelete: () => {
      deleteCardForm.setConfirmation(() => {
        api
          .deleteCard(item._id)
          .then(() => {
            cardElement.deleteOldCard();
            deleteCardForm.close();
          })
          .catch((err) => {
            console.log(`Ошибка ${err}`);
          });
      }),
        deleteCardForm.open();
    },
  });
  return cardElement.createCard();
}

const cardsList = new Section(
  {
    renderer: (item) => {
      const cardItem = createCard(item);
      itemsCard.prepend(cardItem);
    },
  },
  ".elements"
);

const handleFormAddSubmit = (item) => {
  addProfileForm.setSubmitButton(true);
  api
    .addCard(item)
    .then((res) => {
      cardsList.addItem(createCard(res));
    })
    .then(() => addProfileForm.close())
    .catch((err) => console.log(`Ошибка ${err}`))
    .finally(() => {
      addProfileForm.setSubmitButton(false);
    });
};

const addProfileForm = new PopupWithForm(popupAdd, handleFormAddSubmit);
profileAddBtn.addEventListener("click", () => {
  addProfileForm.open();
  validatorPopupAddForm.resetValidation();
});
addProfileForm.setEventListeners();

const deleteCardForm = new PopupWithConfirmation(popupDelCard);
deleteCardForm.setEventListeners();
