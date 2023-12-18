import { useEffect, useState, react } from "react";
import { useFirebase } from "../context/firebase";
import { onAuthStateChanged } from "firebase/auth";
const useAuth = () => {
  const firebase = useFirebase();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
      } else {
        // No user is signed in.
        setUser(null);
      }
    });

    // Cleanup the subscription to avoid memory leaks
    return () => unsubscribe();
  }, [firebase.auth]);

  return user;
};

export default useAuth;
