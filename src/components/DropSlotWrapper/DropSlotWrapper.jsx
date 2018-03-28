import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import './DropSlotWrapper.scss';

const dropTarget = { drop(props, monitor) { props.onDrop(monitor.getItem()); } };

@DropTarget(props => props.accepts, dropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  dragItem: monitor.getItem(),
}))
class DropSlotWrapper extends Component {
  render() {
    const {
      dragItem,
      isOver,
      canDrop,
      connectDropTarget,
      lastDroppedItem,
      children,
      activeClass,
      finishedClass,
      itemHoverClass,
      droppedItemClass,
      mainClass,
      index,
      emptyStateElem,
    } = this.props;
    const isFinished = lastDroppedItem !== null ? lastDroppedItem.isFinished : false;
    const isActive = isOver && canDrop;
    const itemHover = !isActive && canDrop;

    const className = `
      drop-slot-component
      ${mainClass}
      ${isActive && activeClass}
      ${isFinished && finishedClass}
      ${itemHover && itemHoverClass}
      ${lastDroppedItem && droppedItemClass}
    `;

    return connectDropTarget(
      <div className={className}>
        { lastDroppedItem && React.cloneElement(children, { ...lastDroppedItem, isOver, index }) }
        { !lastDroppedItem && React.cloneElement(emptyStateElem, { ...dragItem }) }
      </div>,
    );
  }
}

DropSlotWrapper.defaultProps = {
  mainClass: 'drop-slot-wrapper',
  activeClass: 'drop-slot-active',
  finishedClass: 'drop-slot-finished',
  itemHoverClass: 'drop-slot-item-hover',
  droppedItemClass: 'drop-slot-filled',
  lastDroppedItem: null,
  index: null,
  emptyStateElem: <div>Empty slot</div>,
};

DropSlotWrapper.propTypes = {
  mainClass: PropTypes.string,
  activeClass: PropTypes.string,
  finishedClass: PropTypes.string,
  itemHoverClass: PropTypes.string,
  droppedItemClass: PropTypes.string,
  lastDroppedItem: PropTypes.object,
  index: PropTypes.number,
  children: PropTypes.node.isRequired,
  emptyStateElem: PropTypes.node,
};

export default DropSlotWrapper;
