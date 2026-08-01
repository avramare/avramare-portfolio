import React from 'react';

export type Scheme = 'standard' | 'rainy' | 'desert' | 'contrast';
export type Phosphor = 'green' | 'amber' | 'ice';

export const SCHEMES: { id: Scheme; label: string }[] = [
  { id: 'standard', label: 'Windows Standard' },
  { id: 'rainy', label: 'Rainy Day' },
  { id: 'desert', label: 'Desert' },
  { id: 'contrast', label: 'High Contrast Black' },
];

export const PHOSPHORS: { id: Phosphor; label: string }[] = [
  { id: 'green', label: 'Phosphor Green' },
  { id: 'amber', label: 'Amber' },
  { id: 'ice', label: 'Ice Blue' },
];

interface ThemeState {
  scheme: Scheme;
  phosphor: Phosphor;
  setScheme: (s: Scheme) => void;
  setPhosphor: (p: Phosphor) => void;
}

const ThemeContext = React.createContext<ThemeState>({
  scheme: 'standard',
  phosphor: 'green',
  setScheme: () => undefined,
  setPhosphor: () => undefined,
});

export const useTheme = () => React.useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [scheme, setSchemeState] = React.useState<Scheme>('standard');
  const [phosphor, setPhosphorState] = React.useState<Phosphor>('green');

  React.useEffect(() => {
    const s = localStorage.getItem('win95-scheme') as Scheme | null;
    const p = localStorage.getItem('win95-phosphor') as Phosphor | null;
    if (s) setSchemeState(s);
    if (p) setPhosphorState(p);
  }, []);

  const setScheme = React.useCallback((s: Scheme) => {
    setSchemeState(s);
    localStorage.setItem('win95-scheme', s);
  }, []);

  const setPhosphor = React.useCallback((p: Phosphor) => {
    setPhosphorState(p);
    localStorage.setItem('win95-phosphor', p);
  }, []);

  return (
    <ThemeContext.Provider value={{ scheme, phosphor, setScheme, setPhosphor }}>
      {children}
    </ThemeContext.Provider>
  );
};
