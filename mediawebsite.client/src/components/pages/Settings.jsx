import styles from "./page-styles/SettingsStyle.module.css"

function Settings() {
    return (
        <div className={styles.layout}>
            <div className={`${styles.settingsMain} border-secondary bg-light`}>
                <aside className={`${styles.settingsNavigator} border-secondary`}>
                    <div className={`${styles.searchBar} `}>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>

                    <hr className="border-secondary"></hr>

                    <div className={`${styles.searchContent} button-group-vertical`} role="group" aria-label="Vertical button group">
                        <button type="button" class="btn">Setting 1</button>
                        <button type="button" class="btn">Setting 2</button>
                        <button type="button" class="btn">Setting 3</button>
                        <button type="button" class="btn">Setting 4</button>
                    </div>
                </aside>

                <div className={`${styles.mainContent}`}>
                       
                </div>
            </div>
        </div>
  );
}

export default Settings;