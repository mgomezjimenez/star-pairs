import moment from 'moment';
import sexagesimal from './sexagesimal.js';
import horizontal, { lst } from './horizontal.js';

it('calculates the LST', () => {
  expect(lst(-70.73659, moment.utc('2018-03-28 19:01:57'))).toEqual(
    40.58333333
  );
});

it('calculates the LST', () => {
  expect(lst(-70.73659, moment.utc('2018-04-06 09:56:53'))).toEqual(
    273.1250000000016
  );
});

it('calculates the LST', () => {
  expect(lst(-70.73659, moment.utc('2018-04-07 01:43:30'))).toEqual(
    150.429166666668
  );
});

it('calculates the horizontal coordinates', () => {
  expect(
    horizontal(
      8.334675,
      -23.4618888889,
      -30.24073,
      -70.73659,
      moment.utc('2018-03-31 23:10:00')
    )
  ).toEqual({ alt: 71.7045305556, az: 73.1011138889 });
});

it('calculates the horizontal coordinates', () => {
  expect(
    horizontal(
      12.296463,
      -36.09398,
      -30.24073,
      -70.73659,
      moment.utc('2018-04-07 01:43:30')
    )
  ).toEqual({ alt: 60.952761, az: 110.949025 });
});
