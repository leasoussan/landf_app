// import React, { createContext, useContext, useState } from 'react';

// const AuthContext  = createContext('');

// // Hook to provide access to context object
// export const UseAppContext = () => {
//   return useContext(AuthContext );
// };

// export const AppContextProvider = (props) => {
//   const [apiData, setApiData] = useState([]);
//   const globalValue = "Global Value"

//   // Assign React state and constants to context object
//   const AppContextObject = {
//     apiValue:{apidata, setApiData},
//     global:{globalValue } 
//   };
//   return (
//     <AuthContext .Provider value={AppContextObject}>
//       {props.children}
//     </AuthContext .Provider>
//   );
// };

// AppContextProvider.propTypes = {
//   children: PropTypes.element,
// };