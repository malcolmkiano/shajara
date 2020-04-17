import config from '../config'
import SVR from './server-data'

const REGISTER_ENDPOINT = '/post'
const LOGIN_ENDPOINT = '/post'
const ENTRIES_ENDPOINT = '/uuid'
let FN = null


/**
 * abstracts making API calls with error handling built in
 */
function makeRequest(url, options) {
  let error
  return fetch(config.API_ENDPOINT + url, options)
    .then(res => {
      if (!res.ok) error.code = res.status
      if (!res.headers.get('content-type').includes('json')) {
        error.message = res.statusText
        return Promise.reject(error)
      }

      return res.json()
    })
    .then(data => {
      if (error) {
        error.message = data.message
        return Promise.reject(error)
      }

      return data
    })
}


/**
 * creates a new user account on the server
 * @param {Object} user user object to submit
 * @param {string} user.first_name the user's first name
 * @param {string} user.email_address the user's email address
 * @param {string} user.password the user's password
 */
function register(user) {
  return fakeRequest(REGISTER_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
    .then(data => {

      // formatting the data how we want it back from the server
      // remove this logic once server is completed
      if (data.json.email_address === 'john@doe.co') {
        return Promise.reject('An account using that email exists.')
      }

      FN = data.json.first_name

      data = {
        id: 1,
        email_address: data.json.email_address,
        first_name: data.json.first_name,
        date_created: new Date().toISOString()
      }

      return data

    })
}


/**
 * gets an authorization token from the server
 * @param {Object} credentials user credentials to log in
 * @param {string} credentials.email_address the user's email address
 * @param {string} credentials.password the user's password
 */
function login(credentials) {
  return fakeRequest(LOGIN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
    .then(data => {

      // formatting the data how we want it back from the server
      // remove this logic once server is completed
      if (data.json.email_address === 'elena@ohnuts.co') {
        if (data.json.password === 'Elena1234') {
          data = {
            first_name: 'Elena',
            authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5e' // sample JWT for Elena
          }
        } else {
          return Promise.reject('Incorrect email/password combination.')
        }

      } else if (data.json.email_address === 'john@doe.co' && data.json.password === 'Password911') {
        data = {
          first_name: 'John',
          authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5j' // sample JWT for John
        }

      } else {
        data = {
          first_name: FN || 'friend',
          authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5b' // sample JWT for anyone else
        }
      }

      return data

    })
}


/**
 * gets all user entried given a user token
 * @param {string} authToken JWT to include in request header
 */
function getEntries(authToken) {
  return fakeRequest(ENTRIES_ENDPOINT, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${authToken}` }
  })
    .then(data => {

      // formatting the data how we want it back from the server
      // remove this logic once server is completed
      data = SVR[authToken]

      return data

    })
}

// remove once API is developed
function fakeRequest(url, options) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve({
        json: options.body ? JSON.parse(options.body) : {}
      })
    }, 500)
  })
}


export default {
  register,
  login,
  getEntries,
  makeRequest
}