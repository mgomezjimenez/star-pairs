import moment from 'moment';
import sexagesimal from './sexagesimal.js';
import horizontal, { lst } from './horizontal.js';

it('calculates the LST', () => {
  expect(
    lst(-70.73659, moment.utc('2018-03-28 19:01:57')) // 19:00:43 matches
  ).toEqual(40.58333333); // 02:42:20
});

it('calculates the horizontal coordinates', () => {
  expect(
    horizontal(0.1165, -40.414, -30.24073, -70.73659, moment.utc('2018-03-27'))
  ).toEqual({ alt: -14.11, az: 203.02 });
});
