class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        this.angle = angle;
    };

    setAngle(angle) {
        this.angle = angle;
    };

    show(range) {
        stroke(255, 100);
        let dir = createVector(this.pos.x + Math.cos(this.angle) * range,
            this.pos.y + Math.sin(this.angle) * range);
        line(this.pos.x, this.pos.y, dir.x, dir.y);
    };

    cast(wall) {
        const x1 = wall.head.x;
        const y1 = wall.head.y;
        const x2 = wall.tail.x;
        const y2 = wall.tail.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        let dir = p5.Vector.fromAngle(this.angle);
        const x4 = this.pos.x + dir.x;
        const y4 = this.pos.y + dir.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return pt;
        } else {
            return;
        }
    };
}