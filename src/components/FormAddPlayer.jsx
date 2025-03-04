import { useState } from "react";
import Button from "./Button";

const FormAddPlayer = ({ onAddPlayer }) => {
	const [playerName, setPlayerName] = useState("");

	function handleSubmit() {
		console.log("hidalgo");
	}

	return (
		<div className="add-player-wrapper">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={playerName}
					onChange={(e) => setPlayerName(e.target.value)}
					placeholder="Enter player name"
				/>
				<Button buttonClass="add-player-button">Add Player</Button>
			</form>
			{/* <button className="hidden">New Game</button> // Todo: functionality for new game */}
		</div>
	);
};

export default FormAddPlayer;
