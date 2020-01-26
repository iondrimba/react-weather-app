import React, { PureComponent } from 'react';
import './index.scss';

class Error extends PureComponent {
  render() {
    return (
      <div className="error">
        <h1>:(</h1>
        This application uses a free service from <a target="blank" rel="noopener" href="https://ipstack.com/">https://ipstack.com/</a> and the current usage exceded the reach limit.<br /><br />Please come back later.
      </div>
    )
  }
}

export default Error;
