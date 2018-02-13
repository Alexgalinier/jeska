function split(list, unit, unitHeight) {
  let i,
    rest = 0;
  const splittedList = list.map(_ => {
    res = [];

    if (_ - rest < 0) {
      res.push(unitHeight * (_ / unit));
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
      }
    }

    return res;
  });

  return splittedList;
}

console.log('Should have [[30,30]] :', split([20], 10, 30));
console.log('Should have [[30,30,15]] :', split([25], 10, 30));
console.log('Should have [[30,30],[30,30,30]] :', split([20, 30], 10, 30));
console.log('Should have [[30,30],[30,30,30,15]] :', split([20, 35], 10, 30));
console.log('Should have [[30,15],[15,30,15]] :', split([15, 20], 10, 30));
