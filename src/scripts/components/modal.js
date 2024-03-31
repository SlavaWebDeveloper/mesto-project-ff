/**
 * Функция для закрытия модального окна по нажатию клавиши Esc
 * @param {KeyboardEvent} e - Событие клавиатуры
 */
const closeOnEscKeyPress = (e) => {
  if (e.keyCode === 27) {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

/**
 * Функция для открытия модального окна
 * @param {HTMLElement} popup - HTML-элемент модального окна
 */
export function openModal(popup) { //обязательно нужно принимать html элемент 
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', closeOnEscKeyPress);
}

/**
 * Функция для закрытия модального окна
 * @param {HTMLElement} popup - HTML-элемент модального окна
 */
export function closeModal(popup) { //обязательно нужно принимать html элемент 
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closeOnEscKeyPress);
}