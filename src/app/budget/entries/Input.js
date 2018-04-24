import React, { Component } from 'react';

export default class Input extends Component {
  state = {
    value: this.props.inputValue,
  };

  hanldeChange = e => {
    this.props.inputOnChange(e);
    this.setState({ value: e.target.value });
  };

  render() {
    const { inputRef } = this.props;

    return (
      <input ref={inputRef} type="text" className="input _mr10" value={this.state.value} onChange={this.hanldeChange} />
    );
  }
}
