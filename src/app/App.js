import React, { Component } from 'react';
import './App.css';
import Chart from './chart/Chart';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inc: [1000],
      fixExp: [300, 150],
      varExp: [100, 150, 180],
    };
  }

  render() {
    const { inc, fixExp, varExp } = this.state;
    const incTotal = inc.reduce((_1, _2) => _1 + _2);
    const fixExpTotal = fixExp.reduce((_1, _2) => _1 + _2);

    return (
      <div className="App">
        <div className="content">
          <h1>JE$KA</h1>

          <Chart inc={inc} fixExp={fixExp} varExp={varExp} />

          <div className="entries">
            <div className="card mg-r-25">
              <h4>Revenus</h4>
              <div className="pd-25">
                { inc.map((_, i) => (
                  <input key={"incInput" + i} className="input" type="text" defaultValue={_} />
                ))}
              </div>
            </div>

            <div className="card mg-r-25">
              <h4>Dépenses fixes</h4>
              <div className="pd-25">
                { fixExp.map((_, i) => (
                  <input key={"fixExpInput" + i} className="input" type="text" defaultValue={_} />
                ))}
              </div>
            </div>

            <div className="card mg-r-25">
              <h4>Reste</h4>
              <p className="pd-25">
                Ce qu'il reste quand on enlève les dépenses fixes aux revenus :
              </p>
              <p className="rest-value">{incTotal - fixExpTotal}</p>
            </div>

            <div className="card">
              <h4>Autres dépenses</h4>
              <div className="pd-25">
                { varExp.map((_, i) => (
                  <input key={"varExpInput" + i} className="input" type="text" defaultValue={_} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
