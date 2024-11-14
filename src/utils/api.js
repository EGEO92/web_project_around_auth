class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Bien hecho!!! Cartas iniciales listas");
      });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error ${res.status}`);
        }
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Bien hecho!!!");
      });
  }

  editUserAvatar(link) {
    fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error ${res.status}`);
        }
      })
      .then((result) => {
        return result;
      });
  }

  addCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("Bien hecho!!! carta nueva");
      });
  }

  removeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }

  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Error ${res.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.removeLike(cardId);
    } else {
      return this.addLike(cardId);
    }
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web_es_11",
  headers: {
    authorization: "072a79cd-90d0-408b-be9c-36f27d8f66a3",
    "Content-Type": "application/json",
  },
});

export default api;
