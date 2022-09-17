import Node from "./modules/node.js";

const grid = document.getElementById("grid");

let rows = 10;
let cols = 10;

let width = 50;
let height = 50;

let nodes = [];

for (let i = 0; i < rows; i++)
{
	if (!nodes[i])
	{
		nodes[i] = [];
	}
	for (let j = 0; j < cols; j++)
	{
		nodes[i][j] = new Node();
	}
}


for (let i = 0; i < nodes.length; i++)
{
	for (let j = 0; j < nodes[i].length; j++)
	{
		const square = document.createElement("div");

		switch (nodes[i][j].status)
		{
			case "filled":
				square.backgroundColor = "blue";
				break;
			case "obstacle":
				square.backgroundColor = "black";
				break;
			case "goal":
				square.backgroundColor = "gold";
				break;
		}
		square.style.position = "absolute";
		square.style.width = `${width - 1}px`;
		square.style.height = `${height - 1}px`;
		square.style.left = `${i * width}px`;
		square.style.top = `${j * height}px`;
		square.style.border = "1px solid black"

		//todo add event listener

		nodes[i][j].htmlElement = square;

		console.log("here");
		grid.appendChild(square);
	}
}

grid.style.width = `${width * rows}px`;
grid.style.height = `${height * cols}px`;
