import { useContext } from "react";
import { TokenContext } from "../App";

export const useIsSignedIn = () => {
    const tokenContext = useContext(TokenContext);
    const isSignedIn = !!tokenContext?.accessToken;
  
    return isSignedIn;
  };