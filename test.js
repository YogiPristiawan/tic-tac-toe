const corners = [0, 2, 6, 8];
const edge = [1, 3, 5, 7];
const middle = [4];

const square = [null, null, null, null, null, null, null, null, null];

const result = middle.some((v) => {
	return square[v] !== null;
});

console.log(result);
