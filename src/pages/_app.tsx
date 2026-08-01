import React from 'react';
import '../styles/global.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider, useTheme } from '../components/ui/theme';
import { DesktopIcons } from '../components/ui/DesktopIcons';

const Desktop: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => {
  const { scheme, phosphor } = useTheme();
  return (
    <div
      className="win-desktop"
      data-scheme={scheme}
      data-phosphor={phosphor}
      onMouseDown={onClick}
    >
      <DesktopIcons />
      {children}
    </div>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <ThemeProvider>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      <Desktop onClick={focusInput}>
        <Component {...pageProps} inputRef={inputRef} />
      </Desktop>
    </ThemeProvider>
  );
};

export default App;
