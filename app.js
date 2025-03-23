document.getElementById("playerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get selected divisions played
    const divisionsPlayed = [];
    document.querySelectorAll('input[name="divisionsPlayed"]:checked').forEach(checkbox => {
        divisionsPlayed.push(checkbox.value);
    });

    const note = document.getElementById('note');
    if (divisionsPlayed.length > 0) {
        note.style.display = 'block'; // Show the note if any division is selected
    } else {
        note.style.display = 'none'; // Hide the note if no division is selected
    }

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
        resultText += `D1: ${(D1TSP / D1Games).toFixed(1)} TSP\n`;
    }

    if (D2Games > 0) {
        totalGames += D2Games;
        totalTSP += D2TSP;
        resultText += `D2: ${(D2TSP / D2Games).toFixed(1)} TSP\n`;
    }

    if (D3Games > 0) {
        totalGames += D3Games;
        totalTSP += D3TSP;
        resultText += `D3: ${(D3TSP / D3Games).toFixed(1)} TSP\n`;
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
