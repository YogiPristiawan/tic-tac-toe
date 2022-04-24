import { Component } from "react";

class InputUsernameAlert extends Component {
	// handleFormChange = (e) => {
	// 	if (e.target.value.match(/[^@\w]/gi)) {
	// 		this.setState({
	// 			username: e.target.value,
	// 			validationErrorText:
	// 				"Username can only contain @, letters, numbers, and underscores.",
	// 		});
	// 	} else if (e.target.value.length > 15) {
	// 		this.setState({
	// 			username: e.target.value,
	// 			validationErrorText: "Username cannot be longer than 15 characters",
	// 		});
	// 	} else {
	// 		this.setState({
	// 			validationErrorText: null,
	// 			username: e.target.value,
	// 		});
	// 	}
	// };

	handleFormSubmit = (e) => {
		// validate username
		e.preventDefault();

		this.props.handleSubmit(this.props.username);
	};

	render() {
		return (
			<div className="overlay">
				<div className="input-username-card">
					<h2>Input your username</h2>
					<form onSubmit={this.handleFormSubmit}>
						<input
							type="text"
							name="username"
							value={this.props.username}
							onChange={this.props.handleFormInputUsernameChange}
							className="form-control username-input"
							autoComplete="off"
						/>
						<small className="validation-error-text">
							{this.props.validateInputUsernameError}
						</small>
						<button className="submit-button" type="submit">
							OK
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default InputUsernameAlert;
