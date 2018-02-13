import columnSplitter from './columnSplitter';

test('should convert values [20] with unit 10 and unit height 30', () => {
  expect(columnSplitter([20], 10, 30)).toEqual([[30, 30]]);
});

test('should convert values [30] with unit 10 and unit height 30', () => {
  expect(columnSplitter([30], 10, 30)).toEqual([[30, 30, 30]]);
});

test('should convert values [15] with unit 10 and unit height 30', () => {
  expect(columnSplitter([15], 10, 30)).toEqual([[30, 15]]);
});

test('should convert values [20,20] with unit 10 and unit height 30', () => {
  expect(columnSplitter([20, 20], 10, 30)).toEqual([[30, 30], [30, 30]]);
});

test('should convert values [20,15] with unit 10 and unit height 30', () => {
  expect(columnSplitter([20, 15], 10, 30)).toEqual([[30, 30], [30, 15]]);
});

test('should convert values [20,15] with unit 10 and unit height 30', () => {
  expect(columnSplitter([20, 15], 10, 30)).toEqual([[30, 30], [30, 15]]);
});

test('should convert values [10,15,10] with unit 10 and unit height 30', () => {
  expect(columnSplitter([10, 15, 10], 10, 30)).toEqual([
    [30],
    [30, 15],
    [15, 15],
  ]);
});

test('should convert values [15,12] with unit 10 and unit height 30', () => {
  expect(columnSplitter([15, 12], 10, 30)).toEqual([[30, 15], [15, 21]]);
});

test('should convert values [15,12,17] with unit 10 and unit height 30', () => {
  expect(columnSplitter([15, 12, 17], 10, 30)).toEqual([
    [30, 15],
    [15, 21],
    [9, 30, 12],
  ]);
});

test('should convert values [15,12,17,28] with unit 10 and unit height 30', () => {
  expect(columnSplitter([15, 12, 17, 28], 10, 30)).toEqual([
    [30, 15],
    [15, 21],
    [9, 30, 12],
    [18, 30, 30, 6],
  ]);
});
