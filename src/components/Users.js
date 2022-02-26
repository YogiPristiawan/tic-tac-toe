import { Component } from "react";

class Users extends Component {
	render() {
		return (
			<div className="users-wrapper overflow-auto">
				<h3 className="my-2">Users Onlline : </h3>
				<ul className="users">
					<li>yogi</li>
					<li>rizal</li>
					<li>pupung</li>
					<li>lorem</li>
				</ul>
			</div>
		);
	}
}

export default Users;
