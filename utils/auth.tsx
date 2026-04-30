import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type AuthUser = {
  email: string;
  username: string;
};

type AuthContextType = {
  user: AuthUser | null;
  pendingEmail: string;
  setPendingEmail: (email: string) => void;
  signIn: (username: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [pendingEmail, setPendingEmail] = useState('');

  const value = useMemo(
    () => ({
      user,
      pendingEmail,
      setPendingEmail,
      signIn: (username: string) => {
        setUser({
          email: pendingEmail || 'dev@local',
          username,
        });
      },
      signOut: () => {
        setUser(null);
        setPendingEmail('');
      },
    }),
    [pendingEmail, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
