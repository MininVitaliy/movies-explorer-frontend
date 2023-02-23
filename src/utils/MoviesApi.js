class MoviesApi {
  constructor(obj) {
    this._baseUrl = obj.baseUrl;
  };

  getInitialMovies () {
    return fetch( `${this._baseUrl}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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

export const api = new MoviesApi ({
  baseUrl:'https://api.nomoreparties.co/beatfilm-movies'
});




