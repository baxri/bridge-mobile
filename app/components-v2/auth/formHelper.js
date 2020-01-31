// TODO: Moving to utils if needed
export const isValidState = (formProps, currentInput) => {
  const { isValid, values, errors, submitCount, touched } = formProps

  if (currentInput === 'password') {
    return !isValid
  }

  if (submitCount > 0) {
    return !!errors[currentInput]
  }

  if (touched[currentInput]) {
    return !!errors[currentInput]
  }

  return !values[currentInput]
}
