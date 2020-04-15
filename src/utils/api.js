import config from '../config'

/**
 * abstracts making API calls with error handling built in
 */
function makeRequest(options) {
  let error;
  return fetch(config.API_ENDPOINT, options)
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
  return makeRequest({
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

      data = {
        id: 1,
        email_address: data.json.email_address,
        first_name: data.json.first_name,
        date_created: new Date().toISOString()
      }

      return data

    })
}


function login(credentials) {
  return makeRequest({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
    .then(data => {

      // formatting the data how we want it back from the server
      // remove this logic once server is completed
      if (data.json.email_address === 'elena@ohnuts.co' && data.json.password === 'Elena1234') {
        data = {
          first_name: 'Elena',
          authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' // sample JWT
        }
      } else if (data.json.email_address === 'john@doe.co' && data.json.password === 'Password911') {
        data = {
          first_name: 'John',
          authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' // sample JWT
        }
      } else {
        return Promise.reject('Incorrect email/password combination.')
      }

      return data

    })
}


export default {
  register,
  login
}