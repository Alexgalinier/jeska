import React from 'react';

export default ({ max }) => {
  let crosslines = [];
  for (let i = max / 10; i <= max; i = i + max / 10) {
    crosslines.push(i);
  }

  return crosslines.map((_, index) => (
    <div className="crossline" key={index}>
      <span>{_}</span>
      {index === 0 ? <span>0</span> : ''}
    </div>
  ));
};
