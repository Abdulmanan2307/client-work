let particles = [];
let particleCanvas;

function setup() {
    particleCanvas = createCanvas(windowWidth, windowHeight);
    particleCanvas.parent('particle-container');
    for (let i = 0; i < 170; i++) {
        particles.push(new Particle(createVector(random(width), random(height))));
    }
}

function draw() {
    clear();
    background(0, 0);
    let p;
    for (let i = particles.length - 1; i >= 0; i--) {
        p = particles[i];
        p.run();
    }
}

//////////////////////PARTICLE CLASS///////////////////

let Particle = function (position) {
    this.acceleration = createVector(0, 0.05);
    this.velocity = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
    this.position = position.copy();
};

Particle.prototype.run = function () {
    this.update();
    this.display();
    this.intersects();
};

// Method to update position
Particle.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(-0.1);
    if (this.position.x < 0) this.position.x = width;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.y > height) this.position.y = 0;
};

// Method to work out collisions and line proximity
Particle.prototype.intersects = function () {
    for (let i = 0; i < particles.length; i++) {
        let other = particles[i];
        let dir;
        if (other != this) {
            dir = p5.Vector.sub(this.position, other.position);
            if (dir.mag() < 12) {
                dir.setMag(0.1);
                this.applyForce(dir);
            }

            if (dir.mag() < 100) {
                //stroke(206,238,227, 50);
                stroke(89, 198, 159, 40 );
                strokeWeight(0.5);
                line(this.position.x, this.position.y, other.position.x, other.position.y);
            }
        }
    }
};

Particle.prototype.applyForce = function (f) {
    this.acceleration.add(f);
};

// Method to display
Particle.prototype.display = function () {
    noStroke();
    fill(206,238,227);
    ellipse(this.position.x, this.position.y, 4, 4);
    let mPos = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(this.position, mPos);
    if (dir.mag() < 160) {
        stroke(0, 168, 107);
        strokeWeight(0.5);
        line(this.position.x, this.position.y, mouseX, mouseY);
    }
};

//image scaling
function scaleImage(imgElement, scale) {
    imgElement.style.transition = "transform 0.5s"; // Add a smooth transition effect
    imgElement.style.transform = `scale(${scale})`;
}

//sticky navbar

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "1000px";
  }
}

//Hover projects
const rectBg = document.querySelector('.rect-bg');
const hoverContainer = document.querySelector('.hover-container');

rectBg.addEventListener('mouseenter', () => {
    hoverContainer.style.display = 'block';
});

rectBg.addEventListener('mouseleave', () => {
    hoverContainer.style.display = 'none';
});
