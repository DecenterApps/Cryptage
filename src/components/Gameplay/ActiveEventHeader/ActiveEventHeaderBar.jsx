import React from 'react';

export default function ActiveEventHeaderBar(props) {
  return (
    <svg width={501} height={40} viewBox="0 0 501 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M483 13L469 27L31.5 27L17.5 13L483 13Z" fill="#36265F" fillOpacity="0.4" />
      <g filter="url(#active-event-filter0_d)">
        <path d="M470 30L490 10H11L31 30H470Z" stroke="url(#active-event-paint-linear)" strokeWidth="1.5" />
      </g>
      <defs>
        <filter
          id="active-event-filter0_d"
          x="0.189453"
          y="0.25"
          width="500.621"
          height="39.5"
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
        <linearGradient id="active-event-paint-linear" x1={230} y1={30} x2={230} y2={10} gradientUnits="userSpaceOnUse">
          <stop stopColor="#9797FB" />
          <stop offset={1} stopColor="#9797FB" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}
