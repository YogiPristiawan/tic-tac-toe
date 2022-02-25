import { Component, Fragment } from "react";
import Square from "./Square";
import Winner from "./Winner";

class Board extends Component {
	constructor(props) {
		super(props);

		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
			winner: null,
		};

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
	}

	checkWinner(square) {
		for (let i = 0; i < this.lines.length; i++) {
			let [a, b, c] = this.lines[i];

			if (
				square[a] !== null &&
				square[a] === square[b] &&
				square[a] === square[c]
			) {
				return square[a];
			}
		}

		return null;
	}

	handleSquareClick(i) {
		let square = this.state.squares.slice();
		if (square[i] !== null || this.checkWinner(square)) {
			return;
		}

		this.state.xIsNext ? (square[i] = "X") : (square[i] = "O");

		this.setState({
			xIsNext: !this.state.xIsNext,
			squares: square,
			squareIndex: i,
		});
	}

	renderSquare(i) {
		return (
			<Square
				index={i}
				value={this.state.squares[i]}
				key={i}
				onClick={() => this.handleSquareClick(i)}
			/>
		);
	}

	render() {
		const templateSquare = new Array(9).fill(null);
		return (
			<>
				<div className="board">
					{templateSquare.map((value, index) => this.renderSquare(index))}
				</div>
				{this.checkWinner(this.state.squares) ? (
					<Winner winner={this.checkWinner(this.state.squares)} />
				) : null}
			</>
		);
	}
}

export default Board;
