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
import PlayGame from "./PlayGame";
import GameOverAlert from "./GameOverAlert";
import PlayerTurn from "./PlayerTurn";
import InputUsernameAlert from "./InputUsernameAlert";
import createSocket from "../network/socket/socketClient";

class Game extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userCharacter: null,
			computerCharacter: null,
			winner: null,
			draw: null,
			gameOver: false,
			showInputCharacterAlert: false,
			showChooseCharacterAlert: false,
			showHowTheGameStartsAlert: false,
			computerTurn: null,
			squares: Array(9).fill(null),
			availableSquares: Array(9).fill(true),
			nextChar: null,
			gameStart: false,
			winnerLine: [],

			username: "",
			currentUser: [],
			validateInputUsernameError: null,
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
		if (!this.state.gameStart) {
			this.setState({
				showInputCharacterAlert: true,
			});

			return;
		}
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
					winnerLine: this.lines[i],
					showGameOverAlert: true,
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
				showGameOverAlert: true,
			});
			return true;
		}

		return false;
	}

	handleInputUsernameSubmit = (username) => {
		if (username !== undefined) {
			this.socket.disconnect();
			this.socket.io.opts.query.username = username;
			this.socket.connect();

			this.socket.on("connect", () => {
				this.setState({
					showInputCharacterAlert: false,
					showChooseCharacterAlert: true,
				});
			});

			this.socket.on("connect_error", (e) => {
				this.setState({
					validateInputUsernameError: e.message,
				});
			});
		}
	};

	handleFormInputUsernameChange = (e) => {
		e.preventDefault();
		if (e.target.value.match(/[^@\w]/gi)) {
			this.setState({
				username: e.target.value,
				validateInputUsernameError:
					"Username can only contain @, letters, numbers, and underscores.",
			});
		} else if (e.target.value.length > 15) {
			this.setState({
				username: e.target.value,
				validateInputUsernameError:
					"Username cannot be longer than 15 characters",
			});
		} else {
			this.setState({
				username: e.target.value,
				validateInputUsernameError: null,
			});
		}
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
				showChooseCharacterAlert: false,
				showHowTheGameStartsAlert: true,
			});
		}
	};

	handleHowGameStartsClick = (player) => {
		if (player === "computer") {
			this.setState({
				computerTurn: true,
				gameStart: true,
				showHowTheGameStartsAlert: false,
			});
			return;
		} else if (player === "user") {
			this.setState({
				computerTurn: false,
				gameStart: true,
				showHowTheGameStartsAlert: false,
			});
		}
	};

	handleDismisGameOverAlert = () => {
		this.setState({
			showGameOverAlert: false,
		});
	};

	handlePlayGame() {
		this.setState({
			showInputCharacterAlert: true,
		});
	}

	handlePlayAgain() {
		this.setState({
			gameOver: false,
			squares: Array(9).fill(null),
			winner: null,
			draw: null,
			showChooseCharacterAlert: true,
			winnerLine: [],
		});
	}

	componentDidMount() {
		this.socket = createSocket({
			query: {},
		});

		this.socket.on("userConnected", (args) => {
			this.setState({
				currentUser: args.currentUser,
			});
		});

		this.socket.on("userDisconnected", (args) => {
			this.setState({
				currentUser: args.currentUser,
			});
		});
	}

	componentDidUpdate() {
		if (this.state.computerTurn) {
			if (this.state.squares.filter((v) => v !== null).length === 0) {
				setTimeout(() => {
					this.handleComputerTurn();
				}, 500);
			} else {
				const randomTime = Math.floor(Math.random() * (2000 - 300 + 300) + 300);
				setTimeout(() => {
					this.handleComputerTurn();
				}, randomTime);
			}
		}
		return;
	}

	render() {
		return (
			<Fragment>
				{this.state.showInputCharacterAlert ? (
					<InputUsernameAlert
						username={this.state.username}
						handleSubmit={(username) =>
							this.handleInputUsernameSubmit(username)
						}
						validateInputUsernameError={this.state.validateInputUsernameError}
						handleFormInputUsernameChange={this.handleFormInputUsernameChange}
					/>
				) : null}
				{this.state.showGameOverAlert ? (
					<GameOverAlert
						isDraw={this.state.draw}
						isUserWin={this.state.winner === this.state.userCharacter}
						handleClick={() => this.handleDismisGameOverAlert()}
					/>
				) : null}
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
					<Inspire shouldUpdate={!this.state.computerTurn} />
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
						<Users currentUser={this.state.currentUser} />
					</div>
					<div className="main">
						<Board
							squares={this.state.squares}
							handleSquareClick={(i) => this.handleSquareClick(i)}
							templateSquare={this.templateSquare}
							winnerLine={this.state.winnerLine}
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

							{this.state.gameStart && !this.state.gameOver ? (
								<PlayerTurn
									playerTurn={this.state.computerTurn ? "computer" : "user"}
								/>
							) : null}

							{!this.state.gameStart ? (
								<PlayGame onClick={() => this.handlePlayGame()} />
							) : this.state.gameOver ? (
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
