import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase-config";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("currentUser") || null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function logIn(email, password) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(localStorage.setItem("currentUser", JSON.stringify(user)));
        history.push("/");

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  }
  function signUp(email, password) {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(localStorage.setItem("currentUser", JSON.stringify(user)));
        history.push("/");

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  }
  function logOut() {
    return signOut(auth);
  }

  onAuthStateChanged(auth, (currentuser) => {
    if (currentuser) {
      setUser(localStorage.setItem("currentUser", JSON.stringify(currentuser)));
    } else {
      setUser(localStorage.removeItem("currentUser"));
    }
  });

  return (
    <userAuthContext.Provider value={{ user, loading, logIn, signUp, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
