document.addEventListener("DOMContentLoaded", function () {
    const firstNameSearch = document.getElementById("firstNameSearch");
    const lastNameSearch = document.getElementById("lastNameSearch");
    const resultsDiv = document.getElementById("results");

    // Fetch player data from a JSON file
    fetch('player_data.json')
        .then(response => response.json())
        .then(data => {
            const players = data; // Now 'players' holds the data from the JSON file

            // Function to display players
            function displayPlayers(filteredPlayers) {
                resultsDiv.innerHTML = ""; // Clear previous results

                if (filteredPlayers.length === 0) {
                    resultsDiv.innerHTML = "<p>No players found.</p>";
                    return;
                }

                filteredPlayers.forEach(player => {
                    const playerInfo = document.createElement("div");
                    playerInfo.classList.add("player");

                    // Display player information
                    playerInfo.innerHTML = `
                        <p><strong>${player['First Name']} ${player['Last Name']}</strong></p>
                        <p>Season: ${player['Season.1']}</p>
                        <p>Team: ${player['Team']}</p>
                        <p>Games Played: ${player['GP']}</p>
                        <p>Points: ${player['PTS']}</p>
                        <p>Rebounds: ${player['REB']}</p>
                        <p>Assists: ${player['AST']}</p>
                        <p>Steals: ${player['STL']}</p>
                        <p>Blocks: ${player['BLK']}</p>
                        <p>Turnovers: ${player['TO']}</p>
                        <p>Personal Fouls: ${player['PF']}</p>
                        <p>TSP: ${player['TSP']}</p>
                    `;

                    resultsDiv.appendChild(playerInfo);
                });
            }

            // Function to filter players by first name and last name
            function filterPlayers() {
                const firstNameInput = firstNameSearch.value.toLowerCase();
                const lastNameInput = lastNameSearch.value.toLowerCase();

                const filteredPlayers = players.filter(player =>
                    (firstNameInput === "" || player['First Name'].toLowerCase().includes(firstNameInput)) &&
                    (lastNameInput === "" || player['Last Name'].toLowerCase().includes(lastNameInput))
                );

                displayPlayers(filteredPlayers);
            }

            // Add event listeners to the search input fields
            firstNameSearch.addEventListener("input", filterPlayers);
            lastNameSearch.addEventListener("input", filterPlayers);

            // Display all players initially
            displayPlayers(players);
        })
        .catch(error => {
            console.error('Error loading player data:', error);
            resultsDiv.innerHTML = "<p>Failed to load player data. Please try again later.</p>";
        });
});
