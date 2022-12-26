import React, {useState,createContext} from "react";
import { useContext } from "react";


 export const  AuthContext = createContext(null);


const AuthProvider = ({ userData, children }) => {
    console.log("userDATA--------------------",userData);
    console.log("the KIDSS__________________",children);
  let [token, setToken] = useState(userData);
  
  return (
    <AuthContext.Provider value={{token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider}

export const useAuth = () => useContext(AuthContext);