import Connection from "./ConnectionTemplate"

function ConnectionList() {

    const cardsData = [
        { title: "Card 1", description: "This is the first card." },
        { title: "Card 2", description: "This is the second card." },
        { title: "Card 3", description: "This is the third card." },
    ];

    return (
        <div className="w-100 flex-grow-1 overflow-auto p-3 pt-1 text-start no-scrollbar">
            <div className="w-100" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, 350px)",
                gap: "10px",
                justifyContent: "flex-start"
            }}>
                {cardsData.map((card, index) => (
                    <Connection key={index} title={card.title} description={card.description} />
                ))}
            </div>
        </div>
    );
}

export default ConnectionList;