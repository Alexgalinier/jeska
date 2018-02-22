import React from 'react';
import { Block } from 'a_design-components';
import { BudgetService } from './../Budget.service';
import Crosslines from './Crosslines';
import Col from './Col';
import './Graph.css';

export default ({ budget }) => {
  const catMax = BudgetService.maxBudget();

  return (
    <div className="graph">
      <div id="info-over" style={{ display: 'none' }} />
      <div className="graph-content">
        <Block title="Bugdet">
          <div className="legend">
            <Crosslines max={catMax} />
          </div>
          <div className="columns">
            {budget.map(_ => (
              <Col
                key={_.id}
                label={_.label}
                id={_.labelId}
                color={_.color}
                max={catMax}
                data={_.group ? _.group : _.data}
              />
            ))}
          </div>
        </Block>
      </div>
    </div>
  );
};
