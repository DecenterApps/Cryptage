/* eslint-disable */
import React from 'react';

import './SmallButton.scss'

export default function SmallButton({ text }) {
  return (
    <div className="small-button">
      <div className="small-button-text">{ text }</div>

      <svg width={82} height={38} viewBox="0 0 82 38" fill="none">
        <g filter="url(#filter0_dSFB)">
          <path d="M0 4.4898V17.5102L4.4898 22H61.5102L66 17.5102V4.4898L61.5102 0H4.4898L0 4.4898Z" transform="translate(8 8)" fill="url(#paint0_linearSFB)" />
          <path d="M0 4.4898V17.5102L4.4898 22H61.5102L66 17.5102V4.4898L61.5102 0H4.4898L0 4.4898Z" transform="translate(8 8)" stroke="url(#paint1_linearSFB)" strokeWidth="1.43487" />
        </g>
        <g filter="url(#filter1_dSFB)">
          <path d="M0 4.04082V16.6122L4.26531 20.6531L60.6122 20.4286L64.6531 16.3878V4.04082L60.6122 0H4.04082L0 4.04082Z" transform="translate(8.67383 8.67365)" stroke="url(#paint2_linear)" strokeOpacity="0.93" strokeWidth="0.717434" />
        </g>
        <path d="M0 3.42591V14.0843L3.60899 17.5102L58.1148 17.3199L61.5102 13.894V3.42591L58.1148 0H3.39541L0 3.42591Z" transform="translate(10.2451 10.2448)" stroke="url(#paint3_linear)" strokeOpacity="0.22" strokeWidth="0.717434" />
        <defs>
          <filter id="filter0_dSFB" x="0.825812" y="0.82569" width="80.3487" height="36.3487" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0" />
            <feOffset />
            <feGaussianBlur stdDeviation="3.22845" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.132786 0 0 0 0 0 0 0 0 0 0.473049 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <filter id="filter1_dSFB" x="6.88007" y="6.88007" width="68.2402" height="24.2408" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0" />
            <feOffset />
            <feGaussianBlur stdDeviation="0.717434" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <linearGradient id="paint0_linearSFB" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(66) scale(61.92 22) rotate(90)">
            <stop stopColor="#452499" />
            <stop offset={1} stopColor="#080314" />
          </linearGradient>
          <linearGradient id="paint1_linearSFB" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(66 306.34) scale(63.36 590.681) rotate(180)">
            <stop offset="0.790055" stopColor="#9797FB" />
            <stop offset={1} stopColor="#9797FB" />
          </linearGradient>
          <linearGradient id="paint2_linearSFB" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(64.189 0.663709) scale(60.8501 21.0825) rotate(90)">
            <stop />
            <stop offset={1} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="paint3_linearSFB" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="matrix(-4.41136 37.2653 -129.329 -15.3096 95.7902 7.65481)">
            <stop stopColor="#C8C8FC" />
            <stop offset="0.18232" stopColor="#C8C8FC" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
