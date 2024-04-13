import { createLikeCard, deleteLikeCard, deletePost } from "./api";

/**
 * Функция для создания HTML-элемента карточки на основе переданных данных
 * @param {HTMLElement} cardTemplate - Шаблон HTML-элемента карточки
 * @param {Object} cardData - Данные карточки
 * @param {string} card.name - Название карточки
 * @param {string} card.link - Ссылка на изображение карточки
 * @param {Function} deletePost - Функция для удаления карточки
 * @param {Function} toggleCardLike - Функция для переключения состояния "Нравится" карточки
 * @param {Function} openImagePopup - Функция для открытия попапа с изображением карточки
 * @returns {HTMLElement} - HTML-элемент карточки
 */
export function createCard(cardTemplate, cardData, userId, deletePost, toggleCardLike, openImagePopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');

  // Обновление данных
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardElement.querySelector('.card__title').textContent = cardData.name;

  // Находим кнопку "лайка" в карточке и добавляем обработчик события клика
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardData.likes.length ? cardData.likes.length : 0;
  likeButton.dataset.likes = likeCount;

  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', (evt) => {
    toggleCardLike(evt, cardData, likeButton)
  });

  // Находим изображение в карточке и добавляем обработчик события клика для открытия изображения в попапе
  cardImage.addEventListener('click', () => openImagePopup(cardImage.src, cardImage.alt));

  // Установка обработчика события на кнопку удаления карточки
  if (cardData.owner._id === userId) {
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
      deletePost(cardElement, cardData._id);
    });
  } else {
    cardElement.querySelector('.card__delete-button').remove();
  }
  return cardElement;
}

/**
 * Функция для удаления карточки
 * @param {HTMLElement} cardElement - HTML-элемент карточки
 */
export function deleteCard(cardElement) {
  cardElement.closest('.card').remove();
}

/**
 * Функция для переключения состояния "Нравится" карточки
 * @param {Event} evt - Событие
 */
export function toggleCardLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}