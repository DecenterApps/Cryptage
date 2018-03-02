import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import './DropSlotWrapper.scss';

const dropTarget = { drop(props, monitor) { props.onDrop(monitor.getItem()); } };

@DropTarget(props => props.accepts, dropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
class DropSlotWrapper extends Component {
  render() {
    const {
      isOver,
      canDrop,
      connectDropTarget,
      lastDroppedItem,
      children,
      activeClass,
      itemHoverClass,
      droppedItemClass,
      mainClass,
    } = this.props;
    const isActive = isOver && canDrop;
    const itemHover = !isActive && canDrop;

    const className = `
      drop-slot-component
      ${mainClass}
      ${isActive && activeClass}
      ${itemHover && itemHoverClass}
      ${lastDroppedItem && droppedItemClass}
    `;

    return connectDropTarget(
      <div className={className}>
        { lastDroppedItem && React.cloneElement(children, { ...lastDroppedItem, isOver}) }
      </div>,
    );
  }
}

DropSlotWrapper.defaultProps = {
  mainClass: 'drop-slot-wrapper',
  activeClass: 'drop-slot-active',
  itemHoverClass: 'drop-slot-item-hover',
  droppedItemClass: 'drop-slot-filled',
  lastDroppedItem: null,
};

DropSlotWrapper.propTypes = {
  mainClass: PropTypes.string,
  activeClass: PropTypes.string,
  itemHoverClass: PropTypes.string,
  droppedItemClass: PropTypes.string,
  lastDroppedItem: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default DropSlotWrapper;
