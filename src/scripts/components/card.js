/**
 * Функция для создания HTML-элемента карточки на основе переданных данных
 * @param {HTMLElement} cardTemplate - Шаблон HTML-элемента карточки
 * @param {Object} card - Данные карточки
 * @param {string} card.name - Название карточки
 * @param {string} card.link - Ссылка на изображение карточки
 * @param {Function} cardDelete - Функция для удаления карточки
 * @returns {HTMLElement} - HTML-элемент карточки
 */
export function createCard(cardTemplate, card, cardDelete) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);  // шаблон для отдельной карточки
  
  // Обновление данных
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  
  // Установка обработчика события на кнопку удаления карточки
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    cardDelete(cardElement);
  });

  return cardElement;
}

/**
 * Функция для удаления карточки
 * @param {HTMLElement} cardElement - HTML-элемент карточки
 */
export function cardDelete(cardElement) {
  cardElement.closest('.card').remove();
}