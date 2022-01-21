class MiniMap {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width
        this.height = height
    }

    show() {
        stroke(255);
        line(this.x, this.y,
            this.x + this.width, this.y);
        line(this.x, this.y,
            this.x, this.y + this.height);
        line(this.x + this.width, this.y + this.height,
            this.x + this.width, this.y);
        line(this.x + this.width, this.y + this.height,
            this.x, this.y + this.height);
    }
}