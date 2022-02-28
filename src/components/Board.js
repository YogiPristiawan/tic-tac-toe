import { Component } from "react";
import Square from "./Square";

class Board extends Component {
	constructor(props) {
		super(props);

		this.state = {
			squares: Array(9).fill(null),
			computerTurn: false,
			nextChar: null,
			winner: null,
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
		this.edge = [1, 3, 5, 7];
		this.middle = [4];
	}

	handleSquareClick = (i) => {
		let square = this.state.squares;

		if (square[i] !== null) return;

		square[i] = this.props.userCharacter;

		this.setState({
			computerTurn: !this.state.computerTurn,
			squares: square,
		});

		const winner = this.calculateWinner(this.state.squares);

		if (winner) {
			this.setState({
				winner: winner,
			});
			this.props.handleWinner(winner);
			return;
		}

		if (!this.state.squares.includes(null)) {
			this.props.handleDraw();
			return;
		}

		return;
	};

	handleComputerTurn = () => {
		let square = this.state.squares;

		// check if computer can win
		this.stepToWin(square);

		// prevent user win
		this.preventUserWin(square);

		// check any value in middle
		const middle = this.middle.some((v) => square[v] === null);
		if (middle) {
			const index = Math.floor(Math.random() * this.middle.length);

			square[this.middle[index]] = this.props.computerCharacter;

			this.setState({
				computerTurn: !this.state.computerTurn,
				squares: square,
			});
		}

		// if (square[index]) {
		// 	const index = Math.floor(Math.random() * this.state.squares.length);
		// 	let square = this.state.squares;
		// 	square[index] = this.props.computerCharacter;
		// }
		// square[index] = this.props.computerCharacter;

		// this.setState({
		// 	computerTurn: !this.state.computerTurn,
		// 	squares: square,
		// });

		/**
		 * calculate winner and draw
		 */
		const winner = this.calculateWinner(this.state.squares);

		if (winner) {
			this.setState({
				winner: winner,
			});
			this.props.handleWinner(winner);
			return;
		}
		console.log("state handle square click ", this.state);

		if (!this.state.squares.includes(null)) {
			this.props.handleDraw();
			return;
		}
	};

	canPutInTheMiddle = (square) => {
		const index = Math.floor(Math.random() * this.middle.length);

		return square.some((v) => v === null);
	};

	putCharacterInTheMiddle = (square) => {
		const index = Math.floor(Math.random() * this.middle.length);

		square[this.middle[index]] = this.props.computerCharacter;

		this.setState({
			computerTurn: !this.state.computerTurn,
			squares: square,
		});
	};

	canPutInTheCorner = (square) => {
		return square.some((v) => v === null);
	};

	putCharacterInTheCorner = (square) => {
		const index = Math.floor(Math.random() * this.corners.length);

		square[this.corners[index]] = this.props.computerCharacter;

		this.setState({
			computerTurn: !this.state.computerTurn,
			squares: square,
		});
	};

	preventUserWin = (square) => {
		const userCharacter = this.props.userCharacter;
		let result = null;

		for (const line of this.lines) {
			let inlineCharacters = 0;
			let indexOfNull;

			line.forEach((v) => {
				if (square[v] === userCharacter) {
					inlineCharacters++;
				} else if (square[v] === null) {
					indexOfNull = v;
				}
			});

			if (inlineCharacters === 2) {
				result = indexOfNull;
				break;
			}
		}

		if (result !== null) {
			console.log("Computer can prevent user win");
			square[result] = this.props.computerCharacter;

			this.setState({
				computerTurn: !this.state.computerTurn,
				squares: square,
			});
		}
	};

	stepToWin = (square) => {
		const computerCharacter = this.props.computerCharacter;
		let result = null;

		for (const line of this.lines) {
			let inlineCharacters = 0;
			let indexOfNull;

			line.forEach((v) => {
				if (square[v] === computerCharacter) {
					inlineCharacters++;
				} else if (square[v] === null) {
					indexOfNull = v;
				}
			});

			if (inlineCharacters === 2) {
				result = indexOfNull;
				break;
			}
		}

		if (result !== null) {
			console.log(result);
			console.log("Computer can win");
			square[result] = this.props.computerCharacter;

			this.setState({
				computerTurn: !this.state.computerTurn,
				squares: square,
			});
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
				});
				return square[a];
			}
		}

		return false;
	};

	componentDidUpdate() {
		return this.state.computerTurn ? this.handleComputerTurn() : null;
	}

	renderSquare(i) {
		return (
			<Square
				index={i}
				value={this.state.squares[i]}
				key={i}
				onClick={() =>
					!this.state.winner
						? !this.state.computerTurn
							? this.handleSquareClick(i)
							: null
						: null
				}
			/>
		);
	}

	render() {
		return (
			<div className="px-4">
				<div className="board">
					{this.templateSquare.map((value, index) => this.renderSquare(index))}
				</div>
			</div>
		);
	}
}

export default Board;
