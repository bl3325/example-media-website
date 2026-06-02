import { useEffect, useState } from "react";
import mainStyles from "../component-styles/SettingsMain.module.css";
import AppearanceIcon from "../../../src/assets/art-palette.png";
import {
    THEMES,
    applyTheme,
    getTheme,
    setTheme as setStoredTheme,
    saveThemeToServer,
} from "../../utils/DataTheme.js";

function Appearance() {
    const [current, setCurrent] = useState(() => {
        return (
            (typeof document !== "undefined" && document.documentElement.getAttribute("data-bs-theme")) ||
            getTheme() ||
            "light"
        );
    });

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const t = document.documentElement.getAttribute("data-bs-theme");
            if (t && t !== current) setCurrent(t);
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-bs-theme"] });
        return () => observer.disconnect();
    }, [current]);

    const selectTheme = async (theme) => {
        applyTheme(theme);
        setStoredTheme(theme);
        setCurrent(theme);
        await saveThemeToServer(theme);
    };

    return (
        <div className={`${mainStyles.layout} position-relative`}>
            <img className="ratio ratio-1x1 ms-4 mt-2 position-absolute" style={{ width: "3rem" }} src={AppearanceIcon} alt="appearance" />

            <div className={`${mainStyles.title} `}>
                <p className="display-6">Appearance</p>
            </div>

            <div className={`${mainStyles.contentContainer} p-3`}>
                <div className={`${mainStyles.subSection} `}>
                    <p className="lead">Themes</p>

                    <div className="btn-group" role="group" aria-label="Themes">
                        {THEMES.map((t) => (
                            <button
                                key={t}
                                type="button"
                                className={`btn ${current === t ? "btn-theme" : "btn-theme-outline"}`}
                                onClick={() => selectTheme(t)}
                            >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appearance;