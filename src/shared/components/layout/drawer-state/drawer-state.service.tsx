import React, { FC, createContext, useContext } from 'react';

export interface DrawerStateModel {
  close(): void;
}

const DrawerStateContext = createContext<DrawerStateModel | undefined>(undefined);

const DrawerState: FC<DrawerStateModel> = ({ children, close }) => {
  return <DrawerStateContext.Provider value={{ close }}>{children}</DrawerStateContext.Provider>;
};

export const useDrawerState = () => {
  const service = useContext(DrawerStateContext);

  if (service === undefined) {
    throw new ReferenceError('Use DrawerState inside its provider.');
  }

  return service;
};

export default DrawerState;
