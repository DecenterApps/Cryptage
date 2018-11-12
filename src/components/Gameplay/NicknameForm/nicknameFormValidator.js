import ethService from '../../../services/ethereumService';

export const validate = (values) => {
  const errors = {};
  if (!values.nickname) errors.hash = 'Required';
  if (values.nickname && values.nickname.length > 16) {
    errors.nickname = 'The username is too long.';
  }
  return errors;
};

export const asyncValidate = async (values) => {
  const allNicknames = await ethService.getNicknames();
  const isExisting = allNicknames.includes(values.nickname);
  if (values.nickname && isExisting) {
    throw { nickname: 'That nickname is taken.' }; // eslint-disable-line
  }
};