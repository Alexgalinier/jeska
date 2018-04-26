import React, { Component } from 'react';
import { Block, Paragraph } from 'a_design-components';
import { maxBudget, restBudget } from './../Budget.service';
import Crosslines from './Crosslines';
import Col from './Col';
import Loader from './../loader/loader';
import './Graph.css';

export default class Graph extends Component {
  state = {
    height: null,
  };
  columnsDOM = null;

  componentDidMount() {
    this.setState({
      height: this.columnsDOM.clientHeight,
    });
  }

  render() {
    const { budget, loadBudgetStatus } = this.props;
    const catMax = maxBudget();
    const rest = restBudget();

    return (
      <div className="graph">
        <div id="info-over" style={{ display: 'none' }} />
        <div className="graph-content">
          <Block title="Bugdet">
            {loadBudgetStatus === 'pending' ? <Loader /> : ''}
            <div className="rest-legend">
              <Paragraph>
                Le Reste (en gris) est l'argent disponible après avoir enlevé les dépenses fixes, l'alimentation et les
                loisirs/divers aux revenues.
              </Paragraph>
              <div className={'rest-num' + (rest < 0 ? ' warning' : '')}>{rest} €</div>
            </div>
            <div className="legend">
              <Crosslines max={catMax} />
            </div>
            <div className="columns" ref={_ => (this.columnsDOM = _)}>
              {budget.map((_, index) => (
                <Col
                  key={_.id}
                  label={_.label}
                  id={_.labelId}
                  color={_.color}
                  max={catMax}
                  parentHeight={this.state.height}
                  data={_.group ? _.group : _.data}
                  shadow={index === budget.length - 1 ? rest : null}
                />
              ))}
            </div>
          </Block>
        </div>
      </div>
    );
  }
}
