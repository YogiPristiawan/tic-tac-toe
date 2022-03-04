import { Component, Fragment } from "react";
import Board from "./Board";
import Users from "./Users";
import Inspire from "./Inspire";
import ChooseCharacterAlert from "./ChooseCharacterAlert";
import PlayerCharacter from "./PlayerCharacter";
import Winner from "./Winner";
import WinnerSmall from "./WinnerSmall";
import HowTheGameStartsAlert from "./HowTheGameStartsAlert";

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			draw: false,
			computerCharacter: null,
			userCharacter: null,
			gameStart: false,
			isComputerTurnFirst: null,
			showChooseCharacterAlert: true,
			showHowTheGameStartsAlert: false,
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

	handleChooseCharacterClick = (character) => {
		if (character === "X") {
			this.setState({
				userCharacter: "X",
				computerCharacter: "O",
				showChooseCharacterAlert: false,
				showHowTheGameStartsAlert: true,
			});
		} else if (character === "O") {
			this.setState({
				userCharacter: "O",
				computerCharacter: "X",
				showHowTheGameStartsAlert: true,
				showChooseCharacterAlert: false,
			});
		}
	};

	handleHowGameStartsClick = (player) => {
		if (player === "computer") {
			this.setState({
				isComputerTurnFirst: true,
				showHowTheGameStartsAlert: false,
				gameStart: true,
			});
		} else if (player === "user") {
			this.setState({
				isComputerTurnFirst: false,
				showHowTheGameStartsAlert: false,
				gameStart: true,
			});
		}
	};

	renderBoard = () => {
		return (
			<Board
				calculateWinner={this.calculateWinner}
				handleWinner={this.handleWinner}
				handleDraw={this.handleDraw}
				computerCharacter={this.state.computerCharacter}
				userCharacter={this.state.userCharacter}
				isComputerTurnFirst={this.state.isComputerTurnFirst}
			/>
		);
	};
	render() {
		return (
			<Fragment>
				{this.state.showChooseCharacterAlert ? (
					<ChooseCharacterAlert
						handleClick={(character) =>
							this.handleChooseCharacterClick(character)
						}
					/>
				) : this.state.showHowTheGameStartsAlert ? (
					<HowTheGameStartsAlert
						handleClick={(player) => this.handleHowGameStartsClick(player)}
					/>
				) : null}

				<div className="container">
					<Inspire />
				</div>
				<div className="row">
					<div className="bg-dark users-container">
						<Winner
							winner={
								this.state.winner
									? this.state.winner === this.state.computerCharacter
										? "COMPUTER"
										: "YOU"
									: null
							}
							draw={this.state.draw ? true : false}
						/>
						<Users />
					</div>
					<div className="main">
						{this.state.gameStart ? (
							<Board
								calculateWinner={this.calculateWinner}
								handleWinner={this.handleWinner}
								handleDraw={this.handleDraw}
								computerCharacter={this.state.computerCharacter}
								userCharacter={this.state.userCharacter}
								isComputerTurnFirst={this.state.isComputerTurnFirst}
							/>
						) : null}

						<div className="game-info">
							<PlayerCharacter
								computerCharacter={this.state.computerCharacter}
								userCharacter={this.state.userCharacter}
							/>

							<WinnerSmall
								winner={
									this.state.winner
										? this.state.winner === this.state.computerCharacter
											? "COMPUTER"
											: "YOU"
										: null
								}
								draw={this.state.draw ? true : false}
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Game;
