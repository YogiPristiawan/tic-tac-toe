import { Component } from "react";
import Board from "./Board";
import GameResult from "./GameResult";
import Users from "./Users";
import Inspire from "./Inspire";

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
				<Inspire />

				<div className="row">
					<GameResult
						winner={this.state.winner ? this.state.winner : null}
						draw={this.state.draw ? true : false}
					/>
					<Board
						calculateWinner={this.calculateWinner}
						handleWinner={this.handleWinner}
						handleDraw={this.handleDraw}
					/>

					<Users />
				</div>
			</div>
		);
	}
}

export default Game;
