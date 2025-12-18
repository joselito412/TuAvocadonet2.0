import { createContext, useContext } from 'react';

export const WhatsAppMenuContext = createContext();

export const useWhatsAppMenu = () => {
  const context = useContext(WhatsAppMenuContext);
  if (!context) {
    throw new Error('useWhatsAppMenu must be used within WhatsAppMenuProvider');
  }
  return context;
};
