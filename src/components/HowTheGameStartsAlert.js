const HowTheGameStartsAlert = (props) => {
	return (
		<div className="how-the-game-starts-bg">
			<div className="how-the-game-starts-card">
				<h1>How the Game starts?</h1>
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
