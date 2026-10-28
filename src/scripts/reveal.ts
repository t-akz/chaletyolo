/**
 * Apparition douce des blocs au défilement (fondu + léger glissement).
 * Tout élément portant l'attribut « data-reveal » est concerné.
 * Les styles sont dans src/styles/global.css (désactivés si l'utilisateur
 * a choisi de réduire les animations).
 */
const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (!('IntersectionObserver' in window)) {
  elements.forEach((element) => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  elements.forEach((element) => observer.observe(element));
}
