import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
import auth from "../auth/firebase.init";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const googleAuth = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logInManually = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registerManually = (name, email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
    .then(
      (result) => {
        const user = result.user;

        return updateProfile(user, {
          displayName: name,
        })
        .then(() => result);
      }
    );
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const userInfo = {
    googleAuth,
    logInManually,
    registerManually,
    signOutUser,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
