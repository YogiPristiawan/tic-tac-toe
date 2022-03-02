const Winner = (props) => {
	return (
		<div className="winner winner-large">
			<div className="winner-icon">
				<img src="/img/medal.png" alt="medal" />
				Winner :
			</div>
			<div className="winner-user">
				<div className="border-bottom"></div>
				<div className="overflow-auto">
					{props.winner ? `${props.winner}` : props.draw ? "Draw" : null}
				</div>
			</div>
		</div>
	);
};

export default Winner;
