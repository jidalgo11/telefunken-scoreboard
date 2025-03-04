import FormAddPlayer from "./FormAddPlayer";

const Header = ({ onAddPlayer }) => {
	return (
		<header>
			<div className="container header-container">
				<div className="logo">
					<h1>Telefunken</h1>
					<span>Scoreboard</span>
				</div>
				<FormAddPlayer onAddPlayer={onAddPlayer} />
			</div>
		</header>
	);
};

export default Header;
