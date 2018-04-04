import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import { toggleCardDrag } from '../../actions/appActions';

const boxSource = { beginDrag(props) { return { card: { ...props.card } }; } };

@DragSource(props => props.card.metadata.id, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class DragWrapper extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.isDragging !== nextProps.isDragging) {
      this.props.toggleCardDrag(nextProps.isDragging);
    }
  }

  render() {
    const { connectDragSource, children } = this.props;
    if (connectDragSource) return connectDragSource(<div>{children}</div>);
  }
}

DragWrapper.defaultProps = {
  connectDragSource: null,
  isDragging: false,
};

DragWrapper.propTypes = {
  connectDragSource: PropTypes.func,
  children: PropTypes.node.isRequired,
  toggleCardDrag: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
};

const mapDispatchToProp = {
  toggleCardDrag,
};

export default connect(null, mapDispatchToProp)(DragWrapper);
