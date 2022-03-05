const PlayAgain = (props) => {
	return (
		<div className="play-again">
			<button className="play-again-button" onClick={props.onClick}>
				<p>Play</p>
				<p>Again !</p>
			</button>
		</div>
	);
};

export default PlayAgain;
