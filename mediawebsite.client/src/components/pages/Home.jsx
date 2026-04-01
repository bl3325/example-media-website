import "./HomeStyle.css"

function Home() {
    return (
        <div className="layout">
            <aside className="leftAside text-center bg-light border-secondary">
                <h2>Left Aside</h2>
            </aside>

            <main className="mainArticle text-center bg-light border-secondary">
                <h1>Main</h1>
            </main>

            <aside className="rightAside text-center bg-light border-secondary">
                <h2>Right Aside</h2>
            </aside>
        </div>
  );
}

export default Home;