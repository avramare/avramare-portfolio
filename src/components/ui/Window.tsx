import React from 'react';
import {
  AppIcon,
  GlyphMinimize,
  GlyphMaximize,
  GlyphClose,
} from './icons';

interface WindowProps {
  title: string;
  inactive?: boolean;
  menuBar?: React.ReactNode;
  statusBar?: React.ReactNode;
  onMinimize?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Window: React.FC<WindowProps> = ({
  title,
  inactive = false,
  menuBar,
  statusBar,
  onMinimize,
  children,
  className = '',
}) => {
  return (
    <div
      className={`win-window ${className}`}
      data-inactive={inactive || undefined}
    >
      <div className="win-titlebar">
        <AppIcon size={16} />
        <span className="win-title-text">{title}</span>
        <button
          className="win-ctrl bevel-out"
          aria-label="Minimize"
          onClick={onMinimize}
        >
          <GlyphMinimize />
        </button>
        <button className="win-ctrl bevel-out" aria-label="Maximize" disabled>
          <GlyphMaximize />
        </button>
        <button className="win-ctrl bevel-out" aria-label="Close" disabled>
          <GlyphClose />
        </button>
      </div>

      {menuBar}
      {children}
      {statusBar}
    </div>
  );
};

export default Window;
