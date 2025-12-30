import { handleRoute } from './router.js';

window.addEventListener('DOMContentLoaded', () => {
    handleRoute();
    window.addEventListener('hashchange', handleRoute);

    // Dark mode toggle
    const toggle = document.getElementById("dark-toggle");
    const darkPref = localStorage.getItem("darkMode") === "true";
    if (darkPref) document.body.classList.add("dark");
    if (toggle) toggle.checked = darkPref;

    toggle?.addEventListener("change", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("darkMode", toggle.checked);
    });
});
