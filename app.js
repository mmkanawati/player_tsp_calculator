document.getElementById("playerForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get selected divisions
  const divisionsPlayed = [];
  document.querySelectorAll('input[name="divisionsPlayed"]:checked').forEach(checkbox => {
    divisionsPlayed.push(checkbox.value);
  });
  const divisionPlanned = document.getElementById("divisionsPlanned").value;

  // Get inputs for each division
  const D1Games = parseInt(document.getElementById("D1Games").value) || 0;
  const D1TSP = parseInt(document.getElementById("D1TSP").value) || 0;
  const D2Games = parseInt(document.getElementById("D2Games").value) || 0;
  const D2TSP = parseInt(document.getElementById("D2TSP").value) || 0;
  const D3Games = parseInt(document.getElementById("D3Games").value) || 0;
  const D3TSP = parseInt(document.getElementById("D3TSP").value) || 0;

  let resultsText = "";
  let totalGames = 0;
  let totalTSP = 0;

  // Handle D1 calculation
  if (divisionsPlayed.includes("D1")) {
    if (D1Games > 0 && D1TSP > 0) {
      const D1TSPPerGame = (D1TSP / D1Games).toFixed(1);
      resultsText += `D1 TSP per game: ${D1TSPPerGame} <br>`;
      totalGames += D1Games;
      totalTSP += D1TSP;
    } else {
      resultsText += "Please provide valid D1 season data. <br>";
    }
  }

  // Handle D2 calculation
  if (divisionsPlayed.includes("D2")) {
    if (D2Games > 0 && D2TSP > 0) {
      const D2TSPPerGame = (D2TSP / D2Games).toFixed(1);
      resultsText += `D2 TSP per game: ${D2TSPPerGame} <br>`;
      totalGames += D2Games;
      totalTSP += D2TSP;
    } else {
      resultsText += "Please provide valid D2 season data. <br>";
    }
  }

  // Handle D3 calculation
  if (divisionsPlayed.includes("D3")) {
    if (D3Games > 0 && D3TSP > 0) {
      const D3TSPPerGame = (D3TSP / D3Games).toFixed(1);
      resultsText += `D3 TSP per game: ${D3TSPPerGame} <br>`;
      totalGames += D3Games;
      totalTSP += D3TSP;
    } else {
      resultsText += "Please provide valid D3 season data. <br>";
    }
  }

  // Calculate total TSP per game
  const totalTSPPerGame = (totalTSP / totalGames).toFixed(1);
  resultsText += `Total TSP per game: ${totalTSPPerGame} <br><br>`;

  // Apply eligibility rules based on TSP and division planned
  let eligibility = "Eligible";

  if (divisionPlanned === "D1" && totalTSPPerGame >= 16.5) {
    eligibility = "Not eligible for D2";
  } else if (divisionPlanned === "D2" && totalTSPPerGame >= 30.0) {
    eligibility = "Not eligible for D2";
  } else if (divisionPlanned === "D3" && totalTSPPerGame >= 20.0) {
    eligibility = "Not eligible for D3";
  }

  // Final eligibility message
  resultsText += `Eligibility for planned division (${divisionPlanned}): ${eligibility}`;
  document.getElementById("results").innerHTML = resultsText;
});

// Show/hide the forms based on the divisions played
document.querySelectorAll('input[name="divisionsPlayed"]').forEach(input => {
  input.addEventListener("change", function () {
    if (document.getElementById("D1").checked) {
      document.getElementById("D1Form").style.display = "block";
    } else {
      document.getElementById("D1Form").style.display = "none";
    }
    if (document.getElementById("D2").checked) {
      document.getElementById("D2Form").style.display = "block";
    } else {
      document.getElementById("D2Form").style.display = "none";
    }
    if (document.getElementById("D3").checked) {
      document.getElementById("D3Form").style.display = "block";
    } else {
      document.getElementById("D3Form").style.display = "none";
    }
  });
});
