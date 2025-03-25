let playerData = [];
let currentPage = 0;
const resultsPerPage = 5;

async function loadData() {
    try {
        const response = await fetch("player_data.json");
        playerData = await response.json();
    } catch (error) {
        console.error("Error loading player data:", error);
    }
}

function searchPlayers(query) {
    if (!query.trim()) {
        document.getElementById("results").innerHTML = "";
        document.getElementById("prev").classList.add("hidden");
        document.getElementById("next").classList.add("hidden");
        return;
    }

    const results = playerData.filter(player =>
        player.name.toLowerCase().includes(query.toLowerCase())
    );

    displayResults(results);
}

function displayResults(results) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
    }

    let start = currentPage * resultsPerPage;
    let end = start + resultsPerPage;
    let paginatedResults = results.slice(start, end);

    paginatedResults.forEach(player => {
        const div = document.createElement("div");
        div.classList.add("player");
        div.innerHTML = `<strong>${player.name}</strong> - ${player.position} | ${player.team}`;
        resultsDiv.appendChild(div);
    });

    document.getElementById("prev").classList.toggle("hidden", currentPage === 0);
    document.getElementById("next").classList.toggle("hidden", end >= results.length);
}

document.getElementById("searchBar").addEventListener("input", (e) => {
    currentPage = 0;
    searchPlayers(e.target.value);
});

document.getElementById("prev").addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        searchPlayers(document.getElementById("searchBar").value);
    }
});

document.getElementById("next").addEventListener("click", () => {
    currentPage++;
    searchPlayers(document.getElementById("searchBar").value);
});

loadData();
