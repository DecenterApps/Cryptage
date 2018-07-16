/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

const SidebarItemNotActive = ({ image, id }) => (
  <div className="sidebar-item-not-active">
    <svg width={71} height={71} viewBox="0 0 71 71" fill="none">
      <g filter={`url(#${id}filter0_d`} className="outer-ring">
        <path d="M9.76706 0L0 9.38645V37.1377L9.76706 46.5241H37.8474L46.3935 36.7296V9.1824L37.8474 0H9.76706Z" transform="translate(12.2363 12.0754)" fill={`url(#${id}pattern0)`} />
      </g>
      <path d="M9.76706 0L0 9.38645V37.1377L9.76706 46.5241H37.8474L46.3935 36.7296V9.1824L37.8474 0H9.76706Z" transform="translate(12.2363 12.0754)" fill={`url(#${id}paint0_radial)`} />
      <path d="M8.35292 0L0 8.50243V33.64L10.141 42.1425H33.1465L42.0199 33.2704V8.31759L34.502 0H8.35292Z" transform="translate(14.2451 14.7654)" stroke={`url(#${id}paint1_linear)`} strokeOpacity="0.59" strokeWidth="1.2226" />
      <defs>
        <filter id={`${id}filter0_d`} x="0.621601" y="0.460712" width="69.6229" height="69.7535" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="5.5017" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.132786 0 0 0 0 0 0 0 0 0 0.473049 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <pattern id={`${id}pattern0`} patternContentUnits="objectBoundingBox" width={1} height={1}>
          <use xlinkHref={`#${id}image`} transform="translate(-0.00140765) scale(0.00100282)" />
        </pattern>
        <radialGradient id={`${id}paint0_radial`} cx="0.5" cy="0.5" r="0.5" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.68015e-07 -0.101561) scale(46.711 46.7273)">
          <stop stopColor="#2F1968" stopOpacity={0} />
          <stop offset="0.734619" stopColor="#2F1968" stopOpacity="0.83" />
          <stop offset={1} stopColor="#150836" />
        </radialGradient>
        <linearGradient id={`${id}paint1_linear`} x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(215.088) scale(300.05 39.4236) rotate(90)">
          <stop stopColor="#9797FB" />
          <stop offset={1} stopColor="#9797FB" stopOpacity={0} />
        </linearGradient>
        <image id={`${id}image`} width={1000} height={1000} xlinkHref={image} />
      </defs>
    </svg>
  </div>
);

SidebarItemNotActive.propTypes = {
  image: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default SidebarItemNotActive;
