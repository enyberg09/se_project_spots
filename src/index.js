import "./pages/index.css";
import logoImage from "./images/logo.svg";
import pencilImage from "./images/pencil.svg";
import plusImage from "./images/plus.svg";
import pencilImageLight from "./images/pencil-light.svg";
import {
  enableValidation,
  settings,
  disableButton,
  resetValidation,
  enableButton,
} from "./scripts/validation.js";
import { setButtonText } from "./utils/helpers.js";
import Api from "./utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d1df0bbf-28fe-4bed-9158-143d32be378f",
    "Content-Type": "application/json",
  },
});

let selectedCard;
let selectedCardId;

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;

    cards.forEach((cardData) => {
      renderCard(cardData, "append");
    });
  })
  .catch(console.error);

const headerLogo = document.querySelector(".header__logo");
const profileAvatar = document.querySelector(".profile__avatar");
const editProfileIcon = document.querySelector(".profile__edit-btn img");
const newPostIcon = document.querySelector(".profile__new-post-btn img");
const pencilIcon = document.querySelector(".profile__pencil-icon");

headerLogo.src = logoImage;
editProfileIcon.src = pencilImage;
newPostIcon.src = plusImage;
pencilIcon.src = pencilImageLight;

const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = document.forms["edit-profile"];
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const previewModal = document.querySelector("#preview-modal");

const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-button_active");
  api
    .changeLikeStatus(id, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-button_active");
    })
    .catch(console.error);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-button");

  if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-button_active");
  }

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  cardLikeBtnEl.addEventListener("click", (evt) => handleLike(evt, data._id));

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");

  cardDeleteBtnEl.addEventListener("click", (evt) => {
    evt.preventDefault();
    handleDeleteCard(cardElement, data._id);
  });

  function handleDeleteCard(cardElement, cardId) {
    selectedCard = cardElement;
    selectedCardId = cardId;
    openModal(deleteModal);
  }

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", pressEscKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", pressEscKey);
}

function pressEscKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#caption-input");

const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarForm = document.querySelector("#edit-avatar-modal .modal__form");
const avatarSubmitBtn = document.querySelector(
  "#edit-avatar-modal .modal__submit-btn"
);
const avatarModalCloseBtn = document.querySelector(
  "#edit-avatar-modal .modal__close-btn"
);
const avatarInput = document.querySelector("#profile-avatar-input");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteConfirmBtnEl = document.querySelector(
  "#delete-modal .modal__submit-btn"
);
const deleteCancelBtnEl = document.querySelector(
  "#delete-modal .modal__cancel-btn"
);

deleteCancelBtnEl.addEventListener("click", () => {
  const cancelPopup = deleteCancelBtnEl.closest(".modal");
  closeModal(cancelPopup);
});

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitDeleteBtn = evt.submitter;
  setButtonText(submitDeleteBtn, true, "Delete", "Deleting...");
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitDeleteBtn, false, "Delete", "Deleting...");
    });
}

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

avatarForm.addEventListener("submit", handleAvatarSubmit);

editProfileBtn.addEventListener("click", function () {
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  resetValidation(newPostForm, [newPostCaptionInput, newPostInput], settings);
  openModal(newPostModal);
  newPostCaptionInput.value = "";
  newPostInput.value = "";
});

avatarModalBtn.addEventListener("click", function () {
  openModal(avatarModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const submitSaveBtn = evt.submitter;
  setButtonText(submitSaveBtn, true);

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitSaveBtn, false);
    });
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);

  cardList[method](cardElement);
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  disableButton(submitButton, settings);
  setButtonText(submitButton, true);
  api
    .createCard({
      name: newPostCaptionInput.value,
      link: newPostInput.value,
    })
    .then((cardData) => {
      renderCard(cardData, "prepend");
      closeModal(newPostModal);
      newPostForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      enableButton(submitButton, settings);
      setButtonText(submitButton, false);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const avatarSubmitBtn = evt.submitter;
  disableButton(avatarSubmitBtn, settings);
  setButtonText(avatarSubmitBtn, true);
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
      avatarForm.reset();
    })
    .catch(console.error)
    .finally(() => {
      enableButton(avatarSubmitBtn, settings);
      setButtonText(avatarSubmitBtn, false);
    });
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

enableValidation(settings);
