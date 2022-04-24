import { Component } from "react";

class Users extends Component {
	render() {
		return (
			<div className="users-wrapper mt-4">
				<h3 className="my-2">Online Users : </h3>
				<ul className="users overflow-auto">
					{this.props.currentUser
						? this.props.currentUser.reverse().map((user) => {
								return user ? <li key={user}>{user}</li> : null;
						  })
						: null}
				</ul>
			</div>
		);
	}
}

export default Users;
