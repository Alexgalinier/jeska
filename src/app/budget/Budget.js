import React, { Component } from 'react';
import * as store from './Budget.action';
import Entries from './entries/Entries';
import Graph from './graph/Graph';
import Save from './save/Save';
import LoginModal from './login/LoginModal';
import Header from './header/Header';
import './Budget.css';

export default class Budget extends Component {
  constructor(props) {
    super(props);
    store.init(this);
  }

  componentDidMount() {
    store.checkWindowDimensions();
    store.checkLogin();
    store.loadBudgetRequest();
    window.addEventListener('resize', store.checkWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', store.checkWindowDimensions);
  }

  render() {
    const { isSmall, showEntries, showGraph } = this.state;

    return (
      <div className={'Budget' + (this.state.isSmall ? ' small' : '')}>
        {isSmall ? <Header {...this.state} {...store} /> : <Save {...this.state} {...store} />}
        {this.state.showLogin ? <LoginModal {...this.state} {...store} /> : ''}
        <div className="_fx">
          {!isSmall || showEntries ? <Entries {...this.state} {...store} /> : ''}
          {!isSmall || showGraph ? <Graph {...this.state} /> : ''}
        </div>
      </div>
    );
  }
}
