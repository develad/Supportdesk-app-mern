import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true); //loading

  // const user = useSelector((state) => state.auth.user);

  // Same name as in the store , destructuring the user
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  // We want the useEffect will run every time the user changes
  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);

  return {
    loggedIn,
    checkingStatus,
  };
};
