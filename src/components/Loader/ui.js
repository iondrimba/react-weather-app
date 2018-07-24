import React from 'react';
import './index.scss';

const UILoader = React.forwardRef((props, refs) => (
  <div ref={refs[0]} className="loader">
  <div ref={refs[1]} className="loader__circle">
    <div className="rays">
      <div className="ray ray--north"></div>
      <div className="ray ray--west"></div>
      <div className="ray ray--south"></div>
      <div className="ray ray--east"></div>
    </div>
    <div className="rays">
      <div className="ray ray--north"></div>
      <div className="ray ray--west"></div>
      <div className="ray ray--south"></div>
      <div className="ray ray--east"></div>
    </div>
  </div>
</div>
));

export default UILoader;
