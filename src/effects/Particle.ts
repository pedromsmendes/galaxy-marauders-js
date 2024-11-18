import Vec2 from '@/core/utils/Vec2';

class Particle {
  public position: Vec2;
  public velocity: Vec2;
  public color: string;
  public radius: number;
  public lifetime: number;
  public opacity: number;
  public age: number;

  constructor() {
    this.position = Vec2.Zero;
    this.velocity = Vec2.Zero;
    this.color = "#fff";
    this.radius = 0;
    this.lifetime = 1;
    this.age = 0;
    this.opacity = 1;
  }
}

export default Particle;