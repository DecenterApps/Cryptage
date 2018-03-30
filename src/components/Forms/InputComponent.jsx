import React from 'react';
import PropTypes from 'prop-types';

const InputComponent = ({
  input, placeholder, wrapperClassName, inputClassName, errorClassName, showErrorText,
  type, id, showLabel, labelText, labelClass, meta: { touched, error }, focus,
}) => (
  <div className={wrapperClassName}>
    <input
      {...input}
      placeholder={placeholder}
      id={id || ''}
      className={`${inputClassName} ${touched && error ? errorClassName : ''}`}
      type={type}
      autoFocus={focus}
    />
    {showLabel && <label className={labelClass} htmlFor={id || ''}>{ labelText }</label>}
    {touched && ((error && showErrorText && <div className={errorClassName}>{error}</div>))}
  </div>
);

InputComponent.defaultProps = {
  showLabel: false,
  labelText: '',
  labelClass: '',
  id: '',
  placeholder: '',
  showErrorText: false,
  focus: false,
};

InputComponent.propTypes = {
  input: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  wrapperClassName: PropTypes.string.isRequired,
  inputClassName: PropTypes.string.isRequired,
  errorClassName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  showLabel: PropTypes.bool,
  labelText: PropTypes.string,
  labelClass: PropTypes.string,
  meta: PropTypes.object.isRequired,
  showErrorText: PropTypes.bool,
  focus: PropTypes.bool,
};

export default InputComponent;
