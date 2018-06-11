import React from 'react';

const EmptyHexagon = (props) => {
  return (
    <svg width={44} height={44} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.35292 0L0 8.50243V33.64L10.141 42.1425H33.1465L42.0199 33.2704V8.31759L34.502 0H8.35292Z"
        transform="translate(1.24512 0.846436)"
        stroke="url(#paint0_linear)"
        strokeOpacity="0.34"
        strokeWidth="1.2226"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x2={1}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(215.088) scale(300.05 39.4236) rotate(90)"
        >
          <stop stopColor="#9797FB" />
          <stop offset={1} stopColor="#9797FB" stopOpacity="0.38" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default EmptyHexagon;
