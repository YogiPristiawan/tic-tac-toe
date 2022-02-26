import { Component } from "react";
import Board from "./Board";
import GameResult from "./GameResult";

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			draw: false,
		};
	}

	handleWinner = (winner) => {
		this.setState({
			winner,
		});
		return;
	};

	handleDraw = () => {
		this.setState({
			draw: true,
		});
	};

	render() {
		return (
			<div className="container">
				<Board
					calculateWinner={this.calculateWinner}
					handleWinner={this.handleWinner}
					handleDraw={this.handleDraw}
				/>

				{this.state.winner ? (
					<GameResult winner={this.state.winner} />
				) : this.state.draw ? (
					<GameResult draw={true} />
				) : null}
			</div>
		);
	}
}

export default Game;
