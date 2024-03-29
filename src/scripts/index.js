import './../styles/index.css';
import { createCard, cardDelete, addNewCard } from "./components/card";
import { openModal, closeModal } from "./components/modal"
import initialCards from './cards.js';
import { handleFormSubmit, updateProfileFields } from './components/profile.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

const formElement = popupTypeEdit.querySelector('[name="edit-profile"]');
const formNewPlace = popupTypeNewCard.querySelector('[name="new-place"]');

const content = document.querySelector('.page__content');


content.addEventListener('click', function (event) {
  const target = event.target;
  if (target.classList.contains('profile__edit-button')) {
    openModal(popupTypeEdit);
    updateProfileFields();
  }
  if (target.classList.contains('profile__add-button')) {
    openModal(popupTypeNewCard);
  }
  target.classList.contains('card__image') ? openModal(popupTypeImage) : '';
  if (target.closest('.popup__close') || target.classList.contains('popup_is-opened')) {
    const popupOpen = content.querySelector('.popup_is-opened');
    closeModal(popupOpen);
  }
});

/**
 * Выводит карточки из массива на веб-страницу
 */
initialCards.forEach(function (card) {
  placesList.append(createCard(cardTemplate, card, cardDelete));
})

formElement.addEventListener('submit', (evt) => handleFormSubmit(evt, popupTypeEdit));

formNewPlace.addEventListener('submit', (evt) => {
  addNewCard(evt, placesList, cardTemplate);
  formNewPlace.reset();
  closeModal(popupTypeNewCard);
}
);