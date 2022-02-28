const corners = [0, 2, 6, 8];
const edge = [1, 3, 5, 7];
const middle = [4];

const square = [null, null, null, null, null, null, null, null, null];

const result = middle.some((v) => {
	return square[v] !== null;
});
const random = Math.random();
// console.log(random);
// console.log(random * edge.length);
// console.log(Math.floor(Math.random() * edge.length));

for (let i = 0; i < 10; i++) {
	console.log("first loop ", i);
	for (let j = 0; j < 5; j++) {
		console.log("second loop ", j);
		if (j === 2) {
			return;
		}
	}
}
