import './../styles/index.css'; 
import {createCard, cardDelete} from  "./components/card";
import {openModal, closeModal} from "./components/modal"
import initialCards from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
  
/**
 * Выводит карточки из массива на веб-страницу
 */
initialCards.forEach(function(card) {
  placesList.append(createCard(cardTemplate, card, cardDelete));
})