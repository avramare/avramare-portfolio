import React from 'react';
import config from '../../config.json';

export const Ps1 = () => {
  return (
    <div className="flex items-center shrink-0 select-none whitespace-nowrap">
      <span className="term-user">{config.ps1_username}</span>
      <span className="term-punct">@</span>
      <span className="term-host">{config.ps1_hostname}</span>
      <span className="term-punct">:~$</span>
      <span>&nbsp;</span>
    </div>
  );
};

export default Ps1;
