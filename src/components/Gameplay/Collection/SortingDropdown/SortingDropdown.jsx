import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SortingDropdown.scss';

class SortingDropdown extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      selectedItemIndex: 0,
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.selectItem = this.selectItem.bind(this);
  }

  componentDidMount() {
    this.selectItem(this.props.data[this.state.selectedItemIndex], this.state.selectedItemIndex);
    this.setState({ open: false });
  }

  toggleDropdown() {
    this.setState({ open: !this.state.open });
  }

  selectItem(dataItem, index) {
    this.setState({ selectedItemIndex: index });
    this.toggleDropdown();
    this.props.onSelect(dataItem);
  }

  render() {
    const { data } = this.props;
    const { open, selectedItemIndex } = this.state;
    const item = data[selectedItemIndex];

    return (
      <div className="sorting-dropdown-wrapper">
        <div className="label">FILTER:</div>
        <div
          className="selected-item"
          onClick={this.toggleDropdown}
          style={{ borderColor: item.color[0] }}
        >
          <div className="title">{ item.name }</div>
          <div className="count">{ item.collected } / { item.total } <span>▾</span></div>
        </div>

        {
          open &&
          <div className="dropdown-items">
            {
              data.map((dataItem, index) =>
                <div
                  className="dropdown-item"
                  key={dataItem.name}
                  onClick={() => { this.selectItem(dataItem, index); }}
                  style={{ borderColor: dataItem.color[0] }}
                >
                  <div className="title">{ dataItem.name }</div>
                  <div className="count">{ dataItem.collected } / { dataItem.total }</div>
                </div>)
            }
          </div>
        }
      </div>
    );
  }
}

SortingDropdown.propTypes = {
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SortingDropdown;
