import { useState } from "react";

const Scorecard = ({ player }) => {
	const [r1, setR1] = useState("");
	const [r2, setR2] = useState("");
	const [r3, setR3] = useState("");
	const [r4, setR4] = useState("");
	const [r5, setR5] = useState("");
	const [r6, setR6] = useState("");
	const [r7, setR7] = useState("");

	return (
		<div className="player-scorecard">
			<div className="player-name">
				<h2>{player.name}</h2>
			</div>
			<div className="scores">
				<label>Round 1</label>
				<input
					type="text"
					value={r1}
					onChange={(e) => setR1(Number(e.target.value))}
				/>

				<label>Round 2</label>
				<input
					type="text"
					value={r2}
					onChange={(e) => setR2(Number(e.target.value))}
				/>

				<label>Round 3</label>
				<input
					type="text"
					value={r3}
					onChange={(e) => setR3(Number(e.target.value))}
				/>

				<label>Round 4</label>
				<input
					type="text"
					value={r4}
					onChange={(e) => setR4(Number(e.target.value))}
				/>

				<label>Round 5</label>
				<input
					type="text"
					value={r5}
					onChange={(e) => setR5(Number(e.target.value))}
				/>

				<label>Round 6</label>
				<input
					type="text"
					value={r6}
					onChange={(e) => setR6(Number(e.target.value))}
				/>

				<label>Round 7</label>
				<input
					type="text"
					value={r7}
					onChange={(e) => setR7(Number(e.target.value))}
				/>
			</div>
			<div className="buys">
				<input type="checkbox" />
				<input type="checkbox" />
				<input type="checkbox" />
				<input type="checkbox" />
				<input type="checkbox" />
				<input type="checkbox" />
				<input type="checkbox" />
				<input type="checkbox" />
				<input type="checkbox" />
				<input type="checkbox" />
				<input type="checkbox" />
				<input type="checkbox" />
			</div>
		</div>
	);
};

export default Scorecard;
