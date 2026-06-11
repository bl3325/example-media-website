export async function searchConnections(scope, q) {
    if (!q) return [];
    const encoded = encodeURIComponent(q);
    let url = "";

    switch ((scope || "users").toLowerCase()) {
        case "users":
            url = `/api/connections/search?query=${encoded}&scope=users`;
            break;
        case "requests":
            url = `/api/connections/search?query=${encoded}&scope=requests`;
            break;
        case "connections":
            url = `/api/connections/search?query=${encoded}&scope=connections`;
            break;
        default:
            throw new Error("invalid scope");
    }

    const opts = { method: "GET" };
    if (scope === "requests" || scope === "connections") opts.credentials = "include";

    console.log("searchConnections ->", { scope, url, opts }); // debug: exact URL sent
    const resp = await fetch(url, opts);
    if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(`Search failed: ${resp.status} ${resp.statusText} - ${text}`);
    }
    return resp.json();
}