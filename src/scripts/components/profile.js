import { closeModal } from "./modal";

const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

export function updateProfileFields() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

export function handleFormSubmit(evt, popupTypeEdit) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

