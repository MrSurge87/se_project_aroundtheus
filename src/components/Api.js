export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._authorization = headers.authorization;
    this._contentType = headers["Content-Type"];
  }

  //Check if JSON object ok
  _checkResponseOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      Promise.reject(`Erorr: ${res.status}`)
    }
  }

  //Get initial cards from URL
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponseOk)

  }

  //Get user info
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponseOk)

  }

  //Profile Update
  profileUpdate(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: data.title,
        about: data.about,
      }),
      headers: this._headers,
    }).then(this._checkResponseOk)

  }

  //Adding Cards
  addCard(title, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: title,
        link: link,
      }),
      headers: this._headers,
    }).then(this._checkResponseOk)

  }

  //Deleteing Cards
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponseOk)

  }

  //Like Button
  cardLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponseOk)

  }

  //Remove Like from card
  removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponseOk)

  }

  //Profile picture update
  updateProfileAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._checkResponseOk)

  }
}
