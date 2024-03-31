/**
 * Функция для создания HTML-элемента карточки на основе переданных данных
 * @param {HTMLElement} cardTemplate - Шаблон HTML-элемента карточки
 * @param {Object} card - Данные карточки
 * @param {string} card.name - Название карточки
 * @param {string} card.link - Ссылка на изображение карточки
 * @param {Function} cardDelete - Функция для удаления карточки
 * @param {Function} toggleCardLike - Функция для переключения состояния "Нравится" карточки
 * @param {Function} openImagePopup - Функция для открытия попапа с изображением карточки
 * @returns {HTMLElement} - HTML-элемент карточки
 */
export function createCard(cardTemplate, card, cardDelete, toggleCardLike, openImagePopup) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);  // шаблон для отдельной карточки

  // Обновление данных
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;

  // Находим кнопку "лайка" в карточке и добавляем обработчик события клика
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', (evt) => toggleCardLike(evt));

  // Находим изображение в карточке и добавляем обработчик события клика для открытия изображения в попапе
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', () => openImagePopup(cardImage.src, cardImage.alt));

  // Установка обработчика события на кнопку удаления карточки
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => removeCard(cardElement));
  
  return cardElement;
}

/**
 * Функция для удаления карточки
 * @param {HTMLElement} cardElement - HTML-элемент карточки
 */
export function cardDelete(cardElement) {
  cardElement.closest('.card').remove();
}

/**
 * Функция для добавления новой карточки
 * @param {Event} evt - Событие
 * @param {HTMLElement} placesList - Список куда вставить изображение
 * @param {HTMLElement} cardTemplate - Шаблон HTML-элемента карточки
 * @param {Function} toggleCardLike - Функция для переключения состояния "Нравится" карточки
 */
export function addNewCard(evt, placesList, cardTemplate, toggleCardLike) {
  evt.preventDefault();

  let newCard = {
    name: document.querySelector('.popup__input_type_card-name').value,
    link: document.querySelector('.popup__input_type_url').value
  };

  placesList.prepend(createCard(cardTemplate, newCard, cardDelete, toggleCardLike, openImagePopup));
}

/**
 * Функция для переключения состояния "Нравится" карточки
 * @param {Event} evt - Событие
 */
export function toggleCardLike (evt) {
  evt.target.classList.toggle('card__like-button_is-active'); 
}

/**
 * Функция для открытия попапа с изображением карточки
 * @param {string} imageSrc - Ссылка на изображение
 * @param {string} imageAlt - Альтернативный текст изображения
 */
export function openImagePopup(imageSrc, imageAlt) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;
}