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

    if (D1Games > 0) {
        totalGames += D1Games;
        totalTSP += D1TSP;
        resultText += `D1: ${D1TSP / D1Games} points/game\n`;
    }

    if (D2Games > 0) {
        totalGames += D2Games;
        totalTSP += D2TSP;
        resultText += `D2: ${D2TSP / D2Games} points/game\n`;
    }

    if (D3Games > 0) {
        totalGames += D3Games;
        totalTSP += D3TSP;
        resultText += `D3: ${D3TSP / D3Games} points/game\n`;
    }

    const averageTSP = totalTSP / totalGames;
    resultText += `Average TSP per game: ${averageTSP.toFixed(1)}\n`;

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
