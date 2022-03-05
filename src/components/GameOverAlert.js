import Lottie from "lottie-react";
import tongueOut from "../lotties/tongue-out.json";
import trophy from "../lotties/trophy.json";
import thumbsUp from "../lotties/thumbs-up.json";

const GameOverAlert = (props) => {
	const thumbsUpStyle = {
		height: "40%",
		width: "40%",
		position: "absolute",
		top: 18,
		left: "50%",
		transform: "translateX(-50%)",
	};

	const trophyStyle = {
		height: "40%",
		width: "40%",
		position: "absolute",
		top: "5%",
		left: "50%",
		transform: "translateX(-50%)",
	};

	const tongueOutStyle = {
		height: "30%",
		width: "30%",
		position: "absolute",
		top: "10%",
		left: "50%",
		transform: "translateX(-50%)",
	};

	return (
		<div className="overlay">
			<div className="game-over-card">
				{props.isDraw ? (
					<Lottie animationData={thumbsUp} style={thumbsUpStyle} loop />
				) : props.isUserWin ? (
					<Lottie animationData={trophy} style={trophyStyle} loop />
				) : (
					<Lottie animationData={tongueOut} style={tongueOutStyle} loop />
				)}

				<div className="game-result-text">
					{props.isDraw ? (
						<h2>Draw !</h2>
					) : props.isUserWin ? (
						<h2>You Win !</h2>
					) : (
						<h2>Computer Win !</h2>
					)}
					<div className="game-over-option">
						<button
							className="game-over-button"
							onClick={() => props.handleClick()}
						>
							OK
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameOverAlert;
