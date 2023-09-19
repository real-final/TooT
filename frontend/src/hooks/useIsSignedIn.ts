import { useContext } from "react";
import { UserAuthContext } from "../App";

export const useIsSignedIn = () => {
  const userContext = useContext(UserAuthContext);
  const isSignedIn = !!userContext?.accessToken;

  return isSignedIn;
};
