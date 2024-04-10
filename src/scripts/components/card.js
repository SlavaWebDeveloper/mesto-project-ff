import { createLikeCard, deleteLikeCard, deletePost } from "./api";

/**
 * Функция для создания HTML-элемента карточки на основе переданных данных
 * @param {HTMLElement} cardTemplate - Шаблон HTML-элемента карточки
 * @param {Object} card - Данные карточки
 * @param {string} card.name - Название карточки
 * @param {string} card.link - Ссылка на изображение карточки
 * @param {Function} deleteCard - Функция для удаления карточки
 * @param {Function} toggleCardLike - Функция для переключения состояния "Нравится" карточки
 * @param {Function} openImagePopup - Функция для открытия попапа с изображением карточки
 * @returns {HTMLElement} - HTML-элемент карточки
 */
export function createCard(cardTemplate, card, userId, deleteCard, toggleCardLike, openImagePopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);  // шаблон для отдельной карточки

  const cardImage = cardElement.querySelector('.card__image');

  // Обновление данных
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardElement.querySelector('.card__title').textContent = card.name;

  // Находим кнопку "лайка" в карточке и добавляем обработчик события клика
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = card.likes.length ? card.likes.length : 0;
  likeButton.dataset.likes = likeCount;
  
  if(card.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', (evt) => {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      deleteLikeCard(card._id)
        .then((card) => {
          toggleCardLike(evt);
          likeButton.dataset.likes = card.likes.length;
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        }); 
    } else {
      createLikeCard(card._id)
        .then((card) => {
          toggleCardLike(evt);
          likeButton.dataset.likes = card.likes.length;
        })
        .catch((err) => {
          console.log(err); // выводим ошибку в консоль
        }); 
    }
  });

  // Находим изображение в карточке и добавляем обработчик события клика для открытия изображения в попапе
  cardImage.addEventListener('click', () => openImagePopup(cardImage.src, cardImage.alt));

  // Установка обработчика события на кнопку удаления карточки
  if (card.owner._id === userId) {
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
      deleteCard(cardElement);
      deletePost(card._id)
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