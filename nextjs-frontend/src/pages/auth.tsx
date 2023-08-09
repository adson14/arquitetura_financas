
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getAccessTokenFromCookie } from "../utils/cookies";

import { verifyToken } from "../utils/auth";

const AuthPage: NextPage = () => {

  const { isAuthenticated ,login, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = getAccessTokenFromCookie();
    if(!token){
      logout()
      router.push('/login');
    }else{
      login()
    }
  
  }, [isAuthenticated,login,logout]);
  

  return null;
};

export default AuthPage;