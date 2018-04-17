import React from 'react';

import bug from './bug.png';
import './ReportABug.scss';

const ReportABug = () => (
  <a
    className="bug-report"
    href="https://insights.hotjar.com/s?siteId=836110&surveyId=45077"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={bug} alt="Report a bug" />
    <p>Report a bug</p>
  </a>
);

export default ReportABug;
