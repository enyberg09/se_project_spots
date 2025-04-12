const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = document.forms["edit-profile"];
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

function openPopup(popup) {
  popup.classList.add("modal_is-opened");
}

function closePopup(popup) {
  popup.classList.remove("modal_is-opened");
}

const closeButtons = document.querySelectorAll(".modal__close-btn");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopup(popup));
});

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#caption-input");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const cardsContainer = document.querySelector(".page__section");

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openPopup(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openPopup(newPostModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closePopup(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

const cardsList = document.querySelector(".cards__list");
function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const imageUrl = newPostInput.value;
  const caption = newPostCaptionInput.value;

  console.log({ imageUrl, caption });

  const cardElement = document.createElement("li");
  cardElement.classList.add("card");
  const imageElement = document.createElement("img");
  imageElement.classList.add("card__image");
  imageElement.src = imageUrl;
  imageElement.alt = caption;

  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card__title");
  cardTitle.textContent = caption;

  const cardContent = document.createElement("div");
  cardContent.classList.add("card__content");

  const likeButton = document.createElement("button");
  likeButton.classList.add("card__like-button");
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardContent.appendChild(cardTitle);
  cardContent.appendChild(likeButton);
  cardElement.appendChild(imageElement);
  cardElement.appendChild(cardContent);
  cardsList.appendChild(cardElement);

  closePopup(newPostModal);

  newPostForm.reset();
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

const allLikeButtons = document.querySelectorAll(".card__like-button");

allLikeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    button.classList.toggle("card__like-button_active");
  });
});

initialCards.forEach(function (item) {
  console.log(item.name);
  console.log(item.link);
});
