import moment from 'moment';

const π = Math.PI,
  radians = π / 180,
  degrees = 180 / π;

export function lst(long, mom) {
  let J2000 = moment.utc('2000-01-01 12:00'),
    offset = (mom.valueOf() - J2000.valueOf()) / 864e5;
  return (
    (100.46 +
      0.985647 * offset +
      long +
      15 * (mom.hours() + mom.minutes() / 60 + mom.seconds() / 3600) +
      360) %
    360
  );
}

export default function(ra, dec, lat, long, mom) {
  let ha = (lst(long, mom) - ra * 360 / 24 + 360) % 360,
    sinDec = Math.sin(dec * radians),
    sinLat = Math.sin(lat * radians),
    cosDec = Math.cos(dec * radians),
    cosLat = Math.cos(lat * radians),
    cosHa = Math.cos(ha * radians),
    sinAlt = sinDec * sinLat + cosDec * cosLat * cosHa,
    alt = Math.asin(sinAlt),
    cosAlt = Math.cos(alt),
    a = Math.acos((sinDec - sinAlt * sinLat) / (cosAlt * cosLat)),
    az = Math.sin(ha * radians) * degrees < 0 ? a * degrees : 360 - a * degrees;

  return { alt: alt * degrees, az: az };
}
