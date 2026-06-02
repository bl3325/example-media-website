const THEMES = ["light", "dark", "ocean", "solarized"];
const STORAGE_KEY = "theme";

export function applyTheme(theme) {
    if (!theme) return;
    document.documentElement.setAttribute("data-bs-theme", theme);
}

export function setTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
        console.log(e);
    }
}
export function getTheme() {
    try {
        return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function saveThemeToServer(theme) {
    try {
        await fetch("/api/user/theme", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ theme }),
            credentials: "include",
        });
    } catch (e) {
        console.log(e);
    }
}

export default async function initTheme() {
    let theme = null;

    // Try server
    try {
        const res = await fetch("/api/user/theme", { credentials: "include" });
        if (res.ok) {
            const json = await res.json();
            if (json && json.theme) theme = json.theme;
        }
    } catch (e) {
        console.log(e);
    }

    if (!theme) theme = getTheme();

    if (!theme && window.matchMedia) {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    if (!theme) theme = "light";

    applyTheme(theme);
    setTheme(theme);
    return theme;
}

export { THEMES };