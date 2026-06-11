import { useState } from "react"
import Connection from "./ConnectionTemplate"
import { searchConnections } from "../utils/api"

function ConnectionPeople() {
    const [q, setQ] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    async function doSearch(e) {
        e?.preventDefault();
        const term = (q || "").trim();
        if (!term) return;

        setSubmitted(true);
        setLoading(true);
        setError(null);

        try {
            const data = await searchConnections("users", term);
            setResults(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setError(err?.message || "Search failed");
            setResults([]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-100 flex-grow-1 overflow-auto p-3 pt-1 text-start no-scrollbar">
            <form className="d-flex mb-3" onSubmit={doSearch}>
                <input
                    className="form-control me-2"
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder="Search users"
                />
                <button className="btn btn-theme-outline" type="submit">Search</button>
            </form>

            {loading &&
            <div className="p-2">
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                Searching…
            </div>}

            {error && <div className="p-2 text-danger">Error: {error}</div>}

            {!loading && submitted && results.length === 0 && !error && (
                <div className="p-2 text-muted">No users found.</div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,350px)", gap: 10 }}>
                {results.map(u => (
                    <div key={u.id}>
                        <Connection title={u.userName} description={u.id}>
                            <button className="btn btn-sm btn-primary search-hover" onClick={() => {
                                fetch(`/api/connections/${u.id}`, { method: "POST", credentials: "include" })
                                    .then(r => { if (r.ok) setResults(r => r.filter(x => x.id !== u.id)) })
                                    .catch((e) => { console.log(e) });
                            }}>Add</button>
                        </Connection>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConnectionPeople;