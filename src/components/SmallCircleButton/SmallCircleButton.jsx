/* eslint-disable */
import React from 'react';

import './SmallCircleButton.scss';

export default function SmallCircleButton(props) {
  return (
    <svg className="small-circle-button" width={31} height={30} viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g filter="url(#smc-filter0_d)">
        <rect x={6} y={6} width="18.5567" height={18} rx={9} fill="url(#smc-paint0_linear)" />
        <rect x={6} y={6} width="18.5567" height={18} rx={9} stroke="url(#smc-paint1_linear)" strokeWidth="1.09267" />
      </g>
      <g filter="url(#smc-filter1_d)">
        <rect x="7.54639" y="7.5" width="15.4639" height={15} rx="7.5" stroke="url(#smc-paint2_linear)" strokeOpacity="0.93" strokeWidth="0.546333" />
      </g>
      <path d="M16.8571 17.9406L16.7552 18.369C16.4496 18.4931 16.2055 18.5875 16.0237 18.6525C15.8417 18.7176 15.6302 18.75 15.3893 18.75C15.0192 18.75 14.7314 18.6568 14.5262 18.4716C14.3209 18.2857 14.2183 18.0501 14.2183 17.7642C14.2183 17.6536 14.2257 17.5398 14.2412 17.4239C14.2568 17.3078 14.2817 17.177 14.3156 17.0309L14.6976 15.6403C14.7316 15.5071 14.7605 15.381 14.7836 15.2616C14.8071 15.1431 14.8184 15.034 14.8184 14.9358C14.8184 14.7582 14.7826 14.634 14.7115 14.5641C14.6403 14.4945 14.5045 14.4591 14.3029 14.4591C14.2041 14.4591 14.1027 14.4754 13.9992 14.5069C13.8953 14.5384 13.8065 14.569 13.7319 14.5973L13.8341 14.1686C14.0843 14.0638 14.3235 13.9741 14.5523 13.8996C14.781 13.8249 14.9972 13.7876 15.2017 13.7876C15.5692 13.7876 15.8527 13.8789 16.0518 14.0616C16.2509 14.2444 16.3505 14.4814 16.3505 14.7735C16.3505 14.8339 16.3439 14.9404 16.3299 15.0926C16.3162 15.2451 16.2906 15.3849 16.2534 15.512L15.873 16.897C15.8419 17.0082 15.8138 17.1354 15.7895 17.2785C15.7643 17.4207 15.7523 17.5293 15.7523 17.6022C15.7523 17.7861 15.7921 17.9117 15.8721 17.9784C15.9526 18.0452 16.0912 18.0784 16.2882 18.0784C16.3807 18.0784 16.4859 18.0615 16.6028 18.0283C16.7194 17.9952 16.8044 17.9661 16.8571 17.9406ZM16.9536 12.1259C16.9536 12.3672 16.8652 12.5733 16.6875 12.7427C16.5103 12.9128 16.2967 12.9979 16.0469 12.9979C15.7962 12.9979 15.5822 12.9128 15.4029 12.7427C15.224 12.5732 15.1343 12.3672 15.1343 12.1259C15.1343 11.885 15.224 11.6786 15.4029 11.507C15.5818 11.3356 15.7963 11.25 16.0469 11.25C16.2966 11.25 16.5103 11.3358 16.6875 11.507C16.8653 11.6786 16.9536 11.8851 16.9536 12.1259Z" fill="white" />
      <defs>
        <filter id="smc-filter0_d" x="0.536619" y="0.536619" width="29.4834" height="28.9267" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="2.4585" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.132786 0 0 0 0 0 0 0 0 0 0.473049 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <filter id="smc-filter1_d" x="6.18077" y="6.13414" width="18.1956" height="17.7317" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset />
          <feGaussianBlur stdDeviation="0.546333" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
        <linearGradient id="smc-paint0_linear" x1="15.8519" y1={6} x2="15.8519" y2={24} gradientUnits="userSpaceOnUse">
          <stop stopColor="#452499" />
          <stop offset={1} stopColor="#080314" />
        </linearGradient>
        <linearGradient id="smc-paint1_linear" x1="15.2784" y1={6} x2="15.2784" y2={24} gradientUnits="userSpaceOnUse">
          <stop offset="0.790055" stopColor="#9797FB" stopOpacity="0.67" />
          <stop offset={1} stopColor="#9797FB" />
        </linearGradient>
        <linearGradient id="smc-paint2_linear" x1="15.6221" y1="7.98204" x2="15.6221" y2="23.294" gradientUnits="userSpaceOnUse">
          <stop />
          <stop offset={1} stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}
