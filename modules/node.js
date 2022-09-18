export default class Node
{
	constructor(x, y)
	{
		this.open = false;
		this.x = x;
		this.y = y;
		this.fCost = 0; // Total Cost | g + h
		this.parent = undefined;
		this.gCost = 0; // Distance from starting node
		this.hCost = 0; // Distance from end node
		this.status = "empty"; // empty, filled, obstacle, goal, start
		this.htmlElement = undefined;
	}

	setStart = (previousStart) =>
	{
		if (previousStart)
		{
			previousStart.status = "empty";
			previousStart.htmlElement.style.backgroundColor = "white";
		}
		this.status = "start";
		this.htmlElement.style.backgroundColor = "green";
	};

	setGoal = (previousGoal) =>
	{
		if (previousGoal)
		{
			previousGoal.status = "empty";
			previousGoal.htmlElement.style.backgroundColor = "white";
		}
		this.status = "goal";
		this.htmlElement.style.backgroundColor = "gold";
	}

	flip = () =>
	{
		switch (this.status)
		{
			case "empty":
				this.status = "obstacle";
				this.htmlElement.style.backgroundColor = "black";
				break;
			case "obstacle":
				this.status = "empty";
				this.htmlElement.style.backgroundColor = "white";
				break;
		}

	};
}



