import React, { Component } from 'react';
import * as store from './Budget.action';
import Entries from './entries/Entries';
import Graph from './graph/Graph';
import Save from './save/Save';
import LoginModal from './login/LoginModal';

export default class Budget extends Component {
  constructor(props) {
    super(props);
    store.init(this);
  }

  componentDidMount() {
    store.checkLogin();
    store.loadBudgetRequest();
  }

  render() {
    return (
      <React.Fragment>
        <Entries {...this.state} {...store} />
        <Graph {...this.state} />
        <Save {...this.state} {...store} />
        {this.state.showLogin ? <LoginModal {...this.state} {...store} /> : ''}
      </React.Fragment>
    );
  }
}
