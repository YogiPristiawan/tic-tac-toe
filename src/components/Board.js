import { Component, Fragment } from "react";
import Square from "./Square";

class Board extends Component {
	constructor(props) {
		super(props);

		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
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
	}

	handleSquareClick(i) {
		let square = this.state.squares;

		if (square[i] !== null) return;

		this.state.xIsNext ? (square[i] = "X") : (square[i] = "O");

		this.setState({
			xIsNext: !this.state.xIsNext,
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
	}

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

	renderSquare(i) {
		return (
			<Square
				index={i}
				value={this.state.squares[i]}
				key={i}
				onClick={() => (!this.state.winner ? this.handleSquareClick(i) : null)}
			/>
		);
	}

	render() {
		console.log("winner ", this.state.winner);
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
