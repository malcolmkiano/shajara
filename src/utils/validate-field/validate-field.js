export default function validateField(field, value) {
  let error,
    validated = { ...field };

  if (!!value) {
    if (!!field.pattern) {
      if (!field.pattern.test(value)) {
        error = field.format;
      }
    }
  } else {
    if (!!field.required) {
      error = `${field.label} is required`;
    }
  }

  validated.value = value;
  validated.error = error;

  return validated;
}
