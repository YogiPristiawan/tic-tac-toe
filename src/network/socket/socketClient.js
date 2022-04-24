import env from "react-dotenv";

const { io } = require("socket.io-client");

const createSocket = (opts = {}) => {
	const socket = io(env.SOCKET_URL, opts);

	socket.on("connect", () => {});

	socket.on("connect_error", (reason) => {});

	return socket;
};

export default createSocket;
