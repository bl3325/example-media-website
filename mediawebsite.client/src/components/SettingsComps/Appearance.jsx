import { useEffect, useState, useRef } from "react";
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

    // Toast state
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const toastTimerRef = useRef(null);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const t = document.documentElement.getAttribute("data-bs-theme");
            if (t && t !== current) setCurrent(t);
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-bs-theme"] });
        return () => observer.disconnect();
    }, [current]);

    useEffect(() => {
        return () => {
            // cleanup any pending toast timer on unmount
            if (toastTimerRef.current) {
                clearTimeout(toastTimerRef.current);
                toastTimerRef.current = null;
            }
        };
    }, []);

    const showToast = (message, duration = 5000) => {
        setToastMessage(message);
        setToastVisible(true);

        if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
        }

        toastTimerRef.current = setTimeout(() => {
            setToastVisible(false);
            toastTimerRef.current = null;
        }, duration);
    };

    const selectTheme = async (theme) => {
        applyTheme(theme);
        setStoredTheme(theme);
        setCurrent(theme);
        try {
            await saveThemeToServer(theme);
        } catch {
            // ignore save errors for UX; optionally show error toast
        }
        showToast(`Theme changed to ${theme.charAt(0).toUpperCase() + theme.slice(1)}`);
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

                    {/* Toast container */}
                    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1080 }}>
                        <div
                            role="status"
                            aria-live="polite"
                            aria-atomic="true"
                            className={`toast ${toastVisible ? "show" : ""}`}
                            style={{ minWidth: 240 }}
                        >
                            <div className="toast-header">
                                <div className="bg-primary rounded-1 me-2" style={{ height: "1.2rem", width: "1.2rem" }}></div>
                                <strong className="me-auto">Appearance</strong>
                                <small className="text-muted">now</small>
                                <button
                                    type="button"
                                    className="btn-close ms-2 mb-1"
                                    aria-label="Close"
                                    onClick={() => setToastVisible(false)}
                                />
                            </div>
                            <div className="toast-body">{toastMessage}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appearance;