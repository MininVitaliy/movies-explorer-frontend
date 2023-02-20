class ApiMe {
  constructor(obj) {
    this._baseUrl = obj.baseUrl;
  };

  getInitialCards () {
    return fetch( `${this._baseUrl}/movies`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
        .then(this._checkResponse)
  };

  changeUserProfile (emailNew, nameNew) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        email:`${emailNew}`,
        name:`${nameNew}`
      })
    })
        .then(this._checkResponse)
  };

  addNewCardOnTheServer (card, image, thumbnail) {
    return fetch( `${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        country: `${card.country}`,
        director: `${card.director}`,
        duration: `${card.duration}`,
        year: `${card.year}`,
        description: `${card.description}`,
        image: `${image}`,
        trailerLink: `${card.trailerLink}`,
        thumbnail: `${thumbnail}`,
        id: `${card.id}`,
        nameRU: `${card.nameRU}`,
        nameEN: `${card.nameEN}`
      })
    })
        .then(this._checkResponse)
  };

  deleteCardTheServer (cardNumberId) {
    return fetch( `${this._baseUrl}/movies/${cardNumberId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
        .then(this._checkResponse)
  };

  _checkResponse (res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
};

export const apiMe = new ApiMe({
  baseUrl: 'https://api.diploma.mininvitali.nomoredomains.rocks'
});

export const BASE_URL = 'https://api.diploma.mininvitali.nomoredomains.rocks'

export const register = ({name, email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password})
  })
      .then(checkResponse)
};

export const authorize = ({email, password}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
      .then(checkResponse)
      .then((res) => {
        if (res.token){
          localStorage.setItem('token', res.token);
          return res;
        } else {
          return;
        }
      })
};

export const getContentUser = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`,
    }
  })
      .then(checkResponse)
}

function checkResponse (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}