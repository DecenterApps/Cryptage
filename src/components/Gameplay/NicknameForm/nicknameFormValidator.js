const nicknameFormValidator = (values) => {
  const errors = {};

  if (!values.nickname) errors.hash = 'Required';

  return errors;
};

export default nicknameFormValidator;
