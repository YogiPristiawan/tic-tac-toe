import Lottie from "lottie-react";
import boredHand from "../lotties/bored-hand.json";

const PlayerTurn = (props) => {
	const boredHandStyle = {
		width: 80,
		heigth: 80,
		position: "absolute",
		left: "-5%",
		top: "50%",
		transform: "translateY(-50%)",
	};
	return (
		<div className="player-turn bg-dark">
			{props.playerTurn === "computer" ? (
				<>
					<Lottie animationData={boredHand} style={boredHandStyle} loop />
					<div className="player-turn-text">
						<p>Thinking...</p>
					</div>
				</>
			) : (
				<p>👉 You Turn !</p>
			)}
		</div>
	);
};

export default PlayerTurn;
