/* eslint-disable */
import React from 'react';

const ProjectPill = ({ id }) => (
  <div className="project-pill">
    <svg width={38} height={38} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width={19} height={44} rx="9.5" transform="translate(-4 10.1421) rotate(-45)" fill={`url(#${id}paint0_radial123)`} stroke={`url(#${id}paint1_radial123)`} />
      <defs>
        <radialGradient id={`${id}paint0_radial123`} cx="0.5" cy="0.5" r="0.5" gradientUnits="userSpaceOnUse" gradientTransform="translate(25.4231 -34.1492) scale(30.8462 69.4041) rotate(90)">
          <stop stopColor="#36265F" />
          <stop offset={1} stopColor="#36265F" stopOpacity={0} />
        </radialGradient>
        <radialGradient id={`${id}paint1_radial123`} cx="0.5" cy="0.5" r="0.5" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-0.707107 64.3467 -28.5985 -0.31427 24.3262 -31.7901)">
          <stop stopColor="#746DBE" />
          <stop offset={1} stopColor="#746DBE" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

export default ProjectPill;
