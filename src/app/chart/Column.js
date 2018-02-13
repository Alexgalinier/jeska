import React, { Component } from 'react';
import columnSplitter from './shared/columnSplitter';

const SQUARE_HEIGHT = 30;

export default class Column extends Component {
  render() {
    const { name, values, color, unit } = this.props;
    const className = `col ${color}`;

    const entriesSquares = columnSplitter(values, unit, SQUARE_HEIGHT);

    let index = 0,
      colSquares = [],
      entryColor = '',
      indexColor = 0,
      spaceLeft = SQUARE_HEIGHT,
      squareMarginTop = 0;

    entriesSquares.forEach(entry => {
      entryColor = color + (indexColor % 3 + 1);
      entry.forEach(_ => {
        spaceLeft = spaceLeft - _;
        squareMarginTop = 0;

        if (spaceLeft === 0) {
          squareMarginTop = 7;
          spaceLeft = SQUARE_HEIGHT;
        }

        colSquares.push(
          <div
            key={'square' + name + index}
            className={'square ' + entryColor}
            style={{ height: _ + 'px', marginTop: squareMarginTop + 'px' }}
          />
        );
        index = index + 1;
      });
      indexColor = indexColor + 1;
    });

    return (
      <div className={className}>
        <div className="label">{name}</div>
        {colSquares}
      </div>
    );
  }
}
