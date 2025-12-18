import React, { useState } from 'react';
import { WhatsAppMenuContext } from './WhatsAppMenuCtx';

export const WhatsAppMenuProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState(null);

  const openMenu = (option) => {
    setIsMenuOpen(true);
    setHighlightedOption(option);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setHighlightedOption(null);
  };

  const toggleMenu = (source) => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      // Si se abre desde WhatsApp button, resaltar opción 1
      // Si se abre desde "Hablar con mi avocado", resaltar opción 2
      const option = source === 'whatsapp' ? 1 : source === 'avocado-button' ? 2 : null;
      openMenu(option);
    }
  };

  return (
    <WhatsAppMenuContext.Provider
      value={{
        isMenuOpen,
        highlightedOption,
        openMenu,
        closeMenu,
        toggleMenu,
      }}
    >
      {children}
    </WhatsAppMenuContext.Provider>
  );
};
