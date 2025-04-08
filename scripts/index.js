const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostInput = newPostModal.querySelector("#card-image-input");
const newPostCaptionInput = newPostModal.querySelector("#caption-input");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const cardsContainer = document.querySelector(".page__section");

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
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

  newPostModal.classList.remove("modal_is-opened");

  newPostForm.reset();
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

const allLikeButtons = document.querySelectorAll(".card__like-button");

allLikeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    button.classList.toggle("card__like-button_active");
  });
});
