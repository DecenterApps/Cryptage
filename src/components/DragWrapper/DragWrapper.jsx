import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const boxSource = { beginDrag(props) { return { card: { ...props.card } }; } };

@DragSource(props => props.card.metadata.id, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
class DragWrapper extends Component {
  render() {
    const { connectDragSource, children } = this.props;
    if (connectDragSource) return connectDragSource(<div>{children}</div>);
  }
}

DragWrapper.defaultProps = {
  connectDragSource: null,
};

DragWrapper.propTypes = {
  connectDragSource: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default DragWrapper;
