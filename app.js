document.getElementById("playerForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const divisions = document.getElementById("divisions").value.toUpperCase().split(',').map(d => d.trim());

  const D2Games = parseInt(document.getElementById("D2Games").value) || 0;
  const D2TSP = parseInt(document.getElementById("D2TSP").value) || 0;
  const D3Games = parseInt(document.getElementById("D3Games").value) || 0;
  const D3TSP = parseInt(document.getElementById("D3TSP").value) || 0;

  let resultsText = "";

  // Check which divisions they played in and calculate TSP per game for each
  if (divisions.includes("D2")) {
    if (D2Games > 0 && D2TSP > 0) {
      const D2TSPPerGame = (D2TSP / D2Games).toFixed(2);
      resultsText += `D2 TSP per game: ${D2TSPPerGame} <br>`;
    } else {
      resultsText += "Please provide valid D2 season data. <br>";
    }
  }

  if (divisions.includes("D3")) {
    if (D3Games > 0 && D3TSP > 0) {
      const D3TSPPerGame = (D3TSP / D3Games).toFixed(2);
      resultsText += `D3 TSP per game: ${D3TSPPerGame} <br>`;
    } else {
      resultsText += "Please provide valid D3 season data. <br>";
    }
  }

  // Display the result
  document.getElementById("results").innerHTML = resultsText;
});

// Show/hide the forms based on the divisions selected
document.getElementById("divisions").addEventListener("input", function () {
  const divisions = this.value.toUpperCase().split(',').map(d => d.trim());

  if (divisions.includes("D2")) {
    document.getElementById("D2Form").style.display = "block";
  } else {
    document.getElementById("D2Form").style.display = "none";
  }

  if (divisions.includes("D3")) {
    document.getElementById("D3Form").style.display = "block";
  } else {
    document.getElementById("D3Form").style.display = "none";
  }
});
