import React from 'react';

export default ({ label, id, color, max, parentHeight, data }) => {
  const percentHeight = (val, max) => {
    const rectHeightPercent = Math.round(val / max * 100);
    const rectHeight = parentHeight ? Math.round(parentHeight * rectHeightPercent / 100) : null;

    return {
      height: rectHeightPercent + '%',
      fontSize: !rectHeight || rectHeight >= 18 ? '16px' : rectHeight - 2 + 'px',
    };
  };

  const sumValues = entry => {
    if (entry.value) return entry.value;
    if (entry.data) return entry.data.reduce((acc, _) => acc + (_.value ? _.value : 0), 0);
  };

  return (
    <div className={'col ' + color} id={id}>
      <label htmlFor={id}>{label}</label>
      <div className="rects">
        {data.map(
          _ =>
            sumValues(_) !== 0 ? (
              <div className="rect" key={_.id} id={_.id} style={percentHeight(sumValues(_), max)}>
                <span>{_.label}</span>
              </div>
            ) : (
              ''
            )
        )}
      </div>
    </div>
  );
};
