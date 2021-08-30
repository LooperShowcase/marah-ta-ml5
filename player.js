class Player {
  constructor() {
    this.size = 100;
    this.x = 50;
    this.y = height - this.size;
    this.velocity = 0;
    this.gravity = 2.5;
    //33333333333333333333333333333333333333333333333333333333333333
  }

  show() {
    image(playerImg, this.x, this.y, this.size, this.size);
  }

  jump() {
    if (this.y == height - this.size) {
      this.velocity = -35;
    }
  }

  move() {
    this.velocity = this.velocity + this.gravity;
    this.y = this.y + this.velocity;
    this.y = constrain(this.y, 0, height - this.size);
  }

  collided(currentObs) {
    let isColliding = collideRectRect(
      this.x,
      this.y,
      this.size,
      this.size,

      currentObs.x,
      currentObs.y,
      currentObs.size - 90,
      currentObs.size - 90
    );

    return isColliding;
  }
}
