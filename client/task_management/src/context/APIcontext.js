import { createContext, useEffect, useState } from 'react';

export const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false); 
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [channelAdminMap, setChannelAdminMap] = useState({});
    


  useEffect(() => {
    const token = localStorage.getItem('token') || null;
    if(token){
        setIsLoggedIn(true);
    }
  }, []);

  return (
    <APIContext.Provider value={{user,setUser,setIsLoggedIn,isLoggedIn,channelAdminMap,setChannelAdminMap}}>
      {children}
    </APIContext.Provider>
  );
};
