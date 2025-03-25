document.addEventListener("DOMContentLoaded", function () {
    const firstNameSearch = document.getElementById("firstNameSearch");
    const lastNameSearch = document.getElementById("lastNameSearch");
    const resultsDiv = document.getElementById("results");
    const searchButton = document.getElementById("searchButton");

    let players = []; // Declare players here to load them once and avoid showing all players initially

    // Fetch player data from a JSON file
    fetch('player_data.json')
        .then(response => response.json())
        .then(data => {
            players = data; // Store the player data

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

                const filteredPlayers = players.filter(player => {
                    // Ensure 'First Name' and 'Last Name' are not null or undefined
                    const firstName = player['First Name'] ? player['First Name'].toLowerCase() : '';
                    const lastName = player['Last Name'] ? player['Last Name'].toLowerCase() : '';

                    return (
                        (firstNameInput === "" || firstName.includes(firstNameInput)) &&
                        (lastNameInput === "" || lastName.includes(lastNameInput))
                    );
                });

                displayPlayers(filteredPlayers); // Display the filtered players after clicking the button
            }

            // Add event listener to the search button
            searchButton.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent form submission if it's in a form
                filterPlayers(); // Call filterPlayers when button is clicked
            });
        })
        .catch(error => {
            console.error('Error loading player data:', error);
            resultsDiv.innerHTML = "<p>Failed to load player data. Please try again later.</p>";
        });
});
