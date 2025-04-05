// Listen for changes on all division checkboxes to show or hide the note
document.querySelectorAll('input[name="divisionsPlayed"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const note = document.getElementById('note');
        // If any checkbox is checked, show the note; otherwise, hide it
        const anyChecked = document.querySelectorAll('input[name="divisionsPlayed"]:checked').length > 0;
        note.style.display = anyChecked ? 'block' : 'none';  // Show or hide the note based on checkbox status
    });
});


document.getElementById("playerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get selected divisions played
    const divisionsPlayed = [];
    document.querySelectorAll('input[name="divisionsPlayed"]:checked').forEach(checkbox => {
        divisionsPlayed.push(checkbox.value);
    });

    const divisionPlanned = document.querySelector('input[name="divisionsPlanned"]:checked')?.value;

    // Get inputs for each division (only if the division is selected)
    const D1Games = divisionsPlayed.includes("D1") ? parseInt(document.getElementById("D1Games").value) || 0 : 0;
    const D1TSP = divisionsPlayed.includes("D1") ? parseInt(document.getElementById("D1TSP").value) || 0 : 0;

    const D2Games = divisionsPlayed.includes("D2") ? parseInt(document.getElementById("D2Games").value) || 0 : 0;
    const D2TSP = divisionsPlayed.includes("D2") ? parseInt(document.getElementById("D2TSP").value) || 0 : 0;

    const D3Games = divisionsPlayed.includes("D3") ? parseInt(document.getElementById("D3Games").value) || 0 : 0;
    const D3TSP = divisionsPlayed.includes("D3") ? parseInt(document.getElementById("D3TSP").value) || 0 : 0;

    // Eligibility Check
    let resultText = "";
    let totalGames = 0;
    let totalTSP = 0;
    let eligibilityStatus = "";

    if (D1Games > 0) {
        totalGames += D1Games;
        totalTSP += D1TSP;
        resultText += `D1: ${(D1TSP / D1Games).toFixed(2)} TSP\n`;
    }

    if (D2Games > 0) {
        totalGames += D2Games;
        totalTSP += D2TSP;
        resultText += `D2: ${(D2TSP / D2Games).toFixed(2)} TSP\n`;
    }

    if (D3Games > 0) {
        totalGames += D3Games;
        totalTSP += D3TSP;
        resultText += `D3: ${(D3TSP / D3Games).toFixed(2)} TSP\n`;
    }

    // Check for eligibility based on the division they want to play
    if (divisionPlanned === "D1") {
        // D1 Eligibility Check
        eligibilityStatus = "Eligible for D1.";
    }

    if (divisionPlanned === "D2") {
        // D2 Eligibility Check
        if (D1TSP / D1Games >= 16.5) {
            eligibilityStatus = "Not eligible for D2.";
        } else if (D2TSP / D2Games >= 30.0) {
            eligibilityStatus = "Not eligible for D2.";
        } else if (D1TSP / D1Games >= 11.5) {
            eligibilityStatus = "You are 1 point in D2.";
        } else if (D2TSP / D2Games >= 16.5) {
            eligibilityStatus = "You are 1 point in D2.";
        } else {
            eligibilityStatus = "Eligible for D2.";
        }
    }

    if (divisionPlanned === "D3") {
        // D3 Eligibility Check
        if (D2TSP / D2Games >= 12) {
            eligibilityStatus = "Not eligible for D3.";
        } else if (D3TSP / D3Games >= 20.0) {
            eligibilityStatus = "Not eligible for D3.";
        } else if (D1TSP / D1Games > 4) {
            eligibilityStatus = "Not eligible for D3. Past D1 players who averaged more than 4 TSP may be allowed on a case-by-case basis.";
        } else if (D3TSP / D3Games >= 15.0) {
            eligibilityStatus = "You are 1 point in D3.";
        } else if (D2TSP / D1Games >= 8) {
            eligibilityStatus = "You are 1 point in D3.";
        } else {
            eligibilityStatus = "Eligible for D3.";
        }
    }

    // Show the eligibility result in the result div
    resultText += `\n${eligibilityStatus}\n`;

    // Show the result in the result div
    document.getElementById("result").innerText = resultText;
});

// Show/hide TSP and Games fields based on the player's selected divisions
document.querySelectorAll('input[name="divisionsPlayed"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const d1Played = document.getElementById('d1').checked;
        const d2Played = document.getElementById('d2').checked;
        const d3Played = document.getElementById('d3').checked;

        document.getElementById('D1Fields').style.display = d1Played ? 'block' : 'none';
        document.getElementById('D2Fields').style.display = d2Played ? 'block' : 'none';
        document.getElementById('D3Fields').style.display = d3Played ? 'block' : 'none';
    });
});

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
