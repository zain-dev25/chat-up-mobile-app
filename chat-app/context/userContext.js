import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "./authContext"; // AuthContext se user fetch karne ke liye

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth(); // Auth context se user lete hain
  const [userInfo, setUserInfo] = useState(null);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoadingUserInfo(true);
      if (isAuthenticated && user?.uid) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserInfo({ uid: user.uid, ...userDocSnap.data() });
          } else {
            console.log("No user document found in Firestore for UID:", user.uid);
            setUserInfo(null);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
          setUserInfo(null);
        }
      } else {
        setUserInfo(null);
      }
      setLoadingUserInfo(false);
    };

    fetchUserInfo();
  }, [isAuthenticated, user]); // Jab isAuthenticated ya user change ho toh re-fetch karein

  return (
    <UserContext.Provider value={{ userInfo, loadingUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
