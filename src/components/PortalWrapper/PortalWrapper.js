import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const PortalWrapper = ({ children }) => ReactDOM.createPortal(children, document.getElementById('portal'));

PortalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PortalWrapper;
