import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { toggleCardDrag } from '../../actions/appActions';

const boxSource = { beginDrag(props) { return { card: { ...props.card } }; } };

// TODO CHANGE THIS
@DragSource(props => props.card.tags.length > 0 ? props.card.tags[0] : 'null', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview(),
}))
class DragWrapper extends Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), { captureDraggingState: true });
  }

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
  connectDragPreview: null,
  isDragging: false,
};

DragWrapper.propTypes = {
  connectDragSource: PropTypes.func,
  connectDragPreview: PropTypes.func,
  children: PropTypes.node.isRequired,
  toggleCardDrag: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
};

const mapDispatchToProp = {
  toggleCardDrag,
};

export default connect(null, mapDispatchToProp)(DragWrapper);
