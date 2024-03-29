const eventHandler = (e) => {
  if (e.keyCode === 27) {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', eventHandler);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', eventHandler);
}