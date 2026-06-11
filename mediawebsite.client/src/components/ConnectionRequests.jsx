import { useEffect, useState } from "react"
import Connection from "./ConnectionTemplate"
import { searchConnections } from "../utils/api";

function ConnectionRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [q, setQ] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const resp = await fetch("/api/connections", { credentials: "include" });
                if (!resp.ok) {
                    throw new Error(`Fetch failed: ${resp.status}`);
                }
                const data = await resp.json();
                if (mounted) setRequests(data);
            } catch (err) {
                console.error(err);
                if (mounted) setError(err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; }
    }, []);

    async function doSearch(e) {
        e?.preventDefault();
        if (!q) return;

        try {
            const data = await searchConnections("requests", q);
            setResults(data);
        } catch (err) {
            // log and optionally show UI error
            console.error("Search failed", err);
            setResults([]);
        }
    }

    async function addConnection(id) {
        const resp = await fetch(`/api/connections/${id}`, { method: "POST", credentials: "include" });
        if (resp.ok) {
            setResults(results.filter(r => r.id !== id));
        }
    }

    if (loading) return
    <div className="p-3">
        <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        Loading requests…
    </div>;
    if (error) return <div className="p-3 text-danger">
        Error loading requests
    </div>;
    if (requests.length === 0) return <div className="p-3 text-muted">You have no requests yet.</div>;

    return (
        <div className="w-100 flex-grow-1 overflow-auto p-3 pt-1 text-start no-scrollbar">
            <form className="d-flex mb-3" onSubmit={doSearch}>
                <input className="form-control me-2" value={q} onChange={e => setQ(e.target.value)} placeholder="Search Requests" />
                <button className="btn btn-theme-outline" type="submit">Search</button>
            </form>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,350px)", gap: 10 }}>
                {results.map((c, i) => ( // initial mapping of existing connections
                    <Connection key={i} title={c.userName} description={c.id} />
                ))}

                {results.map(u => (
                    <div key={u.id}>
                        <Connection title={u.userName} description={u.id}>
                            <button className="btn btn-sm btn-primary search-hover" onClick={() => addConnection(u.id)}>Add</button>
                        </Connection>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConnectionRequests;