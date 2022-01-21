class Boundary {
    constructor(x1, y1, x2, y2) {
        this.head = createVector(x1, y1);
        this.tail = createVector(x2, y2);
        this.a = y2 - y1;
        this.b = -(x2 - x1);
        this.c = -this.a * x1 - this.b * y1;
    };

    show() {
        stroke(255);
        line(this.head.x, this.head.y, this.tail.x, this.tail.y);
    };

    isHit(pos) {
        if (pos.x < this.head.x - 5 && pos.x < this.tail.x - 5)
            return false;
        if (pos.x > this.head.x + 5 && pos.x > this.tail.x + 5)
            return false;
        if (pos.y < this.head.y - 5 && pos.y < this.tail.y - 5)
            return false;
        if (pos.y > this.head.y + 5 && pos.y > this.tail.y + 5)
            return false;

        let temp = createVector(this.a, this.b);
        let d = Math.abs(this.a * pos.x + this.b * pos.y + this.c);
        d = d / temp.mag();

        return d < 5;
    };
}