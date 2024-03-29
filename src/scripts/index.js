import './../styles/index.css';
import { createCard, cardDelete } from "./components/card";
import { openModal, closeModal } from "./components/modal"
import initialCards from './cards.js';
import { handleFormSubmit, updateProfileFields } from './components/profile.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCloseAll = document.querySelectorAll('.popup');
const content = document.querySelector('.page__content')
const formElement = popupTypeEdit.querySelector('[name="edit-profile"]');

content.addEventListener('click', function (event) {
  if (event.target.classList.contains('profile__edit-button')) {
    openModal(popupTypeEdit);
    updateProfileFields();
  }
  event.target.classList.contains('profile__add-button') ? openModal(popupTypeNewCard) : '';
  event.target.classList.contains('card__image') ? openModal(popupTypeImage) : '';
});

popupCloseAll.forEach(popup => {
  popup.addEventListener('click', function (event) {
    if (event.target.closest('.popup__close') || event.target === popup) {
      closeModal(popup);
    }
  });
});

/**
 * Выводит карточки из массива на веб-страницу
 */
initialCards.forEach(function (card) {
  placesList.append(createCard(cardTemplate, card, cardDelete));
})

formElement.addEventListener('submit', (evt) => handleFormSubmit(evt, popupTypeEdit));
