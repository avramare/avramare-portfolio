import Head from 'next/head';
import React from 'react';
import config from '../../config.json';
import { Input } from '../components/input';
import { useHistory } from '../components/history/hook';
import { History } from '../components/history/History';
import { Window } from '../components/ui/Window';
import { MenuBar } from '../components/ui/MenuBar';
import { StatusBar } from '../components/ui/StatusBar';
import { AppIcon } from '../components/ui/icons';
import * as bin from '../utils/bin';
import { banner } from '../utils/bin';
import { registerRunner } from '../utils/terminalBus';

interface IndexPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const BOOT_LINES = [
  'AVRAM BIOS v9.5  (C) 1995 Marko Avram',
  '',
  'Detecting hardware ................ OK',
  'Memory Test: 640K base, 64512K ext  OK',
  'Loading QA.SYS ..................... OK',
  'Mounting portfolio volume [C:] .... OK',
  'Starting AVRAMARE terminal ........',
];

const Boot: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [shown, setShown] = React.useState(0);

  React.useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      onDone();
      return;
    }

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      onDone();
    };

    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((_, i) =>
      timers.push(setTimeout(() => setShown(i + 1), 130 * (i + 1))),
    );
    timers.push(setTimeout(finish, 130 * BOOT_LINES.length + 420));

    const skip = () => finish();
    window.addEventListener('keydown', skip);
    window.addEventListener('mousedown', skip);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('mousedown', skip);
    };
  }, [onDone]);

  return (
    <pre className="whitespace-pre-wrap term-ok" style={{ margin: 0 }}>
      {BOOT_LINES.slice(0, shown).join('\n')}
      {shown > 0 && shown < BOOT_LINES.length && (
        <span className="term-caret" />
      )}
    </pre>
  );
};

const IndexPage: React.FC<IndexPageProps> = ({ inputRef }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([]);

  const [phase, setPhase] = React.useState<'boot' | 'ready'>('boot');
  const [minimized, setMinimized] = React.useState(false);
  const [status, setStatus] = React.useState('Booting…');

  const onBooted = React.useCallback(() => {
    setHistory(banner());
    setPhase('ready');
    setStatus('Ready');
  }, [setHistory]);

  // Let desktop icons and the menu bar execute commands.
  React.useEffect(() => {
    registerRunner(async (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      const args = trimmed.split(' ');
      args[0] = args[0].toLowerCase();

      if (args[0] === 'clear') {
        clearHistory();
        return;
      }

      let output: string;
      if (typeof (bin as Record<string, any>)[args[0]] === 'function') {
        output = await (bin as Record<string, any>)[args[0]](args.slice(1));
      } else {
        output = `shell: command not found: ${args[0]}. Try 'help' to get started.`;
      }
      setHistory(output, trimmed);
      setStatus(`Ran: ${trimmed}`);
      inputRef.current?.focus();
    });
    return () => registerRunner(null);
  }, [clearHistory, setHistory, inputRef]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView();
      inputRef.current.focus({ preventScroll: true });
    }
  }, [history, phase]);

  const copyAll = React.useCallback(() => {
    const text = containerRef.current?.innerText ?? '';
    navigator.clipboard?.writeText(text);
    setStatus('Copied screen to clipboard');
  }, []);

  const commandCount = history.filter((h) => h.command !== '').length;

  if (minimized) {
    return (
      <>
        <Head>
          <title>{config.title}</title>
        </Head>
        <button
          className="win-window win-appear"
          style={{
            position: 'absolute',
            left: 16,
            bottom: 16,
            width: 210,
            padding: 3,
            cursor: 'pointer',
          }}
          onClick={() => setMinimized(false)}
        >
          <div className="win-titlebar" data-inactive="true">
            <AppIcon size={16} />
            <span className="win-title-text">{config.title}</span>
          </div>
        </button>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{config.title}</title>
      </Head>

      <div className="crt-on win-stage">
        <Window
          title={`${config.title} — ${config.ps1_username}@${config.ps1_hostname}`}
          onMinimize={() => setMinimized(true)}
          className="win-terminal-shell"
          menuBar={
            <MenuBar
              onClear={clearHistory}
              onCopyAll={copyAll}
              onFocusInput={() => inputRef.current?.focus()}
            />
          }
          statusBar={<StatusBar status={status} count={commandCount} />}
        >
          <div className="win-console">
            <div
              ref={containerRef}
              className="win-console-inner"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {phase === 'boot' ? (
                <Boot onDone={onBooted} />
              ) : (
                <>
                  <History history={history} />
                  <Input
                    inputRef={inputRef}
                    containerRef={containerRef}
                    command={command}
                    history={history}
                    lastCommandIndex={lastCommandIndex}
                    setCommand={setCommand}
                    setHistory={setHistory}
                    setLastCommandIndex={setLastCommandIndex}
                    clearHistory={clearHistory}
                  />
                </>
              )}
            </div>
          </div>
        </Window>
      </div>
    </>
  );
};

export default IndexPage;
