import React from 'react';
import '../styles/global.css';
import Head from 'next/head';
import config from '../../config.json';

const App = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickAnywhere = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
          maximum-scale="1"
        />
      </Head>

      <div
        className="terminal-desktop text-xs md:text-base text-light-foreground dark:text-dark-foreground"
        onClick={onClickAnywhere}
      >
        <main className="w-full h-full flex items-center justify-center p-0 md:p-6">
          <div className="terminal-window w-full h-full md:max-w-6xl md:h-[93vh] flex flex-col md:rounded-xl overflow-hidden">
            <div className="terminal-titlebar flex items-center px-4 py-2.5 shrink-0">
              <div className="flex items-center space-x-2">
                <div className="traffic-red w-3 h-3 rounded-full" />
                <div className="traffic-yellow w-3 h-3 rounded-full" />
                <div className="traffic-green w-3 h-3 rounded-full" />
              </div>
              <div className="flex-1 text-center text-xs terminal-title-text">
                {config.ps1_username}@{config.ps1_hostname}: ~
              </div>
              <div className="w-14" />
            </div>

            <div className="flex-1 overflow-hidden bg-light-background dark:bg-dark-background">
              <Component {...pageProps} inputRef={inputRef} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
