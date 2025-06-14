import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import auth from '../firebase/firebase.init';
import AuthContext from './AuthContext';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('State captured:', currentUser);

      if (currentUser?.email) {
        const user = { email: currentUser.email };

        axios
          .post('http://localhost:3000/jwt', user, {
            withCredentials: true,
          })
          .then((res) => {
            console.log('login token', res.data);
          })
          .catch((error) => {
            console.error('JWT login error:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        axios
          .post('http://localhost:3000/jwt', {}, { withCredentials: true })
          .then((res) => {
            console.log('logout', res.data);
          })
          .catch((error) => {
            console.error('JWT logout error:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
