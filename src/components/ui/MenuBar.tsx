import React from 'react';
import { useTheme, SCHEMES, PHOSPHORS } from './theme';
import { runCommand } from '../../utils/terminalBus';

interface MenuBarProps {
  onClear: () => void;
  onCopyAll: () => void;
  onFocusInput: () => void;
}

type Row =
  | { kind: 'sep' }
  | {
      kind: 'item';
      label: string;
      shortcut?: string;
      checked?: boolean;
      disabled?: boolean;
      onClick?: () => void;
    };

export const MenuBar: React.FC<MenuBarProps> = ({
  onClear,
  onCopyAll,
  onFocusInput,
}) => {
  const { scheme, phosphor, setScheme, setPhosphor } = useTheme();
  const [open, setOpen] = React.useState<string | null>(null);
  const barRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const fire = (fn?: () => void) => {
    setOpen(null);
    fn?.();
  };

  const menus: { id: string; label: string; rows: Row[] }[] = [
    {
      id: 'file',
      label: 'File',
      rows: [
        { kind: 'item', label: 'Run Command…', onClick: onFocusInput },
        { kind: 'item', label: 'Open Résumé', onClick: () => runCommand('resume') },
        { kind: 'sep' },
        { kind: 'item', label: 'Exit', disabled: true },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      rows: [
        { kind: 'item', label: 'Copy All', onClick: onCopyAll },
        {
          kind: 'item',
          label: 'Clear Screen',
          shortcut: 'Ctrl+L',
          onClick: onClear,
        },
      ],
    },
    {
      id: 'view',
      label: 'View',
      rows: [
        ...SCHEMES.map(
          (s): Row => ({
            kind: 'item',
            label: s.label,
            checked: scheme === s.id,
            onClick: () => setScheme(s.id),
          }),
        ),
        { kind: 'sep' },
        ...PHOSPHORS.map(
          (p): Row => ({
            kind: 'item',
            label: p.label,
            checked: phosphor === p.id,
            onClick: () => setPhosphor(p.id),
          }),
        ),
      ],
    },
    {
      id: 'help',
      label: 'Help',
      rows: [
        {
          kind: 'item',
          label: 'List Commands',
          onClick: () => runCommand('help'),
        },
        { kind: 'item', label: 'About Marko', onClick: () => runCommand('about') },
        { kind: 'sep' },
        {
          kind: 'item',
          label: 'View Repository',
          onClick: () => runCommand('repo'),
        },
      ],
    },
  ];

  return (
    <div className="win-menubar" ref={barRef}>
      {menus.map((menu) => (
        <div key={menu.id} style={{ position: 'relative' }}>
          <div
            className={`win-menu-item${open === menu.id ? ' open' : ''}`}
            onMouseDown={(e) => {
              e.preventDefault();
              setOpen(open === menu.id ? null : menu.id);
            }}
            onMouseEnter={() => open && setOpen(menu.id)}
          >
            <u>{menu.label[0]}</u>
            {menu.label.slice(1)}
          </div>

          {open === menu.id && (
            <div className="win-dropdown">
              {menu.rows.map((row, i) =>
                row.kind === 'sep' ? (
                  <div key={i} className="win-dropdown-sep" />
                ) : (
                  <div
                    key={i}
                    className="win-dropdown-row"
                    aria-disabled={row.disabled || undefined}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (!row.disabled) fire(row.onClick);
                    }}
                  >
                    <span className="win-dropdown-check">
                      {row.checked ? '•' : ''}
                    </span>
                    <span style={{ flex: 1 }}>{row.label}</span>
                    {row.shortcut && (
                      <span style={{ opacity: 0.7 }}>{row.shortcut}</span>
                    )}
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
