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

	calculateH = (endingNode) =>
	{
		if (this.hCost) // only calculate this if it hasn't been calculated yet
		{
			return;
		}

		const endX = endingNode.x;
		const endY = endingNode.y;
		const myX = this.x;
		const myY = this.y;

		const endXDistance = Math.pow(Math.abs(myX - endX), 2); // a^2
		const endYDistance = Math.pow(Math.abs(myY - endY), 2); // b^2

		this.hCost = Math.sqrt(endXDistance + endYDistance) * 10; // c^2
	}

	calculateF = () => // uses Pythagorean theorem to calculate distances (a^2 + b^2 = c^2)
	{
		this.fCost = this.gCost + this.hCost;
	}

	equals = (node) =>
	{
		return this.x === node.x && this.y === node.y;
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
			case "filled": // todo fix bug with this
				this.status = "empty";
				this.htmlElement.style.backgroundColor = "white"
				break;
		}

	};

	fill = () =>
	{
		if (this.status !== "start" && this.status !== "goal")
		{
			this.htmlElement.style.backgroundColor = "blue";
			this.status = "filled";
		}
	}

	empty = () =>
	{
		this.htmlElement.style.backgroundColor = "blue";
		this.status = "filled";
	}
}



