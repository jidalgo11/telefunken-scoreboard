"use strict";

const d = document;

const playerNameInput = d.getElementById("playerNameInput");
const addPlayerButton = d.getElementById("addPlayerButton");
const resetScoreboardButton = d.getElementById("resetScoreboardButton");

function createPlayerElement(player, playerId) {
  const playerDiv = d.createElement("div");
  const playerNameDiv = d.createElement("div");
  const buysDiv = d.createElement("div");
  const scoreDiv = d.createElement("div");

  playerDiv.classList.add("player-scorecard");
  playerDiv.dataset.playerId = playerId;
  playerNameDiv.classList.add("player-name");
  buysDiv.classList.add("buys");
  scoreDiv.classList.add("scores");

  const nameElement = d.createElement("h2");
  nameElement.textContent = player.name;

  playerNameDiv.appendChild(nameElement);
  playerDiv.appendChild(playerNameDiv);

  // Create input fields for each round
  const roundInputs = [];
  const roundLabels = ["1/3", "2/3", "1/4", "2/4", "1/5", "2/5", "Escalera"];
  for (let i = 1; i <= 7; i++) {
    const roundInput = d.createElement("input");
    const roundInputLabels = d.createElement("label");
    roundInput.type = "number";
    roundInput.value = player[`round${i}`] || 0; // Initialize with player's score for the round or 0
    roundInput.dataset.playerId = playerId;
    roundInput.dataset.roundNumber = i;
    roundInput.addEventListener("change", function () {
      // Update the player's score for the corresponding round
      player[`round${i}`] = parseInt(this.value) || 0;
      // Recalculate the total score
      const totalScore = calculateTotalScore(player);
      // Update the player's score property
      player.score = totalScore;
      // Update the scoreboard
      updateScoreboard();
      savePlayerData(players);
    });
    roundInputLabels.textContent = `Round ${i} - ${roundLabels[i - 1]}`;
    scoreDiv.appendChild(roundInputLabels);
    scoreDiv.appendChild(roundInput);
    playerDiv.appendChild(scoreDiv);
    roundInputs.push(roundInput);
  }

  const buysElement = d.createElement("h3");
  buysElement.textContent = `Buys`;
  buysDiv.appendChild(buysElement);
  playerDiv.appendChild(buysDiv);

  for (let i = 0; i < 12; i++) {
    const pepasElement = d.createElement("input");
    pepasElement.type = "checkbox";
    pepasElement.checked = i < player.buys;
    buysDiv.appendChild(pepasElement);
    pepasElement.dataset.playerId = playerId;
    pepasElement.addEventListener("click", function () {
      if (!this.checked) {
        player.buys -= 1;
      } else {
        player.buys += 1;
      }
      updateScoreboard();
      savePlayerData(players);
    });
  }

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

function displayLeaderboard(players) {
  const container = d.getElementById("leaderboard");

  // Clear previous scoreboard
  container.innerHTML = "";

  if (players.length > 0) {
    const scoreboardHeading = d.createElement("h2");
    scoreboardHeading.classList.add("leaderboard-heading");
    scoreboardHeading.textContent = "Leaderboard";
    container.appendChild(scoreboardHeading);
  }

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

function displayScoreboard(players) {
  const container = d.getElementById("scoreboard");
  container.innerHTML = ""; // Clear previous leaderboard

  const sortedPlayers = players;

  sortedPlayers.forEach((player, i) => {
    const playerElement = createPlayerElement(player, i + 1);
    container.appendChild(playerElement);
  });
}

function updateLeaderboard() {
  displayScoreboard(players);
}

function updateScoreboard() {
  displayScoreboard(players);
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
    resetScoreboardButton.classList.remove("hidden");
  } else {
    alert("Please enter a player name");
  }
});

if (playerNameInput) {
  playerNameInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addPlayerButton.click();
    }
  });
}

// Initial player data
let players = [];
const storedPlayers = localStorage.getItem("players");
if (storedPlayers) {
  players = JSON.parse(storedPlayers);
} else {
  players = [];
}

// Initial display of leaderboard
displayScoreboard(players);
displayLeaderboard(players);
if (players.length > 0) {
  resetScoreboardButton.classList.remove("hidden");
}

// Add event listeners to input fields representing scores
function addScoreChangeListeners() {
  const scoreInputs = d.querySelectorAll(".scores input");
  scoreInputs.forEach((input) => {
    input.addEventListener("change", function () {
      let playerId = parseInt(this.dataset.playerId);
      let roundNumber = parseInt(this.dataset.roundNumber);
      let score = parseInt(this.value);

      let storedPlayers = JSON.parse(localStorage.getItem("players"));

      // Update the score for the corresponding round in storedPlayers
      storedPlayers[playerId - 1][`round${roundNumber}`] = score;

      // Save the updated data to localStorage
      localStorage.setItem("players", JSON.stringify(storedPlayers));

      // Update the scoreboard
      updateScoreboard();
    });
  });
}

resetScoreboardButton.addEventListener("click", function () {
  const confirmation = confirm(
    "Are you sure you want to reset the scoreboard?"
  );
  if (confirmation) {
    localStorage.removeItem("players");
    resetScoreboardButton.classList.add("hidden");
    location.reload();
  }
});

addScoreChangeListeners();
