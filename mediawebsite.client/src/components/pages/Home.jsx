import styles from "./page-styles/HomeStyle.module.css"

function Home() {
    return (
        <div className={ styles.layout }>
            <aside className={`${styles.leftAside} text-center bg-surface border-theme text-on-surface`}>
                <h2>Left Aside</h2>
            </aside>

            <main className={`${styles.mainArticle} text-center bg-surface border-theme text-on-surface`}>
                <h1>Main</h1>
            </main>

            <aside className={`${styles.rightAside} text-center bg-surface border-theme text-on-surface`}>
                <h2>Right Aside</h2>
            </aside>
        </div>
  );
}

export default Home;