import { User } from "firebase/auth";
import { SignOutUser, userStateListener } from "../config/firebase-config";
import { createContext, useState, useEffect, ReactNode } from "react";

export const AuthContext = createContext({
  currentUser: {} as User | null,
  setCurrentUser: (_user: User) => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, [currentUser]);

  const signOut = () => {
    SignOutUser();
    setCurrentUser(null);
    window.location.replace("/");
  };

  const value = {
    currentUser,
    setCurrentUser,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
