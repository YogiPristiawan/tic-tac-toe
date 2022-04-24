import { Component } from "react";
import Square from "./Square";

class Board extends Component {
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
