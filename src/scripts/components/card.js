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
export function createCard(cardTemplate, card, deleteCard, toggleCardLike, openImagePopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);  // шаблон для отдельной карточки
  
  const cardImage = cardElement.querySelector('.card__image');

  // Обновление данных
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  // Находим кнопку "лайка" в карточке и добавляем обработчик события клика
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', (evt) => toggleCardLike(evt));

  // Находим изображение в карточке и добавляем обработчик события клика для открытия изображения в попапе
  cardImage.addEventListener('click', () => openImagePopup(cardImage.src, cardImage.alt));

  // Установка обработчика события на кнопку удаления карточки
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement));
  
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
export function toggleCardLike (evt) {
  evt.target.classList.toggle('card__like-button_is-active'); 
}
