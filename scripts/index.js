// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
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

function cardDelete(cardElement) {
  cardElement.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(card) {
  placesList.append(createCard(card));
})