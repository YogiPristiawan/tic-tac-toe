const ChooseCharacterAlert = (props) => {
	return (
		<div className="overlay">
			<div className="choose-character-card">
				<h2>Pilih karaktermu!</h2>
				<div className="character">
					<button onClick={() => props.handleClick("X")}>
						<img src="/img/x.svg" alt="" />
					</button>
					<button onClick={() => props.handleClick("O")}>
						<img src="/img/o.svg" alt="" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChooseCharacterAlert;
