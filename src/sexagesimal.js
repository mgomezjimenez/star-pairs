export default function(coor) {
  let [h, m, s] = coor.split(':').map(x => parseFloat(x));
  if (h >= 0) {
    return h + m / 60 + s / 3600;
  } else {
    return h - m / 60 - s / 3600;
  }
}
