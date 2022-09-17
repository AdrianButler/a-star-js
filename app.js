import Node from "./modules/node.js";

const grid = document.getElementById("grid");

let rows = 10;
let cols = 10;

let width = 50;
let height = 50;

let nodes = [];

setUpGrid();

const start = () =>
{

};

function setUpGrid()
{
	for (let i = 0; i < rows; i++)
	{
		if (!nodes[i])
		{
			nodes[i] = [];
		}
		for (let j = 0; j < cols; j++)
		{
			nodes[i][j] = new Node();
			const square = document.createElement("div");
			square.style.position = "absolute";
			square.style.width = `${width - 1}px`;
			square.style.height = `${height - 1}px`;
			square.style.left = `${i * width}px`;
			square.style.top = `${j * height}px`;
			square.style.border = "1px solid black";

			nodes[i][j].htmlElement = square;

			square.onclick = () =>
			{
				const status = nodes[i][j].status;
				const nodeElement = nodes[i][j].htmlElement;
				if (status === "empty")
				{
					nodes[i][j].status = "obstacle";
					nodeElement.style.backgroundColor = "black";
				}
				else if (status === "obstacle")
				{
					nodes[i][j].status = "empty"
					nodeElement.style.backgroundColor = "white";
				}
			};



			grid.appendChild(square);
		}
	}
	setGridSize();
}

function setGridSize()
{
	grid.style.width = `${width * rows}px`;
	grid.style.height = `${height * cols}px`;
}

console.log(nodes);
