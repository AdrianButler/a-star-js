export default class Node
{

	constructor()
	{
		this.open = false;
		this.fCost = 0; // Total Cost | g + h
		this.parent = undefined;
		this.gCost = 0; // Distance from starting node
		this.hCost = 0; // Distance from end node
		this.status = "empty"; // empty, filled, obstacle, goal
		this.htmlElement = undefined;
	}

	flip = () =>
	{
		if (this.status === "empty")
		{
			this.status = "obstacle";
			this.htmlElement.style.backgroundColor = "black";
		}
		else if (this.status === "obstacle")
		{
			this.status = "empty";
			this.htmlElement.style.backgroundColor = "white";
		}

	}
}



