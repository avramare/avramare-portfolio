import React from 'react';
import { runCommand } from '../../utils/terminalBus';
import {
  IconAbout,
  IconResume,
  IconGithub,
  IconLinkedin,
  IconProjects,
} from './icons';

interface Shortcut {
  id: string;
  label: string;
  command: string;
  Icon: React.FC<{ size?: number }>;
}

const SHORTCUTS: Shortcut[] = [
  { id: 'about', label: 'About Me', command: 'about', Icon: IconAbout },
  { id: 'resume', label: 'Résumé.pdf', command: 'resume', Icon: IconResume },
  { id: 'projects', label: 'Projects', command: 'qa', Icon: IconProjects },
  { id: 'github', label: 'GitHub', command: 'github', Icon: IconGithub },
  { id: 'linkedin', label: 'LinkedIn', command: 'linkedin', Icon: IconLinkedin },
];

export const DesktopIcons: React.FC = () => {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <div className="win-icons" onMouseDown={(e) => e.stopPropagation()}>
      {SHORTCUTS.map(({ id, label, command, Icon }) => (
        <div
          key={id}
          className={`win-icon${selected === id ? ' selected' : ''}`}
          tabIndex={0}
          role="button"
          title={`Run "${command}"`}
          onMouseDown={() => setSelected(id)}
          onDoubleClick={() => runCommand(command)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              runCommand(command);
            }
          }}
        >
          <span className="win-icon-glyph">
            <Icon size={32} />
          </span>
          <span className="win-icon-label">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default DesktopIcons;
