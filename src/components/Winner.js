import { Component } from "react";

class Winner extends Component {
	componentDidMount() {
		alert("Winner" + this.props.winner);
	}

	render() {
		return <div>Winner {this.props.winner}</div>;
	}
}

export default Winner;
