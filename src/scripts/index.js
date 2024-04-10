// Импорт стилей и функций
import './../styles/index.css';
import { createCard, deleteCard, toggleCardLike } from "./components/card";
import { openModal, closeModal } from "./components/modal";
import { clearValidation, enableValidation } from './components/validate.js';
import { createPost, getAllCardsPromis, getInfoUserPromise, updateAvatarUserPromis, updateInfoUserPromis } from './components/api.js';
import * as data from '../utils/constants.js';

let userId = null;
let isSaving = false;

/**
 * Функция для обновления полей формы редактирования профиля значениями из соответствующих элементов профиля
**/
function updateProfileFields() {
  data.nameInput.value = data.profileName.textContent;
  data.jobInput.value = data.profileJob.textContent;
}

/**
 * Функция для обработки отправки формы редактирования профиля
 * @param {Event} evt - Событие отправки формы
 * @param {HTMLElement} popup - HTML-элемент модального окна редактирования профиля
**/
function submitEditProfileForm(evt, popup) {
  evt.preventDefault();

  data.profileName.textContent = data.nameInput.value;
  data.profileJob.textContent = data.jobInput.value;

  if (!isSaving) {
    const button = popup.querySelector('.popup__button');
    isSaving = true;

    button.textContent = 'Сохранение...';

    updateInfoUserPromis({
      name: data.profileName.textContent,
      about: data.profileJob.textContent
    })
      .then(() => {
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
    const button = data.formNewPlace.querySelector('.popup__button');
    isSaving = true;

    button.textContent = 'Сохранение...';

    const newCard = {
      name: data.popupInputTypeCardName.value,
      link: data.popupInputTypeUrl.value
    };

    createPost({
      name: newCard.name,
      link: newCard.link
    }).then((postData) => {
      isSaving = false;
      button.textContent = 'Сохранить';
      placesList.prepend(createCard(cardTemplate, postData, userId, deleteCard, toggleCardLike, openImagePopup));
      data.formNewPlace.reset();
      clearValidation(data.formNewPlace, data.validationConfig);
      closeModal(data.popupTypeNewCard);
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
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  data.popupCaption.textContent = imageAlt;
  openModal(data.popupTypeImage);
}

// Добавление слушателей событий
data.profileEditButton.addEventListener('click', () => {
  openModal(data.popupTypeEdit);
  updateProfileFields();
});

data.profileAddButton.addEventListener('click', () => {
  openModal(data.popupTypeNewCard);
  clearValidation(data.popupTypeEdit, data.validationConfig);
});

data.formEditProfile.addEventListener('submit', (evt) => {
  clearValidation(data.formEditProfile, data.validationConfig);
  submitEditProfileForm(evt, data.popupTypeEdit);
});

data.formNewPlace.addEventListener('submit', (evt) => {
  addNewCard(evt, data.placesList, data.cardTemplate, toggleCardLike, openImagePopup);
});

// Обработчик слушателя с функцией закрытия на все кнопки закрытия
data.popupCloseButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
})

// Обработчик слушателя закрытия по оверлею на все модальные окна
data.popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
});

// Обработчик клика по окну редактирования аватара для открытия модального окна с изображением
data.popupAvatarEdit.addEventListener('click', () => {
  openModal(data.popupAvatarImageEdit);
});

// Обработчик события отправки формы редактирования аватара профиля
data.formEditAvatar.addEventListener('submit', (evt) => submitEditAvatarProfileForm(evt, data.popupAvatarEdit));

// Функция отправки формы редактирования аватара профиля
function submitEditAvatarProfileForm(evt) {
  evt.preventDefault();

  if (!isSaving) {
    const button = data.formEditAvatar.querySelector('.popup__button');
    isSaving = true;
    button.textContent = 'Сохранение...';

    // Обновление аватара пользователя через промис
    updateAvatarUserPromis({
      avatar: data.popupAvatarImageEdit.querySelector('.popup__input_type_url').value,
    })
      .then((res) => {
        isSaving = false;
        button.textContent = 'Сохранить';
        data.profileImage.style.backgroundImage = `url("${res.avatar}")`;
        data.formEditAvatar.reset();
        closeModal(data.popupAvatarImageEdit);
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
    data.profileName.textContent = userData.name;
    data.profileJob.textContent = userData.about;
    data.profileImage.style.backgroundImage = `url("${userData.avatar}")`;
    userId = userData._id;
    
    // Добавление карточек на страницу
    cardsData.forEach((card) => {
      data.placesList.append(createCard(data.cardTemplate, card, userId, deleteCard, toggleCardLike, openImagePopup));
    })
  })
  .catch((err) => {
    console.log(err); 
  });
  
// Включение валидации формы
enableValidation(data.validationConfig);