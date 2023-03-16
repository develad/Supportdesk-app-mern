import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();
  // console.log("loggedIn: ", loggedIn);

  if (checkingStatus) {
    return <Spinner />;
  }

  // When logged in we returning the Outlet that is just the route in the private route. if not, we redirect to the login route page
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};
