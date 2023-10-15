import React, {createContext, useState} from 'react';

export const AUTH = createContext();

const ContextApi = ({children}) => {
  const [data, setData] = useState(null);
  return <AUTH.Provider value={{data, setData}}>{children}</AUTH.Provider>;
};

export default ContextApi;
