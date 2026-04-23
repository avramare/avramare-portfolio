import React from 'react';
import config from '../../config.json';

export const Ps1 = () => {
  return (
    <div className="flex items-center shrink-0 select-none whitespace-nowrap">
      <span className="text-light-yellow dark:text-dark-yellow">
        {config.ps1_username}
      </span>
      <span className="text-light-gray dark:text-dark-gray">@</span>
      <span className="text-light-green dark:text-dark-green">
        {config.ps1_hostname}
      </span>
      <span className="text-light-gray dark:text-dark-gray">:~</span>
      <span className="text-light-foreground dark:text-dark-foreground ml-1">❯</span>
      <span>&nbsp;</span>
    </div>
  );
};

export default Ps1;
