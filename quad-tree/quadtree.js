class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        if (point.x > this.x - this.w && point.x < this.x + this.w &&
            point.y > this.y - this.h && point.y < this.y + this.h
        ) {
            return true;
        }
        return false;
    }

    intersects(range) {
        return (
            range.x - range.w > this.x + this.w ||
            range.x + range.w < this.x - this.w ||
            range.y - range.h > this.y + this.h ||
            range.y + range.h > this.y - this.h
        );
    }
}

class QuadTree {
    constructor(boundary, n) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    insert(point) {

        if (!this.boundary.contains(point)) {
            return false;
        }


        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        } else {
            if (!this.divided) {
                this.subDivide();
            }
            if (this.northEast.insert(point)) return true;
            else if (this.northWest.insert(point)) return true;
            else if (this.southEast.insert(point)) return true;
            else if (this.southWest.insert(point)) return true;
        }
    }

    subDivide() {
        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        this.northEast = new QuadTree(ne, this.capacity);
        let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        this.northWest = new QuadTree(nw, this.capacity);
        let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        this.southEast = new QuadTree(se, this.capacity);
        let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        this.southWest = new QuadTree(sw, this.capacity);
        this.divided = true;
    }


    show() {
        stroke(255);
        strokeWeight(1);
        noFill();
        strokeWeight(1);
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
        for (let p of this.points) {
            strokeWeight(2);
            point(p.x, p.y);
        }
        if (this.divided) {
            this.northEast.show();
            this.northWest.show();
            this.southEast.show();
            this.southWest.show();
        }

        for (let p of this.points) {
            // strokeWeight(4);
            point(p.x, p.y);
        }
    }

    query(range, found = []) {
        if (!found) {
            found = [];
        }
        if (!this.boundary.intersects(range)) return;
        else {
            for (let p of this.points) {
                if (range.contains(p)) {
                    found.push(p);
                }
            }
            if (this.divided) {
                this.northWest.query(range, found);
                this.northEast.query(range, found);
                this.southWest.query(range, found);
                this.southEast.query(range, found);
            }
        }
        return found;
    }
}