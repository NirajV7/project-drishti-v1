import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // New login function
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Fetch role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    setCurrentUser(user);
    setUserRole(userDoc.exists() ? userDoc.data().role : null);
    return { user, role: userDoc.exists() ? userDoc.data().role : null };
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setUserRole(userDoc.exists() ? userDoc.data().role : null);
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    login
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 