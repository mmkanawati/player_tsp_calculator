document.addEventListener("DOMContentLoaded", function () {
    const resultDiv = document.getElementById("result");

    // Fetch player data from the JSON file
    fetch('players.json')
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
                    playerInfo.textContent = `${player["First Name"]} ${player["Last Name"]} - TSP: ${player.tsp}, Games: ${player.games}, Division: ${player.division}`;
                    resultDiv.appendChild(playerInfo);
                });
            }

            // Function to filter players
            function filterPlayers() {
                const firstNameInput = document.getElementById("firstNameSearch").value.toLowerCase();
                const lastNameInput = document.getElementById("lastNameSearch").value.toLowerCase();

                const filtered = players.filter(player =>
                    (firstNameInput === "" || player["First Name"].toLowerCase().includes(firstNameInput)) &&
                    (lastNameInput === "" || player["Last Name"].toLowerCase().includes(lastNameInput))
                );

                displayPlayers(filtered);
            }

            // Attach event listeners to search inputs
            document.getElementById("firstNameSearch").addEventListener("input", filterPlayers);
            document.getElementById("lastNameSearch").addEventListener("input", filterPlayers);

            // Initially display all players
            displayPlayers(players);
        })
        .catch(error => {
            console.error("Error loading player data:", error);
        });
});
