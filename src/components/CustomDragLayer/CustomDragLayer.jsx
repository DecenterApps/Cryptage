import React from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import CanPlayCardChecker from '../CanPlayCardChecker/CanPlayCardChecker';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) return { display: 'none' };

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return { transform, WebkitTransform: transform };
}

@DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
}))
export default class CustomDragLayer extends React.Component {
  renderItem(type, item) {
    return <CanPlayCardChecker card={item.card} />;
  }

  render() {
    const { item, itemType, isDragging } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}

CustomDragLayer.defaultProps = {
  isDragging: false,
  item: null,
  itemType: '',
  currentOffset: { x: 0, y: 0 },
};

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  isDragging: PropTypes.bool,
};
