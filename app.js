// Event listener for the checkbox changes
document.querySelectorAll('input[name="divisionsPlayed"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', toggleDivisionFields);
});

function toggleDivisionFields() {
    // Get the checkbox values
    const d1Played = document.getElementById('d1').checked;
    const d2Played = document.getElementById('d2').checked;
    const d3Played = document.getElementById('d3').checked;

    // Show or hide input fields based on checkbox selection
    document.getElementById('d1Fields').style.display = d1Played ? 'block' : 'none';
    document.getElementById('d2Fields').style.display = d2Played ? 'block' : 'none';
    document.getElementById('d3Fields').style.display = d3Played ? 'block' : 'none';
}

function checkEligibility() {
    // Get user inputs from checkboxes and text fields
    const d1TSP = parseFloat(document.getElementById('TSPD1').value) || 0;
    const d1Games = parseInt(document.getElementById('gamesD1').value) || 0;

    const d2TSP = parseFloat(document.getElementById('TSPD2').value) || 0;
    const d2Games = parseInt(document.getElementById('gamesD2').value) || 0;

    const d3TSP = parseFloat(document.getElementById('TSPD3').value) || 0;
    const d3Games = parseInt(document.getElementById('gamesD3').value) || 0;

    // Eligibility rules
    let resultMessage = "";

    // Check eligibility for each division based on TSP and games played
    const d1Points = d1Games > 0 ? (d1TSP / d1Games).toFixed(1) : 0;
    const d2Points = d2Games > 0 ? (d2TSP / d2Games).toFixed(1) : 0;
    const d3Points = d3Games > 0 ? (d3TSP / d3Games).toFixed(1) : 0;

    // Eligibility logic based on rules
    if (d1Points >= 16.5) {
        resultMessage += "You are not eligible for D2 due to your D1 TSP.\n";
    } else if (d1Points >= 11.5) {
        resultMessage += "You are a point in D2.\n";
    }

    if (d2Points >= 30.0) {
        resultMessage += "You are not eligible for D2 due to your D2 TSP.\n";
    } else if (d2Points >= 16.5) {
        resultMessage += "You are a point in D3.\n";
    }

    if (d3Points >= 20.0) {
        resultMessage += "You are not eligible for D3 due to your D3 TSP.\n";
    } else if (d3Points >= 15.0) {
        resultMessage += "You are a point in D3.\n";
    }

    // Output the result message
    document.getElementById('result').textContent = resultMessage;
}

// Call the toggle function initially to set correct visibility for input fields
toggleDivisionFields();
