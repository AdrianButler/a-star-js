import Node from "./modules/node.js";

const grid = document.getElementById("grid");

let rows = 5;
let cols = 5;

let width = 50;
let height = 50;

let nodes = [];

let startingNode;
let goalNode;

let currentSelectedType;
setUpGrid();

const start = () =>
{
	let openList = [];
	let closedList = [];
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
			nodes[i][j] = new Node(i, j);
			const square = document.createElement("div");
			square.style.width = `${width}px`;
			square.style.height = `${height}px`;
			square.style.border = "1px solid black";

			nodes[i][j].htmlElement = square;

			square.oncontextmenu = (event) => event.preventDefault();

			square.onmousedown = (event) =>
			{
				console.log(event.buttons);
				if (event.buttons === 1)
				{
					currentSelectedType = nodes[i][j].status;
					nodes[i][j].flip();
				}
				else if (event.buttons === 2)
				{
					nodes[i][j].setStart(startingNode);
					startingNode = nodes[i][j];
				}
				else if (event.buttons === 4)
				{
					nodes[i][j].setGoal(goalNode);
					goalNode = nodes[i][j];
				}
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
	nodes[0][0].setStart(startingNode) // replace old starting node with new one
	startingNode = nodes[0][0];

	nodes[rows - 1][cols - 1].setGoal(goalNode) // replace old goal node with new one
	goalNode = nodes[rows - 1][cols - 1];
	setGridSize();
}

function setGridSize()
{
	grid.style.width = `${width * rows + rows + 1}px`;
	grid.style.height = `${height * cols + cols + 1}px`;
}
