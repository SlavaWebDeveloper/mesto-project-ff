// Импорт стилей и функций
import './../styles/index.css';
import { createCard, deleteCard, toggleCardLike } from "./components/card";
import { openModal, closeModal } from "./components/modal";
import initialCards from './cards.js';

// Определение переменных
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
const popupInputTypeUrl = document.querySelector('.popup__input_type_url');
const formEditProfile = popupTypeEdit.querySelector('[name="edit-profile"]');
const formNewPlace = popupTypeNewCard.querySelector('[name="new-place"]');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');   

/**
 * Функция для обновления полей формы редактирования профиля значениями из соответствующих элементов профиля
 */
function updateProfileFields() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

/**
 * Функция для обработки отправки формы редактирования профиля
 * @param {Event} evt - Событие отправки формы
 * @param {HTMLElement} popupTypeEdit - HTML-элемент модального окна редактирования профиля
 */
function submitEditProfileForm(evt, popupTypeEdit) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupTypeEdit); 
}

/**
 * Функция для добавления новой карточки
 * @param {Event} evt - Событие
 * @param {HTMLElement} placesList - Список куда вставить изображение
 * @param {HTMLElement} cardTemplate - Шаблон HTML-элемента карточки
 * @param {Function} toggleCardLike - Функция для переключения состояния "Нравится" карточки
 */
function addNewCard(evt, placesList, cardTemplate, toggleCardLike) {
  evt.preventDefault();

  const newCard = {
    name: popupInputTypeCardName.value,
    link: popupInputTypeUrl.value
  };

  placesList.prepend(createCard(cardTemplate, newCard, deleteCard, toggleCardLike, openImagePopup));
}

/**
 * Функция для открытия попапа с изображением карточки
 * @param {string} imageSrc - Ссылка на изображение
 * @param {string} imageAlt - Альтернативный текст изображения
 */
function openImagePopup(imageSrc, imageAlt) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
  openModal(popupTypeImage);
}

// Добавление слушателей событий
profileEditButton.addEventListener('click', () => {
  openModal(popupTypeEdit);
  updateProfileFields();
});

profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

/**
 * Выводит карточки из массива на веб-страницу
 */
initialCards.forEach(function (card) {
  placesList.append(createCard(cardTemplate, card, deleteCard, toggleCardLike, openImagePopup));
})

formEditProfile.addEventListener('submit', (evt) => submitEditProfileForm(evt, popupTypeEdit));

formNewPlace.addEventListener('submit', (evt) => {
  addNewCard(evt, placesList, cardTemplate, toggleCardLike, openImagePopup);
  formNewPlace.reset();
  closeModal(popupTypeNewCard);
});

// Обработчик слушателя с функцией закрытия на все кнопки закрытия
popupCloseButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
})

// Обработчик слушателя закрытия по оверлею на все модальные окна
popups.forEach (function (popup) {
  popup.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }      
  });
});