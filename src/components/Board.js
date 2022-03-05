import { Component } from "react";
import Square from "./Square";

class Board extends Component {
	// makePossibleLine(square) {
	// 	const indexOfComputerCharacter = square
	// 		.map((v, i) => {
	// 			if (v === this.props.computerCharacter) return i;
	// 			return null;
	// 		})
	// 		.filter((v) => v !== null);

	// 	let result;

	// 	indexOfComputerCharacter.forEach((v, i) => {
	// 		for (const line of this.lines) {
	// 			if (line.includes(v)) {
	// 				const indexOfEmptySquare = line.filter((v) => square[v] === null);
	// 				if (indexOfEmptySquare.length > 1) {
	// 					const index = Math.floor(Math.random() * indexOfEmptySquare.length);
	// 					result = indexOfEmptySquare[index];
	// 					return;
	// 				}
	// 			}
	// 		}
	// 	});

	// 	if (result !== undefined) {
	// 		square[result] = this.props.computerCharacter;
	// 		this.setState({
	// 			computerTurn: !this.state.computerTurn,
	// 			squares: square,
	// 		});
	// 		return true;
	// 	}
	// 	return false;
	// }

	// putCharacterInTheMiddle = (square) => {
	// 	const middle = this.middle.some((v) => square[v] === null);

	// 	if (middle) {
	// 		const index = Math.floor(Math.random() * this.middle.length);

	// 		square[this.middle[index]] = this.props.computerCharacter;

	// 		this.setState({
	// 			computerTurn: !this.state.computerTurn,
	// 			squares: square,
	// 		});

	// 		return true;
	// 	}

	// 	return false;
	// };

	// putCharacterInTheCorner = (square) => {
	// 	const corner = this.corners.some((v) => square[v] === null);

	// 	if (corner) {
	// 		// check which corner is empty
	// 		const emptyCorners = this.corners.filter((v) => square[v] === null);

	// 		const index = Math.floor(Math.random() * emptyCorners.length);

	// 		square[emptyCorners[index]] = this.props.computerCharacter;

	// 		this.setState({
	// 			computerTurn: !this.state.computerTurn,
	// 			squares: square,
	// 		});
	// 		return true;
	// 	}

	// 	return false;
	// };

	// putCharacterInTheEdge = (square) => {
	// 	const edge = this.edges.some((v) => square[v] === null);

	// 	if (edge) {
	// 		// check which edge is empty

	// 		const emptyEdges = this.edges.filter((v) => square[v] === null);

	// 		const index = Math.floor(Math.random() * emptyEdges.length);

	// 		square[emptyEdges[index]] = this.props.computerCharacter;

	// 		this.setState({
	// 			computerTurn: !this.state.computerTurn,
	// 			squares: square,
	// 		});

	// 		return true;
	// 	}

	// 	return false;
	// };

	// preventUserWin = (square) => {
	// 	const userCharacter = this.props.userCharacter;
	// 	let result = null;

	// 	for (const line of this.lines) {
	// 		let inlineCharacters = 0;
	// 		let indexOfNull;

	// 		line.forEach((v) => {
	// 			if (square[v] === userCharacter) {
	// 				inlineCharacters++;
	// 			} else if (square[v] === null) {
	// 				indexOfNull = v;
	// 			}
	// 		});

	// 		if (inlineCharacters === 2 && indexOfNull !== undefined) {
	// 			result = indexOfNull;
	// 			break;
	// 		}
	// 	}

	// 	if (result !== null) {
	// 		square[result] = this.props.computerCharacter;

	// 		this.setState({
	// 			computerTurn: !this.state.computerTurn,
	// 			squares: square,
	// 		});

	// 		return true;
	// 	}

	// 	return false;
	// };

	// stepToWin = (square) => {
	// 	const computerCharacter = this.props.computerCharacter;
	// 	let result = null;

	// 	for (const line of this.lines) {
	// 		let inlineCharacters = 0;
	// 		let indexOfNull;

	// 		line.forEach((v) => {
	// 			if (square[v] === computerCharacter) {
	// 				inlineCharacters++;
	// 			} else if (square[v] === null) {
	// 				indexOfNull = v;
	// 			}
	// 		});

	// 		if (inlineCharacters === 2 && indexOfNull !== undefined) {
	// 			result = indexOfNull;
	// 			break;
	// 		}
	// 	}

	// 	if (result !== null) {
	// 		square[result] = this.props.computerCharacter;

	// 		this.setState({
	// 			computerTurn: !this.state.computerTurn,
	// 			squares: square,
	// 		});

	// 		return true;
	// 	}

	// 	return false;
	// };

	// calculateWinner = (square) => {
	// 	for (let i = 0; i < this.lines.length; i++) {
	// 		let [a, b, c] = this.lines[i];

	// 		if (
	// 			square[a] !== null &&
	// 			square[a] === square[b] &&
	// 			square[a] === square[c]
	// 		) {
	// 			this.setState({
	// 				winner: square[a],
	// 			});
	// 			this.props.handleWinner(square[a]);
	// 			return true;
	// 		}
	// 	}

	// 	return false;
	// };

	// calculateDraw(square) {
	// 	if (!this.state.squares.includes(null)) {
	// 		this.props.handleDraw();
	// 		return true;
	// 	}

	// 	return false;
	// }

	// componentDidUpdate() {
	// 	console.log("did update");
	// 	return this.state.computerTurn ? this.handleComputerTurn() : null;
	// }

	// componentDidMount() {
	// 	console.log("component mounted");
	// 	if (this.props.isComputerTurnFirst) {
	// 		this.setState({
	// 			computerTurn: true,
	// 		});

	// 		this.handleComputerTurn();
	// 	}
	// }

	renderSquare(i) {
		return (
			<Square
				index={i}
				value={this.props.squares[i]}
				key={i}
				onClick={() => this.props.handleSquareClick(i)}
				className={this.props.winnerLine.includes(i) ? "winner-square" : null}
			/>
		);
	}

	render() {
		return (
			<div className="board">
				{this.props.templateSquare.map((value, index) =>
					this.renderSquare(index),
				)}
			</div>
		);
	}
}

export default Board;
