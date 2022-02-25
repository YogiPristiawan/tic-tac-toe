function Square(props) {
	return (
		<div className="square" onClick={() => props.onClick(props.index)}>
			{props.value}
		</div>
	);
}

export default Square;
