const closeOnEscKeyPress = (e) => {
  if (e.keyCode === 27) {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

export function openModal(popup) { //обязательно нужно принимать html элемент 
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', closeOnEscKeyPress);
}

export function closeModal(popup) {//обязательно нужно принимать html элемент 
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closeOnEscKeyPress);
}