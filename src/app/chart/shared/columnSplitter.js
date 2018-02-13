export default (list, unit, unitHeight) => {
  let i,
    rest = 0;
  return list.map(_ => {
    let res = [];

    if (_ - rest < 0) {
      res.push(unitHeight * (_ / unit));
      rest = rest - _;
    } else {
      if (rest) {
        res.push(unitHeight * (rest / unit));
      }

      for (i = 0; i < Math.floor((_ - rest) / unit); i++) {
        res.push(unitHeight);
      }

      rest = (_ - rest) % unit;
      if (rest !== 0) {
        res.push(unitHeight * (rest / unit));
        rest = unit - rest;
      }
    }

    return res;
  });
};
