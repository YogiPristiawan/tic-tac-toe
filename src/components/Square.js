import OChar from "./OChar";
import XChar from "./XChar";

const Square = (props) => {
	return (
		<div className="square" onClick={() => props.onClick(props.index)}>
			{props.value === "X" ? <XChar /> : props.value === "O" ? <OChar /> : null}
		</div>
	);
};

export default Square;
