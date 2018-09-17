import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleCardDrag } from '../../actions/appActions';
import './DropSlotWrapper.scss';

const dropTarget = {
  drop(props, monitor, component) {
    props.onDrop(monitor.getItem(), props.index);
    component.props.toggleCardDrag();
  },
};

@DropTarget(props => props.accepts, dropTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  dragItem: monitor.getItem(),
}))
class DropSlotWrapper extends Component {
  render() {
    const {
      isOver, // eslint-disable-line
      canDrop, // eslint-disable-line
      connectDropTarget, // eslint-disable-line
      card,
      children,
      activeClass,
      finishedClass,
      itemHoverClass,
      droppedItemClass,
      mainClass,
      index,
      emptyStateElem,
      slot,
    } = this.props;
    const dragItem = this.props.dragItem && this.props.dragItem.card && this.props.dragItem;
    const isFinished = card !== null ? card.isFinished : false;
    const isActive = isOver && canDrop;
    const itemHover = !isActive && canDrop;

    const className = `
      drop-slot-component
      ${mainClass}
      ${isActive && activeClass}
      ${isFinished && finishedClass}
      ${itemHover && itemHoverClass}
      ${card && droppedItemClass}
    `;

    const elem = (
      <div className={className}>
        {
          card && React.cloneElement(children, {
          card, isOver, dragItem, index, slot,
        })}
        { !card && React.cloneElement(emptyStateElem, { ...dragItem, index, slot })}
      </div>
    );

    return connectDropTarget(elem);
  }
}

DropSlotWrapper.defaultProps = {
  mainClass: 'drop-slot-wrapper',
  activeClass: 'drop-slot-active',
  finishedClass: 'drop-slot-finished',
  itemHoverClass: 'drop-slot-item-hover',
  droppedItemClass: 'drop-slot-filled',
  card: null,
  index: null,
  emptyStateElem: <div>Empty slot</div>,
  dragItem: null,
};

DropSlotWrapper.propTypes = {
  mainClass: PropTypes.string,
  activeClass: PropTypes.string,
  finishedClass: PropTypes.string,
  itemHoverClass: PropTypes.string,
  droppedItemClass: PropTypes.string,
  card: PropTypes.object,
  index: PropTypes.number,
  children: PropTypes.node.isRequired,
  emptyStateElem: PropTypes.node,
  slot: PropTypes.object.isRequired,
  dragItem: PropTypes.object,
};
const mapStateToProps = state => ({
  globalStats: state.gameplay.globalStats,
});

const mapDispatchToProp = {
  toggleCardDrag,
};

export default connect(mapStateToProps, mapDispatchToProp)(DropSlotWrapper);
