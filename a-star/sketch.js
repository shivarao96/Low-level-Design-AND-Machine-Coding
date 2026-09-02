/**
 * A*
 * f(n) = g(n) + h(n)
 */

const n = 20;
let w;
let h;

function Spot(i, j) {
    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.previous = undefined;
    this.neighbors = [];

    this.show = function(color) {
        fill(color);
        noStroke();
        rect(this.x * w, this.y * h, w - 1, h - 1);
    }

    this.addNeighbors = function(grid) {
        let i = this.x;
        let j = this.y;
        if (i < n - 1) {
            this.neighbors.push(grid[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1][j]);
        }
        if (j < n - 1) {
            this.neighbors.push(grid[i][j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(grid[i][j - 1]);
        }
    }
}

const grid = new Array(n)
.fill().map((_, i) => (new Array(n))
.fill().map((_, j) => new Spot(i, j)));

for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            grid[i][j].addNeighbors(grid);
        }
    }

const openSet = [];
const closedSet = [];
let start = grid[0][0];
let end = grid[n - 1][n - 1];
let path = [];

openSet.push(start);


function removeFromArray(arr, elt) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === elt) {
            arr.splice(i, 1);
        }
    }
}

function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)//dist(a.x, a.y, b.x, b.y);
}

function setup() {

    createCanvas(400, 400);
    console.log("A*");
    background(0)

    w = width / n;
    h = height / n;
}

function draw() {
    let current
     if (openSet.length > 0) {
        let winner = 0;
        for(let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }

        current = openSet[winner];

        if (current == end) {
            noLoop();
            console.log("Done !");
        }
        removeFromArray(openSet, current);
        closedSet.push(current);

        for(const neighbor of current.neighbors) {
            if (closedSet.includes(neighbor)) continue;
            let tempG = current.g + 1;
            if(openSet.includes(neighbor)) {
                if (tempG < neighbor.g) {
                    neighbor.g = tempG;
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.previous = current;
                }
            } else {
                neighbor.g = tempG;
                neighbor.previous = current;
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                openSet.push(neighbor);
            }
        }
    } else {
        console.log("No path exists");
        noLoop();
    }


    for(let i = 0; i < n; i++) {
        for(let j = 0; j < n; j++) {
            grid[i][j].show(255);
        }
    }

    for(let i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0));
    }

    for(let i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0));
    }

    // if (openSet.length) {
        path = [];
        let temp = current;
        path.push(current);
        while(temp.previous) {
            path.push(temp.previous);
            temp = temp.previous;
        }
    // }
    for(let i = 0; i < path.length; i++) {
        path[i].show(color(0, 0, 255));
    }
}