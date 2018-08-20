/* eslint-disable */
import React from 'react';

const LargeCardMain = ({ id, image, typeColor, borderColor }) => (
  <svg width={226} height={313} viewBox="0 0 226 313" fill="none" className="large-card-main">
    <g filter={`url(#${id}lcfilter0_d)`}>
      <path d="M172.642 0H19.5779L0 19.5478V259.452V279H19.5779H172.642L192.22 259.452V19.5478V0H172.642Z" transform="translate(16.7803 17)" fill={`url(#${id}lcpattern0)`} />
    </g>
    <path d="M172.642 0H19.5779L0 19.5478V259.452V279H19.5779H172.642L192.22 259.452V19.5478V0H172.642Z" transform="translate(16.7803 17)" fill={`url(#${id}lcpaint0_linear)`} fillOpacity="0.3" stroke={`url(#${id}lcpaint1_linear)`} strokeWidth="1.77844" />
    <path d="M172.642 0H19.5779L0 19.5478V259.452V279H19.5779H172.642L192.22 259.452V19.5478V0H172.642Z" transform="translate(16.7803 17)" fill={`url(#${id}lcpaint2_linear)`} />
    <g filter={`url(#${id}lcfilter1_d)`}>
      <path d="M169.445 0H18.5134L0 18.6592V256.147V275.446H19.2154H169.445L188.66 256.147V19.2988V0H169.445Z" transform="translate(18.5601 18.7771)" stroke="" strokeOpacity="0.53" strokeWidth="1.77844" />
    </g>
    <path d="M0 0H186.975" transform="matrix(1 0.000829758 0.00110024 0.999999 19.396 260.809)" stroke={`url(#${id}lcpaint4_linear)`} strokeWidth="1.77844" />
    <path className="glow-line-sm" d="M3.86835 2.66561L0 0H48.3544L45.1308 2.66561H3.86835Z" transform="translate(89.0303 261.439) rotate(-0.21315)" fill={typeColor} />
    <defs>
      <filter id={`${id}lcfilter0_d`} x="0.774305" y="0.994032" width="224.232" height="311.012" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0" />
        <feOffset />
        <feGaussianBlur stdDeviation="8.00298" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.132786 0 0 0 0 0 0 0 0 0 0.473049 0 0 0 1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <pattern id={`${id}lcpattern0`} patternContentUnits="objectBoundingBox" width={1} height={1}>
        <use xlinkHref={`#${id}lcimage0`} transform="translate(-0.225732) scale(0.00145146 0.001)" />
      </pattern>
      <filter id={`${id}lcfilter1_d`} x="14.114" y="14.331" width="197.552" height="284.338" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0" />
        <feOffset />
        <feGaussianBlur stdDeviation="1.77844" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <linearGradient id={`${id}lcpaint0_linear`} x2={1} gradientUnits="userSpaceOnUse" gradientTransform="matrix(160.748 -130.889 93.3572 5802.49 -33.6057 -2704.91)">
        <stop stopColor="#2F1968" stopOpacity="0.93" />
        <stop offset="0.452436" stopColor="#2F1968" />
        <stop offset={1} stopColor="#150836" />
      </linearGradient>
      <linearGradient id={`${id}lcpaint1_linear`} x2={1} gradientUnits="userSpaceOnUse" gradientTransform="matrix(205.532 -128.892 4666.97 7419.06 -2283.62 -3571.75)">
        <stop stopColor={borderColor} />
        <stop offset={1} stopColor={borderColor} stopOpacity={0} />
      </linearGradient>
      <linearGradient className="bottom-glow" id={`${id}lcpaint2_linear`} x2={1} gradientUnits="userSpaceOnUse" gradientTransform="matrix(1.77981 -95.9618 107.338 1.98469 49.5599 278.008)">
        <stop stopColor={typeColor} />
        <stop offset={1} stopColor={typeColor} stopOpacity={0} />
      </linearGradient>
      <linearGradient id={`${id}lcpaint3_linear`} x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(195.219 -13.0969) scale(194.905 298.015) rotate(90)">
        <stop />
        <stop offset={1} stopOpacity={0} />
      </linearGradient>
      <linearGradient className="glow-line-lg" id={`${id}lcpaint4_linear`} x2={1} gradientUnits="userSpaceOnUse" gradientTransform="matrix(-188.66 0.0881314 60.0076 -11135.6 156.93 5567.53)">
        <stop stopColor={typeColor} stopOpacity={0} />
        <stop offset="0.221092" stopColor={typeColor} />
        <stop offset="0.768229" stopColor={typeColor} />
        <stop offset={1} stopColor={typeColor} stopOpacity={0} />
      </linearGradient>
      <image id={`${id}lcimage0`} width={1000} height={1000} xlinkHref={image} />
    </defs>
  </svg>
);

export default LargeCardMain;
