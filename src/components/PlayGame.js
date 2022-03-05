const PlayGame = (props) => {
	return (
		<div className="play-game">
			<button className="play-game-button" onClick={props.onClick}>
				<p>Play</p>
				<p>Game !</p>
			</button>
		</div>
	);
};

export default PlayGame;
