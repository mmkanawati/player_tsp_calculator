document.addEventListener("DOMContentLoaded", function () {
    // --- SEARCH FUNCTIONALITY ---
    const firstNameSearch = document.getElementById("firstNameSearch");
    const lastNameSearch = document.getElementById("lastNameSearch");
    const resultsDiv = document.getElementById("results");

    let players = [];
    let filteredPlayers = [];
    let currentPage = 0;

    fetch('player_data.json')
        .then(response => response.json())
        .then(data => {
            players = data;

            function displayPlayers() {
                resultsDiv.innerHTML = "";

                filteredPlayers.sort((a, b) => {
                    return a['Season.1'] < b['Season.1'] ? 1 : (a['Season.1'] > b['Season.1'] ? -1 : 0);
                });

                const start = currentPage * 5;
                const end = start + 5;
                const playersToDisplay = filteredPlayers.slice(start, end);

                if (playersToDisplay.length === 0) {
                    resultsDiv.innerHTML = "<p>No players found.</p>";
                    return;
                }

                const table = document.createElement("table");
                const tableHeader = document.createElement("thead");
                const tableBody = document.createElement("tbody");

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

                const paginationDiv = document.getElementById("pagination");
                if (paginationDiv) paginationDiv.remove();

                const paginationButtons = document.createElement("div");
                paginationButtons.id = "pagination";

                if (currentPage > 0) {
                    const prevButton = document.createElement("button");
                    prevButton.textContent = "Previous";
                    prevButton.addEventListener("click", () => {
                        currentPage--;
                        displayPlayers();
                    });
                    paginationButtons.appendChild(prevButton);
                }

                if (end < filteredPlayers.length) {
                    const nextButton = document.createElement("button");
                    nextButton.textContent = "Next";
                    nextButton.addEventListener("click", () => {
                        currentPage++;
                        displayPlayers();
                    });
                    paginationButtons.appendChild(nextButton);
                }

                resultsDiv.appendChild(paginationButtons);
            }

            function filterPlayers() {
                const firstNameInput = firstNameSearch.value.toLowerCase();
                const lastNameInput = lastNameSearch.value.toLowerCase();

                filteredPlayers = players.filter(player => {
                    const firstName = player['First Name'] ? player['First Name'].toLowerCase() : '';
                    const lastName = player['Last Name'] ? player['Last Name'].toLowerCase() : '';
                    return (
                        (firstNameInput === "" || firstName.includes(firstNameInput)) &&
                        (lastNameInput === "" || lastName.includes(lastNameInput))
                    );
                });

                currentPage = 0;
                displayPlayers();
            }

            firstNameSearch?.addEventListener("input", filterPlayers);
            lastNameSearch?.addEventListener("input", filterPlayers);

            displayPlayers(); // Initial call
        })
        .catch(error => {
            console.error('Error loading player data:', error);
            resultsDiv.innerHTML = "<p>Failed to load player data. Please try again later.</p>";
        });

    // --- TSP CALCULATOR FUNCTIONALITY ---
    const divisionCheckboxes = document.querySelectorAll('input[name="divisionsPlayed"]');
    const divisionRadios = document.querySelectorAll('input[name="divisionsPlanned"]');
    const note = document.getElementById("note");

    function toggleFields() {
        document.querySelectorAll('.divisionFields').forEach(div => div.style.display = "none");
        let anyChecked = false;

        divisionCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                document.getElementById(checkbox.value + "Fields").style.display = "block";
                anyChecked = true;
            }
        });

        note.style.display = anyChecked ? "block" : "none";
    }

    divisionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", toggleFields);
    });

    // Optional: add calculation or validation logic here
});
