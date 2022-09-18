import Node from "./modules/node.js";

const grid = document.getElementById("grid");

let rows = 20;
let cols = 20;

let width = 50;
let height = 50;

let nodes = [];

let currentSelectedType;
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
			square.style.width = `${width}px`;
			square.style.height = `${height}px`;
			square.style.border = "1px solid black";

			nodes[i][j].htmlElement = square;

			square.onmousedown = () =>
			{
				currentSelectedType = nodes[i][j].status;
				nodes[i][j].flip();
			};

			square.onmouseover = (event) =>
			{
				if (event.buttons === 1 && nodes[i][j].status === currentSelectedType)
				{
					nodes[i][j].flip();
				}
			};


			grid.appendChild(square);
		}
	}
	setGridSize();
}

function setGridSize()
{
	grid.style.width = `${width * rows + rows + 1}px`;
	grid.style.height = `${height * cols + cols + 1}px`;
}

console.log(nodes);
