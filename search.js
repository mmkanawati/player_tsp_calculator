document.addEventListener("DOMContentLoaded", function () {
    const resultDiv = document.getElementById("result");
    const firstNameSearch = document.getElementById("firstNameSearch");
    const lastNameSearch = document.getElementById("lastNameSearch");

    // Fetch the players data (assuming players.json is in the same folder)
    fetch("players.json")
        .then(response => response.json())
        .then(players => {
            // Function to display players
            function displayPlayers(filteredPlayers) {
                resultDiv.innerHTML = ""; // Clear previous results

                if (filteredPlayers.length === 0) {
                    resultDiv.innerHTML = "<p>No players found.</p>";
                    return;
                }

                filteredPlayers.forEach(player => {
                    const playerInfo = document.createElement("p");
                    playerInfo.textContent = `${player['First Name']} ${player['Last Name']} - TSP: ${player.TSP}, Games: ${player.Games}, Division: ${player.Division}`;
                    resultDiv.appendChild(playerInfo);
                });
            }

            // Function to filter players
            function filterPlayers() {
                const firstNameInput = firstNameSearch.value.toLowerCase();
                const lastNameInput = lastNameSearch.value.toLowerCase();

                const filtered = players.filter(player =>
                    (firstNameInput === "" || player['First Name'].toLowerCase().includes(firstNameInput)) &&
                    (lastNameInput === "" || player['Last Name'].toLowerCase().includes(lastNameInput))
                );

                displayPlayers(filtered);
            }

            // Attach event listeners to search inputs
            firstNameSearch.addEventListener("input", filterPlayers);
            lastNameSearch.addEventListener("input", filterPlayers);

            // Initially display all players
            displayPlayers(players);
        })
        .catch(error => console.error("Error loading player data:", error));
});
