import React, { Component } from 'react';
import Column from './Column';
import Delimitier from './Delimiter';
import './Chart.css';

export default class Chart extends Component {
  render() {
    const { inc, fixExp, varExp } = this.props;
    const incTotal = inc.reduce((_1, _2) => _1 + _2);
    const fixExpTotal = fixExp.reduce((_1, _2) => _1 + _2);
    const varExpTotal = varExp.reduce((_1, _2) => _1 + _2);
    const max = Math.max(incTotal, fixExpTotal, varExpTotal);
    const unit = max / 10;

    let delimiters = [];
    for (let i = 1; i <= 10; i++) {
      delimiters.push(
        <Delimitier key={'delimiter' + i} val={unit * i} max={max} />
      );
    }

    return (
      <div className="chart card pd-25">
        {delimiters}
        <Column
          ref="inc"
          name="Revenus"
          values={inc}
          unit={unit}
          color="green"
        />
        <Column
          ref="fixExp"
          name="Dépenses fixes"
          values={fixExp}
          unit={unit}
          color="blue"
        />
        <Column
          ref="rest"
          name="Reste"
          values={[incTotal - fixExpTotal]}
          unit={unit}
          color="grey"
        />
        <Column
          ref="varExp"
          name="Autres dépenses"
          values={varExp}
          unit={unit}
          color="orange"
        />
      </div>
    );
  }
}
