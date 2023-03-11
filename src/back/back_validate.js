

// Включение стилизации
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

// Выключение стилизации
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

// валидность формы
const checkInputValidity = (formElement, inputElement, settings) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, settings);
  } else {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  }
};

// обраьотка всех полей формы
const setEventListeners = (formElement, settings) => {
  const inputs = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  toggleButtonState(inputs, buttonElement, settings);
  formElement.addEventListener("reset", () => {
    setTimeout(() => {
      toggleButtonState(inputs, buttonElement, settings);
    }, 0);
  });
  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputs, buttonElement, settings);
    });
  });
};

// Проверка массива на валидность
const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Блокировка кнопки и разблакировка
const toggleButtonState = (inputs, buttonElement, settings) => {
  if (hasInvalidInput(inputs)) {
    buttonElement.classList.add(settings.inactiveButtonClass, "disabled");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass, "disabled");
    buttonElement.removeAttribute("disabled");
  }
};

// обратотка всех форм
const enableValidation = (settings) => {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_mode_error",
  errorClass: "popup__input-error_visible",
});
