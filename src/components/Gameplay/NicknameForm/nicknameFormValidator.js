const nicknameFormValidator = (values) => {
  const errors = {};

  if (!values.nickname) errors.hash = 'Required';
  if (values.nickname && values.nickname.length > 16) errors.nickname = 'The username is too long.';

  return errors;
};

export default nicknameFormValidator;
