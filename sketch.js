let fov = 0
let walls = [];

function setup() {
    createCanvas(800, 400);

    for (let i = 0; i < 5; i++) {
        let x1 = random(width / 2);
        let x2 = random(width / 2);
        let y1 = random(height);
        let y2 = random(height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    walls.push(new Boundary(4, 4, width / 2 - 4, 4));
    walls.push(new Boundary(width / 2 - 4, 4, width / 2 - 4, height - 4));
    walls.push(new Boundary(width / 2 - 4, height - 4, 4, height - 4));
    walls.push(new Boundary(4, height - 4, 4, 4));


    player = new Player(width / 4, height / 2, 0);
    sliderFOV = createSlider(0, 360, 60);
    sliderRange = createSlider(5, 450, 150);
    sliderFOV.input(changeFOV);
    sliderRange.input(changeRange);
}

function changeFOV() {
    let fov = sliderFOV.value();
    player.updateFOV(fov);
}

function changeRange() {
    let range = sliderRange.value();
    player.updateRange(range);
}

function draw() {
    background(0);
    stroke(255)
    line(width / 2, 0, width / 2, height);

    if (keyIsDown(LEFT_ARROW)) {
        player.rotate(-0.05);
    } else if (keyIsDown(RIGHT_ARROW)) {
        player.rotate(0.05);
    } else if (keyIsDown(UP_ARROW)) {
        player.move(2, walls);
    } else if (keyIsDown(DOWN_ARROW)) {
        player.move(-2, walls);
    }

    for (let wall of walls) {
        wall.show();
    }

    player.show()
    const scene = player.look(walls);

    const distProjPlane = (width / 2) / 2.0 / tan(player.fov / 2.0);
    const w = (width / 2) / scene.length;

    push();
    translate(width / 2, 0);
    for (let i = 0; i < scene.length; i++) {
        noStroke();
        const sq = scene[i] * scene[i];
        const wSq = width / 2 * width / 2;
        const b = map(sq, 0, wSq, 255, 0);
        const h = ((width / 2) / scene[i]) * distProjPlane; // fisheye fix
        fill(b);
        rectMode(CENTER);
        rect(i * w + w / 2, height / 2, w + 1, h);
    }
    pop();
}