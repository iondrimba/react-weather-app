import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const UIClose = React.forwardRef((props, ref) => (
  <button ref={ref} type="button" className="button-close" aria-label="Close view" onClick={props.onClick}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  </button>
));

UIClose.propTypes = {
  onClick: PropTypes.func
};

export default UIClose;
