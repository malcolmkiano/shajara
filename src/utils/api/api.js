import config from '../../config'
import { TokenService } from '..'


const REGISTER_ENDPOINT = '/users'
const LOGIN_ENDPOINT = '/auth/login'
const ENTRIES_ENDPOINT = '/entries'


/**
 * abstracts making API calls with error handling built in
 */
function makeRequest(url, options) {
  let error;
  return fetch(config.API_BASE_URL + url, options)
    .then(res => {
      if (!res.ok) error = { code: res.status }
      if (res.status !== 204 &&
        !res.headers.get('content-type').includes('json')) {
        error.message = res.statusText
        return Promise.reject(error)
      }

      return res.status !== 204 && res.json()
    })
    .then(data => {
      if (error) {
        error.message = data.error
        return Promise.reject(error)
      }

      return data
    })
}


function makeSecureRequest(url, options = {}) {
  const authToken = TokenService.getAuthToken()

  if (!options.headers) options.headers = {}
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${authToken}`
  }
  return makeRequest(url, options)
}


/**
 * creates a new user account on the server
 * @param {Object} user user object to submit
 * @param {string} user.first_name the user's first name
 * @param {string} user.email_address the user's email address
 * @param {string} user.password the user's password
 */
function register(user) {
  return makeRequest(REGISTER_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
}


/**
 * gets an authorization token from the server
 * @param {Object} credentials user credentials to log in
 * @param {string} credentials.email_address the user's email address
 * @param {string} credentials.password the user's password
 */
function login(credentials) {
  return makeRequest(LOGIN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
}


/**
 * gets all user entried given a user token
 */
function getEntries() {
  return makeSecureRequest(ENTRIES_ENDPOINT)
}


/**
 * creates a new entry on the server
 * @param {{}} entry the new entry object
 */
function createEntry(entry) {
  return makeSecureRequest(ENTRIES_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  })
}


/**
 * updates an entry on the server
 * @param {string} id the id of the entry to be updated
 * @param {{}} entry object with data to update
 */
function updateEntry(id, entry) {
  return makeSecureRequest(`${ENTRIES_ENDPOINT}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry)
  })
}


export default {
  register,
  login,
  getEntries,
  createEntry,
  updateEntry,

  makeRequest
}