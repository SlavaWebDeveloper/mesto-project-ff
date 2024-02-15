// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

// @todo: DOM узлы

// @todo: Функция создания карточки

function createCard(card, cardDelete) {
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true);  // шаблон для отдельной карточки
  
  // обновление данных
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;

  // добавление прослушки на кнопку 
  cardElement.querySelector('.card__delete-button').addEventListener('click', cardDelete);
  
  return cardElement;
}

renderCard.forEach(function(card) {
  placesList.append(createCard(card));
})

createCard(initialCards);
