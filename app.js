import Node from "./modules/node.js";

const grid = document.getElementById("grid");

let rows = 10;
let cols = 10;

let width = 50;
let height = 50;

let nodes = [];

let startingNode;
let goalNode;
let path;

let currentSelectedType;
setUpGrid();

const startButton = document.getElementById("start");
startButton.onclick = start;

const rowsSlider = document.getElementById("rows");
const colsSlider = document.getElementById("cols");
const widthSlider = document.getElementById("width");
const heightSlider = document.getElementById("height");

rowsSlider.oninput = event =>
{
	rows = parseInt(event.target.value);
	setUpGrid();
};

colsSlider.oninput = event =>
{
	cols = parseInt(event.target.value);
	setUpGrid();
}

widthSlider.oninput = event =>
{

	width = parseInt(event.target.value);console.log(width);
	setUpGrid();
}

heightSlider.oninput = event =>
{
	height = parseInt(event.target.value);
	console.log(height);
	setUpGrid();
}


function start(event)
{
	event.preventDefault();

	let openList = [];
	let closedList = [];

	openList.push(startingNode);

	while (openList.length !== 0 && !arrayHasNode(closedList, goalNode))
	{
		const lowestFCostIndex = findLowestFCost(openList);
		const currentNode = openList[lowestFCostIndex];

		closedList.push(currentNode);
		openList.splice(lowestFCostIndex, 1);

		if (currentNode.equals(goalNode)) // found the goal
		{
			path = [];
			let currentChildNode = currentNode;
			while (currentChildNode) // add path to array by looping through node parents
			{
				path.push(currentChildNode);
				currentChildNode = currentChildNode.parent;
			}
			break;
		}

		const neighbors = getNodeNeighbors(currentNode);

		neighbors.forEach((currentNeighbor) =>
		{
			if (currentNeighbor.status === "obstacle" || arrayHasNode(closedList, currentNeighbor))
			{
				return;
			}

			const gScore = currentNode.gCost + 10;

			if (!arrayHasNode(openList, currentNeighbor) || gScore < currentNeighbor.gCost)
			{
				openList.push(currentNeighbor);
				currentNeighbor.parent = currentNode;
				currentNeighbor.calculateH(goalNode);
				currentNeighbor.gCost = gScore;
				currentNeighbor.calculateF();
			}
		});

	}

	path.forEach((value) => // todo animate and create speed setting
	{
		value.fill();
	});

}

function setUpGrid()
{
	nodes = [];
	while (grid.firstChild)
	{
		grid.removeChild(grid.firstChild);
	}


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
				if (event.buttons === 1)
				{
					currentSelectedType = nodes[i][j].status;
					nodes[i][j].flip();
				} else if (event.buttons === 2)
				{
					nodes[i][j].setStart(startingNode);
					startingNode = nodes[i][j];
				} else if (event.buttons === 4)
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

	nodes[0][0].setStart(startingNode); // replace old starting node with new one
	startingNode = nodes[0][0];

	nodes[rows - 1][cols - 1].setGoal(goalNode); // replace old goal node with new one
	goalNode = nodes[rows - 1][cols - 1];
	setGridSize();
}

function setGridSize()
{
	grid.style.width = `${width * cols + cols + 1}px`;
	grid.style.height = `${height * rows + rows + 1}px`;
}

function getNodeNeighbors(node) // https://stackoverflow.com/a/5817449
{
	const x = node.x;
	const y = node.y;
	const rowStart = Math.max(x - 1, 0);
	const rowFinish = Math.min(x + 1, rows - 1);
	const colStart = Math.max(y - 1, 0);
	const colFinish = Math.min(y + 1, cols - 1);

	let neighbors = [];

	for (let i = rowStart; i <= rowFinish; i++)
	{
		for (let j = colStart; j <= colFinish; j++)
		{
			let currentNeighbor = nodes[i][j];
			if (!node.equals(currentNeighbor)) // make sure the node getting checked isn't added to the neighbors list
			{
				neighbors.push(currentNeighbor);
			}

		}
	}
	return neighbors;

}

function findLowestFCost(array)
{
	return array.reduce((previousValue, currentValue, index, array) => // find index of cheapest fCost
	{
		if (array[previousValue].fCost < currentValue.fCost)
		{
			return previousValue;
		} else
		{
			return index;
		}

	}, 0);
}

function arrayHasNode(array, node)
{

	for (let i = 0; i < array.length; i++)
	{
		if (node.equals(array[i]))
		{
			return true;
		}
	}

	return false;
}
