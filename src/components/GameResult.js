const GameResult = (props) => {
	return (
		<div className="winner">
			<img src="/img/medal.png" alt="medal" />
			<div className="winner-user">
				<div className="border-bottom"></div>
				<span> : </span>
				{props.winner ? `${props.winner}` : props.draw ? "Draw" : null}
			</div>
		</div>
	);
};

export default GameResult;
