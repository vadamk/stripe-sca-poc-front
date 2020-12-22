import React from 'react'
import { useTranslation } from '../i18n'

const revertLanguage = (i18n) => {
  return i18n.language === 'en' ? 'sw' : 'en';
}

const Footer = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(revertLanguage(i18n));
  }

  return (
    <footer className="footer">
      <button onClick={toggleLanguage}>
        Switch to <span className="language">{revertLanguage(i18n)}</span>
      </button>
      <style jsx>{`
        .footer {
          display: flex;
          padding: 15px 0;
        }
        .footer > * {
          display: block;
          margin-right: 5px;
        }
        .language {
          text-transform: uppercase;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
