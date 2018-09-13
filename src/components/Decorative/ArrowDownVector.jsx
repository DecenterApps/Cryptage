import React from 'react';

export default function ArrowDownVector(props) {
  return (
    <svg width={31} height={26} viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g filter="url(#adw-filter0_d)">
        <path d="M10 10L15.5 15.5L21 10" stroke="url(#adw-paint0_linear)" strokeWidth="1.5" />
      </g>
      <defs>
        <filter
          id="adw-filter0_d"
          x="0.469727"
          y="0.469727"
          width="30.0607"
          height="25.091"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="4.5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.132786 0 0 0 0 0 0 0 0 0 0.473049 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient
          id="adw-paint0_linear"
          x1="15.0292"
          y1="15.5"
          x2="15.0292"
          y2={10}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9797FB" />
          <stop offset={1} stopColor="#9797FB" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}
