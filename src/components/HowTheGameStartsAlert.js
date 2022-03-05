const HowTheGameStartsAlert = (props) => {
	return (
		<div className="overlay">
			<div className="how-the-game-starts-card">
				<h2>How the Game starts?</h2>
				<div className="game-start-option">
					<button onClick={() => props.handleClick("user")}>🧑 Me first</button>
					<button onClick={() => props.handleClick("computer")}>
						🤖 Computer first
					</button>
				</div>
			</div>
		</div>
	);
};

export default HowTheGameStartsAlert;
