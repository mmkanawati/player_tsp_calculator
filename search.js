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

                filteredPlayers.sort((a, b) => {
                    // Sort by the 'Season.1' field (assuming the season is in a format that can be directly compared)
                    return a['Season.1'] < b['Season.1'] ? 1 : (a['Season.1'] > b['Season.1'] ? -1 : 0);
                });
                // Calculate slice indices for pagination
                const start = currentPage * 5;
                const end = start + 5;
                const playersToDisplay = filteredPlayers.slice(start, end);

                if (playersToDisplay.length === 0) {
                    resultsDiv.innerHTML = "<p>No players found.</p>";
                    return;
                }

                // Create a table
                const table = document.createElement("table");
                const tableHeader = document.createElement("thead");
                const tableBody = document.createElement("tbody");

                // Table headers
                const headers = [
                    "First Name", "Last Name", "Division", "Season", "Team", "Games Played", 
                    "Points", "Rebounds", "Assists", "Steals", "Blocks", "Turnovers", 
                    "Personal Fouls", "TSP"
                ];
                const headerRow = document.createElement("tr");

                headers.forEach(header => {
                    const th = document.createElement("th");
                    th.textContent = header;
                    headerRow.appendChild(th);
                });

                tableHeader.appendChild(headerRow);
                table.appendChild(tableHeader);

                // Add data rows
                playersToDisplay.forEach(player => {
                    const row = document.createElement("tr");

                    const playerData = [
                        player['First Name'], player['Last Name'], player['DIV'], player['Season.1'], 
                        player['Team'], player['GP'], player['PTS'], player['REB'], 
                        player['AST'], player['STL'], player['BLK'], player['TO'], 
                        player['PF'], player['TSP']
                    ];

                    playerData.forEach(data => {
                        const td = document.createElement("td");
                        td.textContent = data;
                        row.appendChild(td);
                    });

                    tableBody.appendChild(row);
                });

                table.appendChild(tableBody);
                resultsDiv.appendChild(table);

                // Clear previous pagination buttons
                const paginationDiv = document.getElementById("pagination");
                if (paginationDiv) {
                    paginationDiv.remove();
                }

                const paginationButtons = document.createElement("div");
                paginationButtons.id = "pagination";

                // Display "Previous" button if we are not on the first page
                if (currentPage > 0) {
                    const prevButton = document.createElement("button");
                    prevButton.textContent = "Previous";
                    prevButton.addEventListener("click", function () {
                        currentPage--;
                        displayPlayers(); // Load previous page of results
                    });
                    paginationButtons.appendChild(prevButton);
                }

                // Display "Next" button if there are more players to show
                if (end < filteredPlayers.length) {
                    const nextButton = document.createElement("button");
                    nextButton.textContent = "Next";
                    nextButton.addEventListener("click", function () {
                        currentPage++;
                        displayPlayers(); // Load next page of results
                    });
                    paginationButtons.appendChild(nextButton);
                }

                resultsDiv.appendChild(paginationButtons);
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
