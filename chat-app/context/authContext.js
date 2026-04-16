import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged , createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth, db } from "../firebaseConfig.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { router } from "expo-router";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState();
  console.log( "isAuthenticated",isAuthenticated);
  useEffect(() => {
    //  onAUth State Changed
    // router.replace("/signUp")
    const unsub = onAuthStateChanged (auth, async(currentUser) => {
      console.log("Auth State Changed: ", currentUser?.uid);
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(!!currentUser);

const docRef = doc(db, "users", currentUser.uid);
const docSnap = await getDoc(docRef);
console.log("Firestore user document:", docSnap.exists() ? docSnap.data().username : "No document found");


      }else{
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return unsub;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logging in user with:", { email, password });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Logging out user");
      // await setIsAuthenticated(false);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const register = async (email, password, username, profile) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered in Auth:", response.user.uid);

      // Thora wait karte hain taake auth state update ho jaye
      await setDoc(doc(db, "users", response.user.uid), {
        username,
        email,
        profile,
        userId: response.user.uid
      });
       
      console.log("User document created in Firestore");
      return { success: true, data: response.user };
    } catch (error) {
      console.log("Full Error Object:", error);
      let msg = error.message;
      if (msg.includes("auth/email-already-in-use")) msg = "This email is already registered.";
      if (msg.includes("permission-denied")) msg = "Firestore Rules blocked the write. Please check Firebase Console.";
      
      Alert.alert("Registration Error", msg);
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (value === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return value;
};
