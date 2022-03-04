import { Component, Fragment } from "react";
import Board from "./Board";
import Users from "./Users";
import Inspire from "./Inspire";
import ChooseCharacterAlert from "./ChooseCharacterAlert";
import PlayerCharacter from "./PlayerCharacter";
import Winner from "./Winner";
import WinnerSmall from "./WinnerSmall";
import HowTheGameStartsAlert from "./HowTheGameStartsAlert";
import PlayAgain from "./PlayAgain";

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userCharacter: null,
			computerCharacter: null,
			winner: null,
			draw: null,
			gameOver: false,
			showChooseCharacterAlert: true,
			showHowTheGameStartsAlert: false,
			computerTurn: null,
			squares: Array(9).fill(null),
			availableSquares: Array(9).fill(true),
			nextChar: null,
		};

		this.templateSquare = new Array(9).fill(null);

		this.lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		this.corners = [0, 2, 6, 8];
		this.edges = [1, 3, 5, 7];
		this.middle = [4];
	}

	handleSquareClick = (i) => {
		let square = this.state.squares;

		if (square[i] !== null) return;
		if (this.state.winner) return;
		if (this.state.computerTurn) return;
		square[i] = this.state.userCharacter;

		if (this.calculateWinner(square) || this.calculateDraw(square)) return;

		this.setState({
			computerTurn: !this.state.computerTurn,
			squares: square,
		});
	};

	handleComputerTurn = () => {
		let squares = this.state.squares;
		let bestEvaluate = -Infinity;
		let bestMove = null;
		for (let i = 0; i < this.state.squares.length; i++) {
			if (squares[i] === null) {
				squares[i] = this.state.computerCharacter;
				const evaluate = this.minimax(squares, 0, false);
				squares[i] = null;
				if (bestEvaluate < evaluate) {
					bestEvaluate = evaluate;
					bestMove = i;
				}
			}
		}

		if (bestMove !== null) {
			squares[bestMove] = this.state.computerCharacter;
			this.setState({
				computerTurn: !this.state.computerTurn,
				squares: squares,
			});

			if (!this.calculateWinner(this.state.squares))
				return this.calculateDraw(this.state.squares);
		}

		if (!this.calculateWinner(this.state.squares))
			return this.calculateDraw(this.state.squares);
		return null;
	};
	/**
	 * minmax algorithm
	 */

	calculateResult = (square) => {
		for (let i = 0; i < this.lines.length; i++) {
			let [a, b, c] = this.lines[i];

			if (
				square[a] !== null &&
				square[a] === square[b] &&
				square[a] === square[c]
			) {
				if (square[a] === this.state.computerCharacter) {
					return 1;
				} else if (square[a] === this.state.userCharacter) {
					return -1;
				}
			}
		}

		// draw;
		if (!square.includes(null)) return 0;

		return null;
	};

	minimax = (squares, depth, isMaximizing) => {
		const result = this.calculateResult(squares);
		if (result !== null) return result;
		if (isMaximizing) {
			let maxEvaluate = -Infinity;
			for (let i = 0; i < squares.length; i++) {
				if (squares[i] === null) {
					squares[i] = this.state.computerCharacter;
					let evaluate = this.minimax(squares, depth + 1, false);
					squares[i] = null;
					maxEvaluate = Math.max(evaluate, maxEvaluate);
				}
			}

			return maxEvaluate;
		} else {
			let minEvaluate = Infinity;
			for (let i = 0; i < squares.length; i++) {
				if (squares[i] === null) {
					squares[i] = this.state.userCharacter;
					let evaluate = this.minimax(squares, depth + 1, true);
					squares[i] = null;
					minEvaluate = Math.min(evaluate, minEvaluate);
				}
			}

			return minEvaluate;
		}
	};

	calculateWinner = (square) => {
		for (let i = 0; i < this.lines.length; i++) {
			let [a, b, c] = this.lines[i];

			if (
				square[a] !== null &&
				square[a] === square[b] &&
				square[a] === square[c]
			) {
				this.setState({
					winner: square[a],
					gameOver: true,
				});
				return true;
			}
		}

		return false;
	};

	calculateDraw(square) {
		if (!this.state.squares.includes(null)) {
			this.setState({
				draw: true,
				gameOver: true,
			});
			return true;
		}

		return false;
	}

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
				showChooseCharacterAlert: false,
				showHowTheGameStartsAlert: true,
			});
		}
	};

	handleHowGameStartsClick = (player) => {
		if (player === "computer") {
			this.setState({
				computerTurn: true,
				showHowTheGameStartsAlert: false,
			});
			return;
		} else if (player === "user") {
			this.setState({
				computerTurn: false,
				showHowTheGameStartsAlert: false,
			});
		}
	};

	handlePlayAgain() {
		this.setState({
			gameOver: false,
			squares: Array(9).fill(null),
			winner: null,
			draw: null,
			showChooseCharacterAlert: true,
		});
	}

	componentDidUpdate() {
		return this.state.computerTurn ? this.handleComputerTurn() : null;
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
						<Board
							squares={this.state.squares}
							handleSquareClick={(i) => this.handleSquareClick(i)}
							templateSquare={this.templateSquare}
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
							{this.state.gameOver ? (
								<PlayAgain onClick={() => this.handlePlayAgain()} />
							) : null}
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default Game;
