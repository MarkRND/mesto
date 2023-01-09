let closeBtn = document.querySelector(".popup__close-button");
let formElement = document.querySelector(".popup__form");
let popup = document.querySelector(".popup");
let nameUser = formElement.querySelector(".popup__input_name");
let professionUser = formElement.querySelector(".popup__input_profession");
let nameArea = document.querySelector(".profile__name");
let jobArea = document.querySelector(".profile__profession");
let editBtn = document.querySelector(".profile__edit-button");

function popupOpen() {
  nameUser.value = nameArea.textContent;
  professionUser.value = jobArea.textContent;
  popup.classList.add("popup_opened");
}

function popupHide() {
  popup.classList.remove("popup_opened");
}
editBtn.addEventListener("click", popupOpen);
closeBtn.addEventListener("click", popupHide);

function FormSubmit(evt) {
  evt.preventDefault();
  nameArea.textContent = nameUser.value;
  jobArea.textContent = professionUser.value;
  popupHide();
}

formElement.addEventListener("submit", FormSubmit);
