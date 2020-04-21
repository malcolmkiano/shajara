import validateField from '.'

describe('validateField()', ()=> {

  // set up props
  const testField = {
    label: 'Email Address',
    id: 'email_address',
    value: '',
    type: 'email',
    required: true,
    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    format: 'Must be a valid email address',
    error: null
  }

  it('returns an error when field value doesn\'t match pattern', () => {
    expect(validateField(testField, 'invalid-email').error).toEqual(testField.format)
  })

  it('returns an error when required field value is blank', () => {
    expect(validateField(testField, '').error).toEqual(testField.label + ' is required')
  })

  it('returns OK when all criteria is met', () => {
    expect(validateField(testField, 'validemail@test.com').error).toBeUndefined()
  })

})