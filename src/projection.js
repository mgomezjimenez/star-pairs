import { geoProjection } from 'd3-geo';

export const project = geoProjection((λ, φ) => {
  let cosλ = Math.cos(λ),
    cosφ = Math.cos(φ),
    k = 1 / (1 + cosλ * cosφ);
  return [k * cosφ * Math.sin(λ), -k * Math.sin(φ)];
})
  .scale(432)
  .clipAngle(130)
  .rotate([0, -90])
  .translate([960 / 2, 960 / 2])
  .precision(0.1);
