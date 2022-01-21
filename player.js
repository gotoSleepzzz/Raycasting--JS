class Player {
    constructor(x, y, dir_angle) {
        this.pos = createVector(x, y);
        this.dir_angle = dir_angle;
        this.fov = 60;
        this.rays = [];
        this.range = 150

        for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
            this.rays.push(new Ray(this.pos, radians(a) + this.dir_angle));
        }
    };

    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 10);
    };

    rotate(angle) {
        this.dir_angle += angle;
        let index = 0;
        for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
            this.rays[index].setAngle(radians(a) + this.dir_angle);
            index++;
        }
    };

    move(dir, walls) {

        let temp = p5.Vector.fromAngle(this.dir_angle).mult(dir);
        this.pos.add(temp);

        for (let wall of walls) {
            if (wall.isHit(this.pos)) {
                this.pos.sub(temp);
                break;
            }
        }
    };

    look(walls) {
        const scene = [];
        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i];
            let closest = null;
            let record = this.range
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    let d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            stroke(255, 100);
            this.rays[i].show(record);
            if (record == this.range) record = Infinity;
            scene[i] = record;
        }
        return scene;
    };


    updateFOV(fov) {
        this.fov = fov;
        this.rays = [];
        for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
            this.rays.push(new Ray(this.pos, radians(a) + this.dir_angle));
        }
        this.show();
    };

    updateRange(range) {
        this.range = range;
        this.show();
    };
}