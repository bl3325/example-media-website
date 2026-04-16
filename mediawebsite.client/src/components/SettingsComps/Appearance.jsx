import mainStyles from "../component-styles/SettingsMain.module.css"
import AppearanceIcon from "../../../src/assets/art-palette.png"

function Appearance() {
    return (
        <div className={`${mainStyles.layout} position-relative`}>
            <img className="ratio ratio-1x1 ms-4 mt-2 position-absolute" style={{ width: "3rem" }} src={ AppearanceIcon }></img>

            <div className={`${mainStyles.title} `}>
                <p className="display-6">Appearance</p>
            </div>

            <div className={`${mainStyles.contentContainer} p-3`}>
                <div className={`${mainStyles.subSection} `}>
                    <p className="lead">Themes</p>

                    <div className={`${mainStyles.subSection} `}>
                        <div>
                            {/* Put button group style in the div above and put the buttons in here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appearance;