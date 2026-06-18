'use client';
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  fr: {
    home: "Accueil",
    profile: "Profil",
    notifications: "Notifications",
    messages: "Messages",
    following: "Comptes suivis",
    follow: "Suivre",
    unfollow: "Ne plus suivre",
    editProfile: "Modifier le profil",
    publish: "Publier",
    placeholder: "Comment ça va ?",
    noPost: "Aucun post pour l'instant.",
    noMessage: "Aucun message pour l'instant.",
    noNotif: "Aucune notification pour l'instant.",
    notifDesc: "Les mentions et interactions apparaîtront ici",
    msgDesc: "Tes conversations privées apparaîtront ici",
    save: "Enregistrer",
    loading: "Chargement...",
    subscriptions: "abonnements",
    followers: "abonnés",
    bornOn: "Né(e) le",
    name: "Nom",
    bio: "Bio",
    birthdate: "Date de naissance",
    changePic: "Clique pour changer la photo",
    bioPlaceholder: "Parle de toi en quelques mots",
    settings: "Paramètres",
    account: "Compte",
    logout: "Déconnexion",
    appearance: "Apparence",
    theme: "Thème",
    language: "Langue",
    themeDark: "Sombre",
    themeLight: "Clair",
    legal: "Informations légales",
    terms: "Conditions d'utilisation",
    privacy: "Politique de confidentialité",
    cookies: "Politique relative aux cookies",
    accessibility: "Accessibilité",
    ads: "Informations sur les publicités",
    moreAbout: "Plus / À propos",
  },
  en: {
    home: "Home",
    profile: "Profile",
    notifications: "Notifications",
    messages: "Messages",
    following: "Following",
    follow: "Follow",
    unfollow: "Unfollow",
    editProfile: "Edit profile",
    publish: "Post",
    placeholder: "What's on your mind?",
    noPost: "No posts yet.",
    noMessage: "No messages yet.",
    noNotif: "No notifications yet.",
    notifDesc: "Mentions and interactions will appear here",
    msgDesc: "Your private conversations will appear here",
    save: "Save",
    loading: "Loading...",
    subscriptions: "following",
    followers: "followers",
    bornOn: "Born on",
    name: "Name",
    bio: "Bio",
    birthdate: "Date of birth",
    changePic: "Click to change photo",
    bioPlaceholder: "Tell us a bit about yourself",
    settings: "Settings",
    account: "Account",
    logout: "Log out",
    appearance: "Appearance",
    theme: "Theme",
    language: "Language",
    themeDark: "Dark",
    themeLight: "Light",
    legal: "Legal information",
    terms: "Terms of use",
    privacy: "Privacy policy",
    cookies: "Cookies policy",
    accessibility: "Accessibility",
    ads: "Advertising information",
    moreAbout: "More / About",
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr');

  function toggleLang() {
    setLang(l => l === 'fr' ? 'en' : 'fr');
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
