import Scorecard from "./Scorecard";

const Scoreboard = ({ players }) => {
	return (
		<div className="scoreboard">
			{players.map((player) => (
				<Scorecard player={player} key={player.name} />
			))}
		</div>
	);
};

export default Scoreboard;
