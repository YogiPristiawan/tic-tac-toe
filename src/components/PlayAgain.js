const PlayAgain = (props) => {
	return (
		<div className="play-again">
			<button className="play-again-button" onClick={props.onClick}>
				Play Again
			</button>
		</div>
	);
};

export default PlayAgain;
