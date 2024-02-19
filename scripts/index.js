/**
 * @fileoverview Файл содержит скрипт для работы с карточками на веб-странице
 * @version 1.0.0
 */

/**
 * Шаблон для создания карточки
 * @type {HTMLTemplateElement}
 */
const cardTemplate = document.querySelector('#card-template').content;

/**
 * Узел списка карточек
 * @type {HTMLElement}
 */
const placesList = document.querySelector('.places__list');

/**
 * Функция для создания HTML-элемента карточки на основе переданных данных
 * @param {Object} card - Данные карточки
 * @param {string} card.name - Название карточки
 * @param {string} card.link - Ссылка на изображение карточки
 * @returns {HTMLElement} - HTML-элемент карточки
 */
function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);  // шаблон для отдельной карточки
  
  // обновление данных
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  
  cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
    cardDelete(cardElement);
  });

  return cardElement;
}

/**
 * Функция для удаления карточки
 * @param {HTMLElement} cardElement - HTML-элемент карточки
 */
function cardDelete(cardElement) {
  cardElement.closest('.card').remove();
}

/**
 * Выводит карточки из массива на веб-страницу
 */
initialCards.forEach(function(card) {
  placesList.append(createCard(card));
})