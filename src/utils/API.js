/**
 * Created by joewolfgram on 7/30/17
 */
// const BASEURL = 'http://localhost:3000/api';

export const authenticateUser = (username, password) => {
  return new Promise(function(resolve, reject) {
    fetch(`api/auth`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: "same-origin",
      body: JSON.stringify({username: username, password: password})
    }).then((response) => {
      if (response.status != 200) {
        response.text().then((err) => {
          reject(err)
        })
      } else {
        resolve(response.json())
      }
    }).catch((err) => {
      reject(err)
    })
  })
};

export const logout = () => {
  return fetch(`api/logout`, {
    method: 'get',
    credentials: "same-origin"
  }).then((response) => {
    if (response.status != 200) {
      response.text().then((err) => {
        throw err
      })
    } else {
      return response.json()

    }
  })
};

export const getRandomQuote = () => {
  return fetch(`api/getRandomQuote`, {
    method: 'get',
    credentials: "same-origin"
  }).then((response) => {
    return response.json()

  })
};
