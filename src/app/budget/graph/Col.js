import React from 'react';

export default ({ label, id, color, max, data }) => {
  const percentHeight = (val, max) => {
    return {
      height: Math.round(val / max * 100) + '%',
    };
  };

  const sumValues = entry => {
    if (entry.value) return entry.value;
    if (entry.data) return entry.data.reduce((acc, _) => acc + _.value, 0);
  };

  return (
    <div className={'col ' + color} id={id}>
      <label htmlFor={id}>{label}</label>
      <div className="rects">
        {data.map(_ => (
          <div className="rect" key={_.id} id={_.id} style={percentHeight(sumValues(_), max)}>
            <span>{_.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
