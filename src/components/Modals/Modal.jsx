import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleModal } from '../../actions/modalActions';

import './modals.scss';

class Modal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { children: null, show: null };

    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) this.closeModal();
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
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal() { this.props.toggleModal('', {}, false); }

  render() {
    return (
      <div
        className={`modal-backdrop ${this.state.show ? 'open' : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => { this.closeModal(); }}
      >
        <div
          role="dialog"
          className="modal"
          onClick={(e) => { e.stopPropagation(); }}
        >
          {this.state.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  toggleModal,
};

export default connect(null, mapDispatchToProps)(Modal);
