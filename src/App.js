import React from 'react';
import { range } from 'd3-array';
import { geoCircle, geoGraticule10, geoPath } from 'd3-geo';
import moment from 'moment';

import './App.css';
import horizontal from './horizontal.js';
import pairs from './pairs.json';
import { project } from './projection.js';
import sexagesimal from './sexagesimal.js';

const lat = -30.24073,
  long = -70.73659,
  horizon_limit = 20;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mom: moment().utc() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      mom: moment().utc()
    });
  }

  render() {
    return (
      <div className="App">
        <svg width={960} height={960}>
          <path
            className="horizon"
            d={geoPath().projection(project)(geoCircle()([0, 90]), 90)}
          />
          <path
            className="graticule"
            d={geoPath().projection(project)(geoGraticule10())}
          />
          <g className="ticks ticks-azimuth">
            {range(360).map(d => {
              let p0 = project([d, 0]),
                p1 = project([d, d % 10 ? -1 : -2]);
              return <line x1={p0[0]} y1={p0[1]} x2={p1[0]} y2={p1[1]} />;
            })}
            {range(0, 360, 10).map(d => {
              let p = project([d, -4]);

              switch (d) {
                case 0:
                  return (
                    <text dy=".35em" x={p[0]} y={p[1]}>
                      N
                    </text>
                  );

                case 90:
                  return (
                    <text dy=".35em" x={p[0]} y={p[1]}>
                      E
                    </text>
                  );

                case 180:
                  return (
                    <text dy=".35em" x={p[0]} y={p[1]}>
                      S
                    </text>
                  );

                case 270:
                  return (
                    <text dy=".35em" x={p[0]} y={p[1]}>
                      W
                    </text>
                  );

                default:
                  return (
                    <text dy=".35em" x={p[0]} y={p[1]}>
                      {d}°
                    </text>
                  );
              }
            })}
          </g>
          <g className="ticks ticks-elevation">
            {range(10, 91, 10).map(d => {
              let p = project([0, d]);
              return (
                <text dy=".35em" x={p[0]} y={p[1]}>
                  {d}°
                </text>
              );
            })}
          </g>
          {pairs
            .map(p => ({
              stars: p,
              coords: p.map(s =>
                horizontal(
                  sexagesimal(s.ra),
                  sexagesimal(s.dec),
                  lat,
                  long,
                  this.state.mom
                )
              )
            }))
            .filter(p => p.coords[0].alt >= horizon_limit)
            .map(p => {
              let p1 = project([p.coords[0].az, p.coords[0].alt]),
                p2 = project([p.coords[1].az, p.coords[1].alt]);
              return (
                <g>
                  <title>{p.stars[0].name}</title>
                  <circle
                    r={Math.pow(p.stars[0].mag, 2) / 20}
                    transform={'translate(' + p1[0] + ',' + p1[1] + ')'}
                  />
                  <circle
                    r={Math.pow(p.stars[1].mag, 2) / 20}
                    transform={'translate(' + p2[0] + ',' + p2[1] + ')'}
                  />
                </g>
              );
            })}
        </svg>
      </div>
    );
  }
}

export default App;
