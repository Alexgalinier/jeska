import React, { Component } from 'react';
import Budget from './budget/Budget';
import 'a_design-components/build/css/index.css';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Budget />
      </div>
    );
  }
}
