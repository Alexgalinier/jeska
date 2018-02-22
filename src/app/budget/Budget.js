import React, { Component } from 'react';
import { BudgetService } from './Budget.service';
import Entries from './entries/Entries';
import Graph from './graph/Graph';

export default class Budget extends Component {
  constructor(props) {
    super(props);

    this.state = { budget: [] };
  }

  componentDidMount() {
    this.loadBudget();
  }

  loadBudget = () => {
    BudgetService.fetchBudget().then(_ => this.setState({ budget: _ }));
  };

  handleChange = (id, type, val) => {
    BudgetService.updateBudget(id, type, val).then(() => this.loadBudget());
  };

  render() {
    return (
      <React.Fragment>
        <Entries {...this.state} onChange={this.handleChange} />
        <Graph {...this.state} />
      </React.Fragment>
    );
  }
}
