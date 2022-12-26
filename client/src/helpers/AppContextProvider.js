import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext('');

// Hook to provide access to context object
export const UseAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = (props) => {
  const [apiData, setApiData] = useState([]);
  const globalValue = "Global Value"

  // Assign React state and constants to context object
  const AppContextObject = {
    apiValue:{apidata, setApiData},
    global:{globalValue } 
  };
  return (
    <AppContext.Provider value={AppContextObject}>
      {props.children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.element,
};