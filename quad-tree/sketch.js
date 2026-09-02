let quadTree;

function setup() {
    createCanvas(400, 400);
    let boundary = new Rectangle(200, 200, 200, 200);
    quadTree = new QuadTree(boundary, 4);
    console.log(quadTree);

    for (let i = 0; i < 300; i++) {
        let x = randomGaussian(width / 2, width / 8);
        let y = randomGaussian(height / 2, height / 8);
        let p = new Point(x, y);
        quadTree.insert(p);
    }
}

function draw() {

    background(0)
    quadTree.show();

    stroke(0, 255, 0);
    rectMode(CENTER);
    let range = new Rectangle(mouseX, mouseY, 25, 25);
    if (mouseX < width && mouseY < height) {
        rect(range.x, range.y, range.w * 2, range.h * 2);
        let points = quadTree.query(range);
        for (let p of points) {
            strokeWeight(4);
            point(p.x, p.y);
        }
    }
}