import React from 'react';

interface StatusBarProps {
  status: string;
  count: number;
}

const fmt = (d: Date) =>
  d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export const StatusBar: React.FC<StatusBarProps> = ({ status, count }) => {
  const [now, setNow] = React.useState<string>('');

  React.useEffect(() => {
    const tick = () => setNow(fmt(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="win-statusbar">
      <div className="win-status-seg grow bevel-in-thin">{status}</div>
      <div className="win-status-seg bevel-in-thin">
        {count} command{count === 1 ? '' : 's'}
      </div>
      <div className="win-status-seg bevel-in-thin win-status-clock">
        <svg width="12" height="12" viewBox="0 0 12 12" shapeRendering="crispEdges">
          <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" />
          <rect x="5.5" y="3" width="1" height="3.5" fill="currentColor" />
          <rect x="6" y="6" width="3" height="1" fill="currentColor" />
        </svg>
        <span>{now || '--:--'}</span>
      </div>
    </div>
  );
};

export default StatusBar;
