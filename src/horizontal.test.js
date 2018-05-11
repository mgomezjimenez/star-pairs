import moment from 'moment';
import sexagesimal from './sexagesimal.js';
import horizontal, { lst } from './horizontal.js';

expect.extend({
  toBeInRange(received, delta, expected) {
    const maximum = expected + delta,
      minimum = expected - delta,
      pass = minimum < received && received < maximum;

    if (pass) {
      return {
        message: () =>
          `expected ${received} to not be between ${minimum}-${maximum}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be between ${minimum}-${maximum}`,
        pass: false
      };
    }
  }
});

expect.extend({
  toBeInCoordinatesRange(received, delta, expected) {
    const maxAz = expected.az + delta,
      maxAlt = expected.alt + delta,
      minAz = expected.az - delta,
      minAlt = expected.alt - delta,
      pass =
        maxAz > received.az &&
        maxAlt > received.alt &&
        minAz < received.az &&
        minAlt < received.alt;

    if (pass) {
      return {
        message: () =>
          `expected coordinates ${received.az} - ${received.alt} to not be
          between azimuth: ${minAz}-${maxAz} and altitude: ${minAlt}-${maxAlt}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected coordinates ${received.az} - ${received.alt} to be between
          azimuth: ${minAz}-${maxAz} and altitude: ${minAlt}-${maxAlt}`,
        pass: false
      };
    }
  }
});

it('calculates the LST', () => {
  expect(lst(-70.73659, moment.utc('2018-03-28 19:01:57'))).toBeInRange(
    0.5,
    40.5834
  );
  expect(lst(-70.73659, moment.utc('2018-04-06 09:56:53'))).toBeInRange(
    0.01,
    273.125
  );
  expect(lst(-70.73659, moment.utc('2018-04-07 01:43:30'))).toBeInRange(
    0.01,
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
  ).toBeInCoordinatesRange(0.5, { alt: 71.7045305556, az: 73.1011138889 });
  expect(
    horizontal(
      12.296463,
      -36.09398,
      -30.24073,
      -70.73659,
      moment.utc('2018-04-07 01:43:30')
    )
  ).toBeInCoordinatesRange(0.5, { alt: 60.952761, az: 110.949025 });
});
