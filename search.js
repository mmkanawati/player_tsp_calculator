document.addEventListener("DOMContentLoaded", function () {
    const firstNameSearch = document.getElementById("firstNameSearch");
    const lastNameSearch = document.getElementById("lastNameSearch");
    const resultsDiv = document.getElementById("results");

    let players = []; // Store all players data
    let filteredPlayers = []; // Store the filtered player data based on search input
    let currentPage = 0; // Track the current page for pagination

    // Fetch player data from a JSON file
    fetch('player_data.json')
        .then(response => response.json())
        .then(data => {
            players = data; // Store player data

            // Function to display players (5 per page)
            function displayPlayers() {
                resultsDiv.innerHTML = ""; // Clear previous results

                const start = currentPage * 5;
                const end = start + 5;
                const playersToDisplay = filteredPlayers.slice(start, end);

                if (playersToDisplay.length === 0) {
                    resultsDiv.innerHTML = "<p>No players found.</p>";
                    return;
                }

                playersToDisplay.forEach(player => {
                    const playerInfo = document.createElement("div");
                    playerInfo.classList.add("player");

                    // Display player information
                    playerInfo.innerHTML = `
                        <div class="player-details">
                            <div><strong>${player['First Name']} ${player['Last Name']}</strong></div>
                            <div>Season: ${player['Season.1']}</div>
                            <div>Team: ${player['Team']}</div>
                            <div>Games Played: ${player['GP']}</div>
                            <div>Points: ${player['PTS']}</div>
                            <div>Rebounds: ${player['REB']}</div>
                            <div>Assists: ${player['AST']}</div>
                            <div>Steals: ${player['STL']}</div>
                            <div>Blocks: ${player['BLK']}</div>
                            <div>Turnovers: ${player['TO']}</div>
                            <div>Personal Fouls: ${player['PF']}</div>
                            <div>TSP: ${player['TSP']}</div>
                        </div>
                    `;

                    resultsDiv.appendChild(playerInfo);
                });

                // Display "Previous" button if we are not on the first page
                if (currentPage > 0) {
                    const prevButton = document.createElement("button");
                    prevButton.textContent = "Previous";
                    prevButton.addEventListener("click", function () {
                        currentPage--;
                        displayPlayers(); // Load previous page of results
                    });
                    resultsDiv.appendChild(prevButton);
                }

                // Display "Next" button if there are more players to show
                if (end < filteredPlayers.length) {
                    const nextButton = document.createElement("button");
                    nextButton.textContent = "Next";
                    nextButton.addEventListener("click", function () {
                        currentPage++;
                        displayPlayers(); // Load next page of results
                    });
                    resultsDiv.appendChild(nextButton);
                }
            }

            // Function to filter players by first name and last name
            function filterPlayers() {
                const firstNameInput = firstNameSearch.value.toLowerCase();
                const lastNameInput = lastNameSearch.value.toLowerCase();

                filteredPlayers = players.filter(player => {
                    // Ensure 'First Name' and 'Last Name' are not null or undefined
                    const firstName = player['First Name'] ? player['First Name'].toLowerCase() : '';
                    const lastName = player['Last Name'] ? player['Last Name'].toLowerCase() : '';

                    return (
                        (firstNameInput === "" || firstName.includes(firstNameInput)) &&
                        (lastNameInput === "" || lastName.includes(lastNameInput))
                    );
                });

                currentPage = 0; // Reset to the first page when filtering
                displayPlayers(); // Display filtered players
            }

            // Add event listeners to search fields for live filtering
            firstNameSearch.addEventListener("input", filterPlayers);
            lastNameSearch.addEventListener("input", filterPlayers);

            // Initial display to ensure no results are shown before filtering
            displayPlayers();
        })
        .catch(error => {
            console.error('Error loading player data:', error);
            resultsDiv.innerHTML = "<p>Failed to load player data. Please try again later.</p>";
        });
});
