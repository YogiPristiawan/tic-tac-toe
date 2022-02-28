const PlayerCharacter = (props) => {
	return (
		<div className="player-character p-4">
			<div className="d-flex">
				<span>YOU :</span>
				<img
					src={props.userCharacter === "X" ? "/img/x.svg" : "/img/o.svg"}
					alt=""
				/>
			</div>
			<div className="d-flex">
				<span>Computer :</span>
				<img
					src={props.computerCharacter === "X" ? "/img/x.svg" : "/img/o.svg"}
					alt=""
				/>
			</div>
		</div>
	);
};

export default PlayerCharacter;
