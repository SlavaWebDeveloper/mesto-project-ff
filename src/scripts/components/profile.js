import { closeModal } from "./modal";

const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

/**
 * Функция для обновления полей формы редактирования профиля значениями из соответствующих элементов профиля
 */
export function updateProfileFields() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

/**
 * Функция для обработки отправки формы редактирования профиля
 * @param {Event} evt - Событие отправки формы
 * @param {HTMLElement} popupTypeEdit - HTML-элемент модального окна редактирования профиля
 */
export function handleFormSubmit(evt, popupTypeEdit) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupTypeEdit); 
}