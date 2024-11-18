import Signal from '@/core/utils/Signal';

import Entity from '../Entity';
import Component from '../Component';

class HealthComponent extends Component {
  private readonly maxHealth: number;
  private currentHealth: number;

  public isDead = false;

  public OnDeath = new Signal();
  public OnHeal = new Signal<number>();
  public OnDamage = new Signal<number>();

  constructor(entity: Entity, maxHealth: number) {
    super(entity);

    this.maxHealth = maxHealth;
    this.currentHealth = this.maxHealth;
  }

  public GetHealth():number {
    return this.currentHealth;
  }

  public GetMaxHealth():number {
    return this.maxHealth;
  }

  public Heal(hp: number): void {
    if (this.isDead) return;

    this.currentHealth += hp;
    this.OnHeal.Emit(this.currentHealth)
  }

  public Damage(dmg: number): void {
    if (this.isDead) return;

    this.currentHealth -= dmg;
    this.OnDamage.Emit(this.currentHealth)
  }

  public Kill(): void {
    if (this.isDead) return;

    this.isDead = true;
    this.currentHealth = 0
    this.OnDeath.Emit()
  }
}

export default HealthComponent;
