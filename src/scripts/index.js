// Импорт стилей и функций
import './../styles/index.css';
import { createCard, deleteCard, toggleCardLike } from "./components/card";
import { openModal, closeModal } from "./components/modal";
import { clearValidation, enableValidation } from './components/validate.js';
import { createPost, getAllCardsPromis, getInfoUserPromise, updateAvatarUserPromis, updateInfoUserPromis } from './components/api.js';
import * as constants from '../utils/constants.js';

let userId = null;
let isSaving = false;

/**
 * Функция для обновления полей формы редактирования профиля значениями из соответствующих элементов профиля
**/
function updateProfileFields() {
  constants.nameInput.value = constants.profileName.textContent;
  constants.jobInput.value = constants.profileJob.textContent;
}

/**
 * Функция для обработки отправки формы редактирования профиля
 * @param {Event} evt - Событие отправки формы
 * @param {HTMLElement} popup - HTML-элемент модального окна редактирования профиля
**/
function submitEditProfileForm(evt, popup) {
  evt.preventDefault();

  if (!isSaving) {
    const button = popup.querySelector('.popup__button');
    isSaving = true;

    button.textContent = 'Сохранение...';

    updateInfoUserPromis({
      name: constants.nameInput.value,
      about: constants.jobInput.value
    })
      .then(() => {
        constants.profileName.textContent = constants.nameInput.value;
        constants.profileJob.textContent = constants.jobInput.value;
        isSaving = false;
        button.textContent = 'Сохранить';
        closeModal(popup);
      })
      .catch((err) => {
        isSaving = false;
        button.textContent = 'Ошибка в сохранении';
        setTimeout(() => {
          button.textContent = 'Сохранить';
        }, 2000);
        console.log(err);
      });
  }
}

/**
 * Функция для добавления новой карточки
 * @param {Event} evt - Событие
 * @param {HTMLElement} placesList - Список куда вставить изображение
 * @param {HTMLElement} cardTemplate - Шаблон HTML-элемента карточки
 * @param {Function} toggleCardLike - Функция для переключения состояния "Нравится" карточки
 * @param {Function} openImagePopup - Функция для открытия попапа с изображением карточки
**/
function addNewCard(evt, placesList, cardTemplate, toggleCardLike, openImagePopup) {
  evt.preventDefault();

  if (!isSaving) {
    const button = constants.formNewPlace.querySelector('.popup__button');
    isSaving = true;

    button.textContent = 'Сохранение...';

    const newCard = {
      name: constants.popupInputTypeCardName.value,
      link: constants.popupInputTypeUrl.value
    };

    createPost({
      name: newCard.name,
      link: newCard.link
    }).then((postData) => {
      isSaving = false;
      button.textContent = 'Сохранить';
      placesList.prepend(createCard(cardTemplate, postData, userId, deleteCard, toggleCardLike, openImagePopup));
      constants.formNewPlace.reset();
      clearValidation(constants.formNewPlace, constants.validationConfig);
      closeModal(constants.popupTypeNewCard);
    })
      .catch((error) => {
        isSaving = false;
        button.textContent = 'Ошибка в сохранении';
        setTimeout(() => {
          button.textContent = 'Сохранить';
        }, 2000);
        console.error('Ошибка при создании поста:', error);
      });
  }
}

/**
 * Функция для открытия попапа с изображением карточки
 * @param {string} imageSrc - Ссылка на изображение
 * @param {string} imageAlt - Альтернативный текст изображения
**/
function openImagePopup(imageSrc, imageAlt) {
  constants.popupImage.src = imageSrc;
  constants.popupImage.alt = imageAlt;
  constants.popupCaption.textContent = imageAlt;
  openModal(constants.popupTypeImage);
}

// Добавление слушателей событий
constants.profileEditButton.addEventListener('click', () => {
  openModal(constants.popupTypeEdit);
  updateProfileFields();
});

constants.profileAddButton.addEventListener('click', () => {
  openModal(constants.popupTypeNewCard);
  clearValidation(constants.popupTypeEdit, constants.validationConfig);
});

constants.formEditProfile.addEventListener('submit', (evt) => {
  clearValidation(constants.formEditProfile, constants.validationConfig);
  submitEditProfileForm(evt, constants.popupTypeEdit);
});

constants.formNewPlace.addEventListener('submit', (evt) => {
  addNewCard(evt, constants.placesList, constants.cardTemplate, toggleCardLike, openImagePopup);
});

// Обработчик слушателя с функцией закрытия на все кнопки закрытия
constants.popupCloseButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
})

// Обработчик слушателя закрытия по оверлею на все модальные окна
constants.popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
});

// Обработчик клика по окну редактирования аватара для открытия модального окна с изображением
constants.popupAvatarEdit.addEventListener('click', () => {
  openModal(constants.popupAvatarImageEdit);
});

// Обработчик события отправки формы редактирования аватара профиля
constants.formEditAvatar.addEventListener('submit', (evt) => submitEditAvatarProfileForm(evt, constants.popupAvatarEdit));

// Функция отправки формы редактирования аватара профиля
function submitEditAvatarProfileForm(evt) {
  evt.preventDefault();

  if (!isSaving) {
    const button = constants.formEditAvatar.querySelector('.popup__button');
    isSaving = true;
    button.textContent = 'Сохранение...';

    // Обновление аватара пользователя через промис
    updateAvatarUserPromis({
      avatar: constants.popupAvatarImageEdit.querySelector('.popup__input_type_url').value,
    })
      .then((res) => {
        isSaving = false;
        button.textContent = 'Сохранить';
        constants.profileImage.style.backgroundImage = `url("${res.avatar}")`;
        constants.formEditAvatar.reset();
        closeModal(constants.popupAvatarImageEdit);
      })
      .catch((err) => {
        isSaving = false;
        button.textContent = 'Ошибка в сохранении';
        setTimeout(() => {
          button.textContent = 'Сохранить';
        }, 2000);
        console.log(err);
      });
  }
}

// Выполнение нескольких промисов: получение информации о пользователе и всех карточек
Promise.all([getInfoUserPromise(), getAllCardsPromis()])
  .then(([userData, cardsData]) => {
    constants.profileName.textContent = userData.name;
    constants.profileJob.textContent = userData.about;
    constants.profileImage.style.backgroundImage = `url("${userData.avatar}")`;
    userId = userData._id;
    
    // Добавление карточек на страницу
    cardsData.forEach((card) => {
      constants.placesList.append(createCard(constants.cardTemplate, card, userId, deleteCard, toggleCardLike, openImagePopup));
    })
  })
  .catch((err) => {
    console.log(err); 
  });
  
// Включение валидации формы
enableValidation(constants.validationConfig);