'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

/* ========================================
   Cursor Types & Context
   ======================================== */

type CursorType = 'default' | 'hover' | 'link' | 'dark';

interface CursorState {
  type: CursorType;
  label: string;
}

interface CursorContextValue {
  cursor: CursorState;
  setCursor: (type: CursorType, label?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextValue>({
  cursor: { type: 'default', label: '' },
  setCursor: () => {},
  resetCursor: () => {},
});

export function useCursor(): CursorContextValue {
  return useContext(CursorContext);
}

/* ========================================
   Provider
   ======================================== */

interface CursorProviderProps {
  children: ReactNode;
}

export function CursorProvider({ children }: CursorProviderProps) {
  const [cursor, setCursorState] = useState<CursorState>({
    type: 'default',
    label: '',
  });

  const setCursor = useCallback((type: CursorType, label = '') => {
    setCursorState({ type, label });
  }, []);

  const resetCursor = useCallback(() => {
    setCursorState({ type: 'default', label: '' });
  }, []);

  return (
    <CursorContext.Provider value={{ cursor, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}
