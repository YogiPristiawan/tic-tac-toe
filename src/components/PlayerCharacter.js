const PlayerCharacter = (props) => {
	return (
		<div className="player bg-dark">
			<div className="player-character">
				<span>🙍‍♂️ You</span>
				<span> : </span>
				<img
					src={props.userCharacter === "X" ? "/img/x.svg" : "/img/o.svg"}
					alt=""
				/>
			</div>
			<div className="player-character mt-2">
				<span>🤖 AI</span>
				<span> : </span>
				<img
					src={props.computerCharacter === "X" ? "/img/x.svg" : "/img/o.svg"}
					alt=""
				/>
			</div>
		</div>
	);
};

export default PlayerCharacter;
