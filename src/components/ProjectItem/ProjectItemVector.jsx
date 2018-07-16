/* eslint-disable */
import React from 'react';

const ProjectItemVector = ({ image, id, active }) => (
  <div className="project-item-vector">
    <svg width={62} height={62} viewBox="0 0 62 62" fill="none">
      <g filter={`url(#${id}filter0_d)`}>
        <ellipse cx="22.0896" cy="22.0558" rx="22.0896" ry="22.0558" transform="translate(9 8.9906)" fill={`url(#${id}paint0_linear)`} />
        <ellipse className="border-ring" cx="22.0896" cy="22.0558" rx="22.0896" ry="22.0558" transform="translate(9 8.9906)" stroke={`url(#${id}paint1_linear)`} strokeOpacity="0.4" />
      </g>
      <g opacity="0.4">
        <mask id={`${id}mask0`} maskUnits="userSpaceOnUse" x={11} y={11} width={40} height={40}>
          <ellipse cx="19.8432" cy="19.8128" rx="19.8432" ry="19.8128" transform="translate(11.2466 11.2335)" fill="#C4C4C4" />
        </mask>
        <g mask={`url(#${id}mask0)`}>
          <rect width="55.0412" height="42.6919" transform="translate(3.6875 9.81848)" fill={`url(#${id}pattern0)`} />
        </g>
      </g>
      {
        active &&
        <circle className="timer-ring" cx={17} cy={17} r={17} transform="translate(14 14)" stroke="#FF9D14" strokeOpacity="0.3" strokeWidth={2} />
      }
      <g filter={`url(#${id}filter2_d)`}>
        <circle className="rarity-ring" cx={25} cy={25} r="24.5" transform="translate(6 6)" stroke={`url(#${id}paint2_linear)`} />
      </g>
      <defs>
        <filter id={`${id}filter0_d`} x="1.41766" y="1.40826" width="59.3438" height="59.2763" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="3.54117" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.132786 0 0 0 0 0 0 0 0 0 0.473049 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <pattern id={`${id}pattern0`} patternContentUnits="objectBoundingBox" width={1} height={1}>
          <use xlinkHref={`#${id}image0`} transform="translate(0 -0.00138081) scale(0.00148148 0.00191002)" />
        </pattern>
        <filter className="rarity-glow" id={`${id}filter2_d`} x={0} y={0} width={62} height={62} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0" />
          <feOffset />
          <feGaussianBlur stdDeviation={3} />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.52549 0 0 0 0 0.819608 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient id={`${id}paint0_linear`} x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(44.1792) scale(44.1792 44.1116) rotate(90)">
          <stop stopColor="#190B3B" stopOpacity="0.93" />
          <stop offset="0.441989" stopColor="#2F1968" />
          <stop offset={1} stopColor="#080314" />
        </linearGradient>
        <linearGradient id={`${id}paint1_linear`} x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(44.1792) scale(44.1792 44.1116) rotate(90)">
          <stop stopColor="#9797FB" />
          <stop offset={1} stopColor="#9797FB" stopOpacity={0} />
        </linearGradient>
        <linearGradient id={`${id}paint2_linear`} x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(50) scale(50) rotate(90)">
          <stop stopColor="#0086D1" />
          <stop offset={1} stopColor="#0086D1" stopOpacity={0} />
        </linearGradient>
        <image id={`${id}image0`} width={675} height={525} xlinkHref={image} />
      </defs>
    </svg>
  </div>
);

export default ProjectItemVector;
