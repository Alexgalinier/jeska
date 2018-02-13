import React, { Component } from 'react';

export default class Delimiter extends Component {
  render() {
    const { val, max } = this.props;

    return (
      <div
        className="delimiter"
        style={{ bottom: val / max * 10 * 37 + 25 + 28 - 10 + 'px' }}
      >
        <div className="delimiter-val">{val}</div>
        <div className="delimiter-line" />
      </div>
    );
  }
}
