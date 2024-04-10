const BASE_URL = 'https://nomoreparties.co/v1/wff-cohort-10/';
const TOKEN = '2b5fb7cf-c322-4517-a31a-14af5c067d56';

const config = {
  baseUrl: BASE_URL,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
}

const handleRequest = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};


export function getInfoUserPromise() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(handleRequest)
}

export function getAllCardsPromis() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleRequest)
}

export function updateInfoUserPromis(data) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(handleRequest)
}

export function createPost(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(handleRequest)
}


export function deletePost(data) {
  return fetch(`${config.baseUrl}/cards/${data}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleRequest)
}

export function createLikeCard(data) {
  return fetch(`${config.baseUrl}/cards/likes/${data}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(handleRequest)
}


export function deleteLikeCard(data) {
  return fetch(`${config.baseUrl}/cards/likes/${data}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(handleRequest)
}

export function updateAvatarUserPromis(data) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data)
  })
    .then(handleRequest)
}

export function getInfoHead(url) {
  return fetch(url, {
    method: 'HEAD'
  })
    .then(response => {
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.startsWith('image/')) {
          return true;
        } else {
          return false;
        }
      } else {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }
    })
}