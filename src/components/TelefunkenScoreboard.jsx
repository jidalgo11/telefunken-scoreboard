import { useState } from "react";
import Header from "./Header";
import Scoreboard from "./Scoreboard";
import Leaderboard from "./Leaderboard";

const testPlayers = [
	{
		id: 1,
		name: "Bess",
		r1: 0,
		r2: 0,
		r3: 0,
		r4: 0,
		r5: 0,
		r6: 0,
		r7: 0,
		score: 0,
		buys: 12,
	},
	{
		id: 2,
		name: "Mama",
		r1: 0,
		r2: 0,
		r3: 0,
		r4: 0,
		r5: 0,
		r6: 0,
		r7: 0,
		score: 0,
		buys: 12,
	},
	{
		id: 3,
		name: "Pop",
		r1: 0,
		r2: 0,
		r3: 0,
		r4: 0,
		r5: 0,
		r6: 0,
		r7: 0,
		score: 0,
		buys: 12,
	},
];

const TelefunkenScoreboard = () => {
	const [players, setPlayers] = useState(testPlayers);

	function handleAddPlayer() {}
	return (
		<>
			<Header onAddPlayer={handleAddPlayer} />
			<div className="container game-wrapper">
				<Scoreboard players={players} />
				<Leaderboard players={players} />
			</div>
		</>
	);
};

export default TelefunkenScoreboard;
