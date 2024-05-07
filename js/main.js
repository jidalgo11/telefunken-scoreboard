"use strict";

const d = document;

const playerNameInput = d.getElementById("playerNameInput");
const addPlayerButton = d.getElementById("addPlayerButton");

function createPlayerElement(player) {
  const playerDiv = d.createElement("div");
  const playerNameDiv = d.createElement("div");
  const buysDiv = d.createElement("div");
  const scoreDiv = d.createElement("div");

  playerDiv.classList.add("player");
  playerNameDiv.classList.add("player-name");
  buysDiv.classList.add("buys");
  scoreDiv.classList.add("scores");

  const nameElement = d.createElement("h2");
  nameElement.textContent = player.name;

  playerNameDiv.appendChild(nameElement);
  playerDiv.appendChild(playerNameDiv);

  // Create input fields for each round
  const roundInputs = [];
  for (let i = 1; i <= 7; i++) {
    const roundInput = d.createElement("input");
    roundInput.type = "number";
    roundInput.value = player[`round${i}`] || 0; // Initialize with player's score for the round or 0
    roundInput.addEventListener("change", function () {
      // Update the player's score for the corresponding round
      player[`round${i}`] = parseInt(this.value) || 0;
      // Recalculate the total score
      const totalScore = calculateTotalScore(player);
      // Update the player's score property
      player.score = totalScore;
      // Update the scoreboard
      updateScoreboard();
    });
    scoreDiv.appendChild(roundInput);
    playerDiv.appendChild(scoreDiv);
    roundInputs.push(roundInput);
  }

  // Display total score
  const totalScoreElement = d.createElement("h3");
  totalScoreElement.textContent = `Score: ${player.score}`;
  totalScoreElement.classList.add("score");
  scoreDiv.appendChild(totalScoreElement);

  for (let i = 0; i <= 12; i++) {
    const pepasElement = d.createElement("input");
    pepasElement.type = "checkbox";
    buysDiv.appendChild(pepasElement);
  }

  // Display number of buys
  const buysElement = d.createElement("h3");
  buysElement.textContent = `Buys left: ${player.buys}`;
  buysDiv.appendChild(buysElement);
  playerDiv.appendChild(buysDiv);

  return playerDiv;
}

function calculateTotalScore(player) {
  let totalScore = 0;
  for (let i = 1; i <= 7; i++) {
    totalScore += player[`round${i}`] || 0;
  }
  player.score = totalScore;
  return totalScore;
}

function sortPlayersByScore(players) {
  return players
    .slice()
    .sort((a, b) => b.score - a.score)
    .reverse();
}

function displayScoreboard(players) {
  const container = d.getElementById("scoreboard");

  // Clear previous scoreboard
  container.innerHTML = "";

  const scoreboardHeading = d.createElement("h2");
  scoreboardHeading.classList.add("scoreboard-heading");
  scoreboardHeading.textContent = "Leaderboard";
  container.appendChild(scoreboardHeading);

  const sortedPlayers = sortPlayersByScore(players);

  sortedPlayers.forEach((player, i) => {
    const playerDiv = d.createElement("div");
    playerDiv.classList.add("player");

    const playerNameElement = d.createElement("h3");
    playerNameElement.textContent = `${i + 1} ${player.name}`;
    playerDiv.appendChild(playerNameElement);

    const scoreElement = d.createElement("p");
    scoreElement.textContent = `Score: ${player.score}`;
    playerDiv.appendChild(scoreElement);

    const buysElement = d.createElement("p");
    buysElement.textContent = `Buys: ${player.buys}`;
    playerDiv.appendChild(buysElement);

    container.appendChild(playerDiv);
  });
}

function displayLeaderboard(players) {
  const container = d.getElementById("leaderboard");
  container.innerHTML = ""; // Clear previous leaderboard

  const sortedPlayers = players;

  sortedPlayers.forEach((player) => {
    const playerElement = createPlayerElement(player);
    container.appendChild(playerElement);
  });
}

function updateScoreboard() {
  displayScoreboard(players);
}

function updateLeaderboard() {
  displayLeaderboard(players);
}

function savePlayerData(players) {
  localStorage.setItem("players", JSON.stringify(players));
}

addPlayerButton.addEventListener("click", function () {
  const playerName = playerNameInput.value.trim(); // Trim whitespace from input

  if (playerName) {
    // Add a new player with the input name and default score and buys
    const newPlayer = {
      name: playerName,
      round1: 0,
      round2: 0,
      round3: 0,
      round4: 0,
      round5: 0,
      round6: 0,
      round7: 0,
      score: 0,
      buys: 12,
    };
    players.push(newPlayer);
    // Re-generate leaderboard and display it on the webpage
    updateLeaderboard();
    updateScoreboard();
    // Clear the input field
    playerNameInput.value = "";
    // Save the updated player data to localStorage
    savePlayerData(players);
  } else {
    alert("Please enter a player name");
  }
});

// Initial player data
let players = [];
const storedPlayers = localStorage.getItem("players");
if (storedPlayers) {
  players = JSON.parse(storedPlayers);
  console.log(players);
} else {
  players = [
    {
      name: "Mom",
      round1: 0,
      round2: 0,
      round3: 0,
      round4: 0,
      round5: 0,
      round6: 0,
      round7: 0,
      score: 0,
      buys: 12,
    },
    {
      name: "Bess",
      round1: 0,
      round2: 0,
      round3: 0,
      round4: 0,
      round5: 0,
      round6: 0,
      round7: 0,
      score: 0,
      buys: 12,
    },
    {
      name: "Pop",
      round1: 0,
      round2: 0,
      round3: 0,
      round4: 0,
      round5: 0,
      round6: 0,
      round7: 0,
      score: 0,
      buys: 12,
    },
  ];
}
console.log(players);

// Initial display of leaderboard
displayLeaderboard(players);
displayScoreboard(players);
