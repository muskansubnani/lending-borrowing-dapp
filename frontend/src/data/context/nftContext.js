import { createContext, useContext, useState } from "react";

const NftContext = createContext(null);

export const useNft = () => useContext(NftContext);

export const NftProvider = ({ children }) => {
  const [selectedNft, setSelectedNft] = useState(null);

  return (
    <NftContext.Provider value={{ selectedNft, setSelectedNft }}>
      {children}
    </NftContext.Provider>
  );
};
