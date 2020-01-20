import React from 'react';
import PropTypes from 'prop-types';

const AlfaLogo = ({ width, height, style }) => (
  <svg
    style={style}
    width={width}
    height={height}
    id='Layer_1'
    data-name='Layer 1'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 150 150'
  >
    <path
      id='path50'
      transform='translate(-491.43,-140.53)'
      fill='#baa524'
      d='m 624.35,197.33 h -57 a 5.49,5.49 0 0 1 -4.19,-1.63 c -3.2,-3.06 -6.58,-5.93 -10.42,-9.36 h 41.63 l 0.22,-0.68 c -3.05,-2.81 -6.1,-5.64 -9.17,-8.44 -6.85,-6.26 -13.74,-12.46 -20.53,-18.78 -1.31,-1.22 -2,-1.44 -3.45,-0.05 -5.93,5.86 -12,11.61 -18,17.35 -11,10.45 -22,21 -33.2,31.24 -4.49,4.1 -2.65,4.36 -7.47,-0.19 a 18.82,18.82 0 0 0 -2.64,-2.33 c -2.27,-1.44 -1.71,-2.59 0,-4.14 6,-5.51 12,-11.12 18,-16.71 3.63,-3.4 7.19,-6.86 10.84,-10.23 3.82,-3.53 7.75,-6.95 11.55,-10.49 q 9.29,-8.66 18.46,-17.45 c 0.46,-0.44 1,-0.79 1.44,-1.19 1.24,-1.06 2.15,-3.19 3.72,-3 1.3,0.16 2.42,1.9 3.58,3 q 27.74,25.9 55.58,51.75 a 15.68,15.68 0 0 1 1.05,1.33 z m 5.26,4.25 c -2.47,3.2 -5.19,5.27 -7.62,7.59 -8,7.66 -16.13,15.15 -24.22,22.7 Q 581,247.49 564.31,263.13 c -1,1 -1.52,0.8 -2.47,-0.09 q -24.39,-23 -48.88,-45.82 c -1.18,-1.1 -1.08,-1.69 0,-2.72 q 12.51,-11.59 24.94,-23.26 l 1.92,-1.77 c 3.39,-3.16 3.27,-3 6.77,0 6.6,5.74 13.36,11.31 20,17 2.71,2.29 5.38,4.63 8.09,6.93 0.75,0.64 0.88,1.16 0.09,1.92 q -8.45,8.14 -16.84,16.36 c -1,1 -1.65,0.54 -2.42,-0.14 -1.72,-1.52 -3.38,-3.12 -5.19,-4.53 -1.43,-1.12 -1.12,-1.9 0.06,-2.95 2.84,-2.52 5.56,-5.18 8.42,-7.68 1.39,-1.2 1.29,-2 -0.06,-3.16 -4.45,-3.76 -8.85,-7.59 -13.24,-11.41 a 2.05,2.05 0 0 0 -3.14,0 c -4.33,4 -8.65,8.1 -13,12.1 -1.27,1.16 -1.1,1.89 0.15,3 q 16.18,14.34 32.23,28.83 c 1.63,1.47 2.49,0.31 3.37,-0.51 3.64,-3.41 7.15,-6.94 10.75,-10.39 10,-9.64 20.28,-19.1 30.07,-29 3.33,-3.36 6.67,-4.78 11.31,-4.35 3.92,0.37 7.85,0.09 12.37,0.09 z'
    />
  </svg>
);

AlfaLogo.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired
};

export default AlfaLogo;
