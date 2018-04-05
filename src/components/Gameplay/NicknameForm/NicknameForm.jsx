/* eslint no-unused-vars: 0 */
import React from 'react';
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
  handleSubmit, pristine, invalid, submitFormError, submittingForm
}) => (
  <div className="nickname-form-wrapper">
    <div className="content">
      <p className="form-description-title">
        Welcome to the world of Cryptage!
      </p>
      <p className="form-description">
        As a welcome gift and to help you kick off your
        own crypto venture, we will give you 5 free cards. But please choose your username
        first.
      </p>
      <div className="form-label">
        Enter your name
      </div>

      <form onSubmit={handleSubmit} className="form-wrapper">
        <Field
          name="nickname"
          showErrorText
          focus
          component={InputComponent}
          placeholder=""
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

        {/* <span>{ submittingForm ? 'Submitting' : 'Submit' }</span> */}
      </form>
      <div className="form-bottom-box" />
    </div>
  </div>
);

NicknameForm.propTypes = {
  submitFormError: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submittingForm: PropTypes.bool.isRequired,
};

NicknameForm = reduxForm({ form: 'nicknameForm', validate: nicknameFormValidator })(NicknameForm);

const mapStateToProps = ({ app }) => ({
  submitFormError: app.nicknameError,
  submittingForm: app.submittingNickname,
});

const mapDispatchToProps = {
  onSubmit: submitNickname,
};

export default connect(mapStateToProps, mapDispatchToProps)(NicknameForm);
