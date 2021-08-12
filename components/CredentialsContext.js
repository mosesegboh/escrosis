import  {createContext}  from "react";

//credentials contxet
export const CredentialsContext = createContext({storedCredentials: {}, setStoredCredentials: () => {} });