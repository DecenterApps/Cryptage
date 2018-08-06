/* eslint no-unused-vars: 0 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputComponent from '../../Forms/InputComponent';
import nicknameFormValidator from './nicknameFormValidator';
import { submitNickname } from '../../../actions/gameplayActions';
import ArrowRight from '../../Decorative/ArrowRight';

import formStyle from '../../../common/forms.scss';
import './NicknameForm.scss';

let NicknameForm = ({
  handleSubmit,
  pristine,
  invalid,
  submitFormError,
  submittingForm,
  nickname,
  accountError,
}) => (
  <div className="nickname-form-wrapper">
    {
      (nickname || accountError) && <Redirect to="/" />
    }
    <p className="form-description-title">Welcome to</p>
    <div className="logo-wrapper" />
    <div className="content">
      <form onSubmit={handleSubmit} className="form-wrapper" autoComplete="off">
        <Field
          id="nickname"
          name="nickname"
          showErrorText
          focus
          component={InputComponent}
          placeholder="Nickname"
          type="text"
          wrapperClassName={formStyle['form-item-wrapper']}
          inputClassName={formStyle['form-item']}
          errorClassName={formStyle['form-item-error']}
        />

        <span className={`
            arrow-right-wrapper
            ${pristine || invalid || submittingForm ? 'disabled' : ''}
          `}
        >
          <button type="submit"><ArrowRight /></button>
        </span>

        <label htmlFor="nickname">
          Choose Your Username First
        </label>
        {/* <span>{ submittingForm ? 'Submitting' : 'Submit' }</span> */}
      </form>
      <div className="form-bottom-box" />
    </div>
    <div className="bg"></div>
    {/*<div className="bg-left" />*/}
    {/*<div className="bg-right" />*/}
  </div>
);

NicknameForm.propTypes = {
  submitFormError: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submittingForm: PropTypes.bool.isRequired,
  nickname: PropTypes.string.isRequired,
  accountError: PropTypes.string.isRequired,
};

NicknameForm = reduxForm({ form: 'nicknameForm', validate: nicknameFormValidator })(NicknameForm);

const mapStateToProps = ({ app, gameplay }) => ({
  submitFormError: app.nicknameError,
  submittingForm: app.submittingNickname,
  nickname: gameplay.nickname,
  accountError: app.accountError,
});

const mapDispatchToProps = {
  onSubmit: submitNickname,
};

export default connect(mapStateToProps, mapDispatchToProps)(NicknameForm);
