import { useEffect } from "react";

// Elementos .reveal abaixo da dobra entram suavemente ao rolar
export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.remove("pre"); io.unobserve(e.target); }
      }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight * 0.9) { el.classList.add("pre"); io.observe(el); }
    });
    return () => io.disconnect();
  }, []);
}
