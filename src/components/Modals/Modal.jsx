import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './modals.scss';

class Modal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { children: null, show: null };
  }

  componentWillMount() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) this.props.closeModal();
    });
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.modalOpen && (this.state.children !== null)) {
      setTimeout(() => { this.setState({ show: null }); }, 300);
      return setTimeout(() => { this.setState({ children: null }); }, 450);
    }

    if (newProps.modalOpen) { this.setState({ show: true }); }

    return this.setState({ children: newProps.children });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.closeModal);
  }

  render() {
    return (
      <div
        className={`modal-backdrop ${this.state.show ? 'open' : ''}`}
        role="button"
        tabIndex={0}
        onClick={this.props.closeModal}
      >
        <div className="modal-wrapper" style={{ width: this.props.width }}>
          <div
            role="dialog"
            className="modal"
            onClick={(e) => { e.stopPropagation(); }}
          >
            {this.state.children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  width: '100%',
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  width: PropTypes.string,
};

export default Modal;
