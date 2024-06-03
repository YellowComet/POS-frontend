// src/components/LanguageSwitcher.js
import React from 'react';
import i18n from '../../i18n';

const LanguageSwitcher = () => {
        
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
      console.log("hola");
    };

    return (
      <div>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('es')}>Español</button>
      </div>
    );
  };
  export default LanguageSwitcher;