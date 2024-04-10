export const cardTemplate = document.querySelector('#card-template').content;
export const placesList = document.querySelector('.places__list');

export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupImage = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');
export const formEditProfile = popupTypeEdit.querySelector('[name="edit-profile"]');
export const formNewPlace = popupTypeNewCard.querySelector('[name="new-place"]');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const nameInput = formEditProfile.querySelector('.popup__input_type_name');
export const jobInput = formEditProfile.querySelector('.popup__input_type_description');
export const popupInputTypeCardName = document.querySelector('.popup__input_type_card-name');
export const popupInputTypeUrl = document.querySelector('.popup__input_type_url');

export const popupCloseButtons = document.querySelectorAll('.popup__close');
export const popups = document.querySelectorAll('.popup');

export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__description');
export const profileImage = document.querySelector('.profile__image');

export const formEditAvatar = document.querySelector('[name="edit-avatar"]');

export const popupAvatarImageEdit = document.querySelector('.popup_type_image_edit');

export const popupAvatarEdit = document.querySelector('.profile__image_edit-button');

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
