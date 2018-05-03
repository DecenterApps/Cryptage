import React from 'react';

import bug from './bug.png';
import './ReportABug.scss';

const ReportABug = () => (
  <a
    className="bug-report"
    href="https://goo.gl/forms/90rEFatImpwGa0ak2"
    target="_blank"
    rel="noopener noreferrer"
    draggable={false}
  >
    <img src={bug} alt="Report a bug" draggable={false} />
    <p>Report a bug</p>
  </a>
);

export default ReportABug;
