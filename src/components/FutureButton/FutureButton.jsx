/* eslint-disable */
import React from 'react';
import CircleSpinner from '../Decorative/CircleSpinner/CircleSpinner';

import './FutureButton.scss';

export default function FutureButton({ text, hoverText, loading, disabled, reverse, handleClick }) {
  return (
    <div
      className={`future-button ${reverse ? 'reverse' : 'not-reversed'} ${disabled ? 'disabled' : 'not-disabled'}`}
      onClick={disabled ? () => {} : handleClick}
    >
      <div className={`button-text-wrapper ${ loading ? 'loading' : 'not-loading' }`}>
        <div className="text">
          <span className={` ${ hoverText === undefined ? '' : 'text-main' } `}>{ text }</span>
          { hoverText === undefined ? '' : <span className="text-hover">{ hoverText }</span>} 
        </div>

        <CircleSpinner />
      </div>

      <svg className="button-center" width={133} height={58} viewBox="0 0 133 58" fill="none" preserveAspectRatio="none">
        <g filter="url(#filter0_dFB)">
          <rect width={98} height={26} transform="translate(16 16)" fill="url(#paint0_linearFB)" />
        </g>
        <rect width={101} height={26} transform="translate(13 16)" fill="url(#paint1_linearFB)" />
        <path d="M101 0H0M101 26H0" transform="translate(114 16) scale(-1 1)" stroke="url(#paint2_linearFB)" strokeWidth={2} />
        <path d="M101 0H0M101 20H0" transform="translate(114 20) scale(-1 1)" stroke="url(#paint3_linearFB)" strokeOpacity="0.22" />
        <path d="M101 0H0M101 23H0" transform="translate(114 17.5) scale(-1 1)" stroke="url(#paint4_linearFB)" strokeOpacity="0.93" />
        <g filter="url(#filter1_dFB)">
          <line y1={-1} x2={78} y2={-1} transform="translate(104 17) scale(-1 1)" stroke="url(#paint5_linearFB)" strokeWidth={2} />
        </g>
        <g filter="url(#filter2_dFB)">
          <line y1={-1} x2={48} y2={-1} transform="translate(87 43) scale(-1 1)" stroke="url(#paint6_linearFB)" strokeWidth={2} />
        </g>
        <defs>
          {/*<filter id="filter0_dFB" x={0} y={0} width={133} height={58} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">*/}
            {/*<feFlood floodOpacity={0} result="BackgroundImageFix" />*/}
            {/*<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0" />*/}
            {/*<feOffset />*/}
            {/*<feGaussianBlur stdDeviation="7.5" />*/}
            {/*<feColorMatrix type="matrix" values="0 0 0 0 0.132786 0 0 0 0 0 0 0 0 0 0.473049 0 0 0 1 0" />*/}
            {/*<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />*/}
            {/*<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />*/}
          {/*</filter>*/}
          <filter id="filter1_dFB" x={22} y={11} width={86} height={10} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0" />
            <feOffset />
            <feGaussianBlur stdDeviation={2} />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <filter id="filter2_dFB" x={35} y={37} width={56} height={10} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0" />
            <feOffset />
            <feGaussianBlur stdDeviation={2} />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
          <linearGradient id="paint0_linearFB" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(101) scale(868.598 26) rotate(90)">
            <stop stopColor="#452499" />
            <stop offset={1} stopColor="#080314" />
          </linearGradient>
          <linearGradient id="paint1_linearFB" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(101) scale(868.598 26) rotate(90)">
            <stop stopColor="#452499" />
            <stop offset={1} stopColor="#080314" />
          </linearGradient>
          <linearGradient id="paint2_linearFB" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(116 362.039) scale(132 698.077) rotate(180)">
            <stop offset="0.790055" stopColor="#9797FB" />
            <stop offset={1} stopColor="#9797FB" />
          </linearGradient>
          <linearGradient id="paint3_linearFB" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(112) scale(123 20) rotate(90)">
            <stop stopColor="#C8C8FC" />
            <stop offset="0.18232" stopColor="#C8C8FC" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="paint4_linearFB" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(114 0.5) scale(127 24) rotate(90)">
            <stop />
            <stop offset={1} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="paint5_linearFB" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(-5.35743e-07 -1150.5) scale(78 2304)">
            <stop stopColor="white" stopOpacity={0} />
            <stop offset="0.475138" stopColor="white" />
            <stop offset={1} stopColor="white" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="paint6_linearFB" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(-3.29688e-07 -1150.5) scale(48 2304)">
            <stop stopColor="white" stopOpacity={0} />
            <stop offset="0.475138" stopColor="white" />
            <stop offset={1} stopColor="white" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>

      {/*<svg className="button-right" width={42} height={46} viewBox="0 0 42 46" fill="none">*/}
        {/*<g filter="url(#filter0_d)">*/}
          {/*<path d="M0 21L5.95967 26H21.5V0H11.5L0 21Z" transform="translate(31.5 10) scale(-1 1)" fill="url(#paint0_linear)" />*/}
          {/*<path d="M0 21L5.95967 26H21.5V0H11.5L0 21Z" transform="translate(31.5 10) scale(-1 1)" stroke="url(#paint1_linear)" strokeWidth={2} />*/}
        {/*</g>*/}
        {/*<path d="M12.5 0H5.12723L0 9L3.47181 16.1538L8.5337 20H12.5" transform="translate(22.5 14) scale(-1 1)" stroke="url(#paint2_linear)" strokeOpacity="0.22" />*/}
        {/*<path d="M19.5 0H10.5L8.5 3.5L0 19L5 23H19.5" transform="translate(29.5 11.5) scale(-1 1)" stroke="url(#paint3_linear)" strokeOpacity="0.93" />*/}
        {/*<defs>*/}
          {/*<filter id="filter0_d" x={0} y={0} width="41.771" height={46} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">*/}
            {/*<feFlood floodOpacity={0} result="BackgroundImageFix" />*/}
            {/*<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0" />*/}
            {/*<feOffset />*/}
            {/*<feGaussianBlur stdDeviation="4.5" />*/}
            {/*<feColorMatrix type="matrix" values="0 0 0 0 0.132786 0 0 0 0 0 0 0 0 0 0.473049 0 0 0 1 0" />*/}
            {/*<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />*/}
            {/*<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />*/}
          {/*</filter>*/}
          {/*<linearGradient id="paint0_linear" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(21.5) scale(184.9 26) rotate(90)">*/}
            {/*<stop stopColor="#452499" />*/}
            {/*<stop offset={1} stopColor="#080314" />*/}
          {/*</linearGradient>*/}
          {/*<linearGradient id="paint1_linear" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(21.5 362.039) scale(189.2 698.077) rotate(180)">*/}
            {/*<stop offset="0.790055" stopColor="#9797FB" />*/}
            {/*<stop offset={1} stopColor="#9797FB" />*/}
          {/*</linearGradient>*/}
          {/*<linearGradient id="paint2_linear" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(124.5) scale(123 20) rotate(90)">*/}
            {/*<stop stopColor="#C8C8FC" />*/}
            {/*<stop offset="0.18232" stopColor="#C8C8FC" stopOpacity={0} />*/}
          {/*</linearGradient>*/}
          {/*<linearGradient id="paint3_linear" x2={1} gradientUnits="userSpaceOnUse" gradientTransform="translate(133.5 0.5) scale(127 24) rotate(90)">*/}
            {/*<stop />*/}
            {/*<stop offset={1} stopOpacity={0} />*/}
          {/*</linearGradient>*/}
        {/*</defs>*/}
      {/*</svg>*/}
    </div>
  );
}
