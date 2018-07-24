import React from 'react';
import './index.scss';

const UINavigation = React.forwardRef((props, ref) => (
  <section ref={ref} className={`navigation ${props.currentForecast}`}>
    <div className="navigation__dot"></div>
    <div className="navigation__dot"></div>
  </section>
));

export default UINavigation;
