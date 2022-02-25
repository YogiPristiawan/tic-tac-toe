const GameResult = (props) => {
	console.log(props);
	if (props.winner) {
		return <div>Winner: {props.winner}</div>;
	} else if (props.draw) {
		return <div>Draw</div>;
	}
};

export default GameResult;
