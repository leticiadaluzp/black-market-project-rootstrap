import { createContext, useState, useEffect } from "react";

export const UserSessionContext = createContext();

export const UserSessionProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth() ? setIsLoggedIn(true) : setIsLoggedIn(false)
  }, []);

  const checkAuth = () => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedUid = localStorage.getItem('uid');
    const storedClient = localStorage.getItem('client');
  
    if (storedAccessToken && storedUid && storedClient) {
      return true; 
    }
    return false;  
  }

  return (
    <UserSessionContext.Provider value={{isLoggedIn, setIsLoggedIn, checkAuth}}>
      {children}
    </UserSessionContext.Provider>
  );
}
