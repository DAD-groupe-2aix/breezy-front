// services/ageUtils.js

/**
 * Calcule l'âge à partir d'une date de naissance (format YYYY-MM-DD ou ISO)
 */
export function calculateAge(dateOfBirth) {
  const today = new Date();
  const birth = new Date(dateOfBirth);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

/**
 * Retourne true si l'utilisateur a au moins minAge ans
 */
export function isOldEnough(dateOfBirth, minAge = 13) {
  if (!dateOfBirth) return false;
  return calculateAge(dateOfBirth) >= minAge;
}

/**
 * Formate une date ISO en français → "14 mai 2000"
 */
export function formatDateFR(isoDate) {
  if (!isoDate) return null;
  return new Date(isoDate).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}