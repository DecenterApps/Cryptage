/* eslint-disable */
import React from 'react';

const Scarce = ({ color }) => (
  <svg width="51" height="51" viewBox="0 0 51 51" fill="none">
    <rect width="50" height="50" fill="black" fillOpacity="0" transform="translate(0.271729 0.98999)"/>
    <circle cx="25.2717" cy="25.99" r="24.5" transform="rotate(90 25.2717 25.99)" stroke={color}/>
    <defs>
      <linearGradient id="paint0_linear" x1="25.3613" y1="3.98999" x2="25.3613" y2="48.1016" gradientUnits="userSpaceOnUse">
        <stop stopColor={color}/>
        <stop offset="1" stopColor={color} stopOpacity="0"/>
      </linearGradient>
    </defs>
  </svg>
)

export default Scarce;