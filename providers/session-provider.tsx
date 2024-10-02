'use client';

import * as React from 'react';

import { type SessionUser } from '@/lib/lucia-auth';

export const SessionContext = React.createContext({} as SessionUser);

interface SessionProviderProps {
  session: SessionUser;
  children: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
  session,
}) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => React.useContext(SessionContext);
