import Node from "./modules/node.js";

let rows = 5;
let cols = 5;

let width = 100;
let height = 100;

let nodes = [];

for (let i = 0; i < rows; i++)
{
	for (let j = 0; j < cols; j++)
	{
		nodes[i][j] = new Node();
	}
}

