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
		this.edges = [1, 3, 5, 7];
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

		if (!this.calculateWinner(this.state.squares))
			return this.calculateDraw(this.state.squares);
	};

	handleComputerTurn = () => {
		let square = this.state.squares;
		console.log("--- COMPUTER TURN ---");

		if (this.stepToWin(square)) {
			console.log("stepToWin");
			if (!this.calculateWinner(this.state.squares))
				return this.calculateDraw(this.state.squares);
		} else if (this.preventUserWin(square)) {
			console.log("preventUserWin");
			if (!this.calculateWinner(this.state.squares))
				return this.calculateDraw(this.state.squares);
		} else if (this.putCharacterInTheMiddle(square)) {
			console.log("putCharacterInTheMiddle");
			if (!this.calculateWinner(this.state.squares))
				return this.calculateDraw(this.state.squares);
		} else if (this.makePossibleLine(square)) {
			console.log("makePossibleLine");
			if (!this.calculateWinner(this.state.squares))
				return this.calculateDraw(this.state.squares);
		} else if (this.putCharacterInTheCorner(square)) {
			console.log("putCharacterInTheCorner");
			if (!this.calculateWinner(this.state.squares))
				return this.calculateDraw(this.state.squares);
		} else if (this.putCharacterInTheEdge(square)) {
			console.log("putCharacterInTheEdge");
			if (!this.calculateWinner(this.state.squares))
				return this.calculateDraw(this.state.squares);
		}
	};

	//console.log(this.makePossibleLine(square));
	makePossibleLine(square) {
		// console.log("make possible line square ", square);
		const indexOfComputerCharacter = square
			.map((v, i) => {
				if (v === this.props.computerCharacter) return i;
				return null;
			})
			.filter((v) => v !== null);

		let result;

		indexOfComputerCharacter.forEach((v, i) => {
			for (const line of this.lines) {
				if (line.includes(v)) {
					const indexOfEmptySquare = line.filter((v) => square[v] === null);
					if (indexOfEmptySquare.length > 1) {
						const index = Math.floor(Math.random() * indexOfEmptySquare.length);
						result = indexOfEmptySquare[index];
						return;
					}
				}
			}
		});

		if (result !== undefined) {
			square[result] = this.props.computerCharacter;
			this.setState({
				computerTurn: !this.state.computerTurn,
				squares: square,
			});
			return true;
		}
		return false;
	}

	putCharacterInTheMiddle = (square) => {
		const middle = this.middle.some((v) => square[v] === null);

		if (middle) {
			const index = Math.floor(Math.random() * this.middle.length);

			square[this.middle[index]] = this.props.computerCharacter;

			this.setState({
				computerTurn: !this.state.computerTurn,
				squares: square,
			});

			return true;
		}

		return false;
	};

	putCharacterInTheCorner = (square) => {
		const corner = this.corners.some((v) => square[v] === null);

		if (corner) {
			// check which corner is empty
			const emptyCorners = this.corners.filter((v) => square[v] === null);

			const index = Math.floor(Math.random() * emptyCorners.length);

			square[emptyCorners[index]] = this.props.computerCharacter;

			this.setState({
				computerTurn: !this.state.computerTurn,
				squares: square,
			});
			return true;
		}

		return false;
	};

	putCharacterInTheEdge = (square) => {
		const edge = this.edges.some((v) => square[v] === null);

		if (edge) {
			// check which edge is empty

			const emptyEdges = this.edges.filter((v) => square[v] === null);

			const index = Math.floor(Math.random() * emptyEdges.length);

			square[emptyEdges[index]] = this.props.computerCharacter;

			this.setState({
				computerTurn: !this.state.computerTurn,
				squares: square,
			});

			return true;
		}

		return false;
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

			if (inlineCharacters === 2 && indexOfNull !== undefined) {
				result = indexOfNull;
				break;
			}
		}

		if (result !== null) {
			square[result] = this.props.computerCharacter;

			this.setState({
				computerTurn: !this.state.computerTurn,
				squares: square,
			});

			return true;
		}

		return false;
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

			if (inlineCharacters === 2 && indexOfNull !== undefined) {
				console.log("masuk ke inline character === 2");
				result = indexOfNull;
				break;
			}
		}

		if (result !== null) {
			square[result] = this.props.computerCharacter;

			this.setState({
				computerTurn: !this.state.computerTurn,
				squares: square,
			});

			return true;
		}

		return false;
	};

	calculateWinner = (square) => {
		console.log("calculate winner");
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
				this.props.handleWinner(square[a]);
				return true;
			}
		}

		return false;
	};

	calculateDraw(square) {
		console.log("calcualte draw");
		if (!this.state.squares.includes(null)) {
			this.props.handleDraw();
			return true;
		}

		return false;
	}

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
