function checkEligibility() {
    // Get input values
    const divisionsPlayed = [];
    const checkboxes = document.querySelectorAll('input[name="divisionsPlayed"]:checked');
    checkboxes.forEach(checkbox => divisionsPlayed.push(checkbox.value));

    const divisionPlanned = document.querySelector('input[name="divisionsPlanned"]:checked');
    const TSPD1 = parseFloat(document.getElementById("TSPD1").value) || 0;
    const gamesD1 = parseInt(document.getElementById("gamesD1").value) || 0;
    const TSPD2 = parseFloat(document.getElementById("TSPD2").value) || 0;
    const gamesD2 = parseInt(document.getElementById("gamesD2").value) || 0;
    const TSPD3 = parseFloat(document.getElementById("TSPD3").value) || 0;
    const gamesD3 = parseInt(document.getElementById("gamesD3").value) || 0;

    // Calculate TSP per game for each division
    const TSPPerGameD1 = gamesD1 > 0 ? (TSPD1 / gamesD1).toFixed(1) : 0;
    const TSPPerGameD2 = gamesD2 > 0 ? (TSPD2 / gamesD2).toFixed(1) : 0;
    const TSPPerGameD3 = gamesD3 > 0 ? (TSPD3 / gamesD3).toFixed(1) : 0;

    // Eligibility check based on TSP and the rules you provided
    let result = "";
    
    if (divisionPlanned) {
        const division = divisionPlanned.value;

        // Check if they are eligible for the division they want to play
        if (division === "D1") {
            if (TSPPerGameD1 >= 16.5) {
                result = "Not eligible for D1.";
            } else {
                result = "Eligible for D1.";
            }
        } else if (division === "D2") {
            if (TSPPerGameD2 >= 30) {
                result = "Not eligible for D2.";
            } else if (TSPPerGameD2 >= 16.5) {
                result = "Eligible for D2.";
            } else {
                result = "Not eligible for D2.";
            }
        } else if (division === "D3") {
            if (TSPPerGameD3 >= 20) {
                result = "Not eligible for D3.";
            } else if (TSPPerGameD3 >= 15) {
                result = "Eligible for D3.";
            } else {
                result = "Not eligible for D3.";
            }
        }
    }

    // Show result in the result div
    document.getElementById("result").innerHTML = result;
}
