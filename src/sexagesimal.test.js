import sexagesimal from './sexagesimal.js';

it('converts from sexagesimal to decimal', () => {
  expect(sexagesimal('00:06:59.52')).toEqual(0.11653333333333334);
  expect(sexagesimal('-40:24:50.4')).toEqual(-40.414);
  expect(sexagesimal('11:15:46.22')).toEqual(11.2628388888888888);
  expect(sexagesimal('-29:33:26.0')).toEqual(-29.557222222222222);
  expect(sexagesimal('23:58:31.08')).toEqual(23.975299999999997);
  expect(sexagesimal('-57:16:51.0')).toEqual(-57.280833333333334);
});
