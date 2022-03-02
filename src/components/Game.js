import { Component, Fragment } from "react";
import Board from "./Board";
import Users from "./Users";
import Inspire from "./Inspire";
import ChooseCharacterAlert from "./ChooseCharacterAlert";
import PlayerCharacter from "./PlayerCharacter";
import Winner from "./Winner";
import WinnerSmall from "./WinnerSmall";

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			draw: false,
			computerCharacter: null,
			userCharacter: null,
			isComputerTurnFirst: false,
			showChooseCharacterAlert: true,
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
			});
		} else if (character === "O") {
			this.setState({
				userCharacter: "O",
				computerCharacter: "X",
				showChooseCharacterAlert: false,
			});
		}
	};

	componentDidMount() {
		setTimeout(() => {}, 2000);
	}

	render() {
		return (
			<Fragment>
				{this.state.showChooseCharacterAlert ? (
					<ChooseCharacterAlert
						handleClick={(character) =>
							this.handleChooseCharacterClick(character)
						}
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
						<Board
							calculateWinner={this.calculateWinner}
							handleWinner={this.handleWinner}
							handleDraw={this.handleDraw}
							computerCharacter={this.state.computerCharacter}
							userCharacter={this.state.userCharacter}
							isComputerTurnFirst={this.state.isComputerTurnFirst}
						/>
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
