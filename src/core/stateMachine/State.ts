import type { StateConstructor, StateId } from '../types';

import StateMachine from './StateMachine';

abstract class State<TStateId extends StateId, TNestedId extends StateId = StateId> {
  public ID: TStateId;

  protected timeSinceStart: number;
  protected description?: string;
  protected parentStateMachine: StateMachine<TStateId>;
  protected stateMachine?: StateMachine<TNestedId>;

  private nextStateId?: TStateId;
  private completed = false;

  constructor(
    ID: TStateId,
    parentStateMachine: StateMachine<TStateId>,
    description?: string,
    nested?: {
      defaultStateId: TNestedId,
      states: StateConstructor<TNestedId>[],
    },
  ) {
    this.ID = ID;
    this.timeSinceStart = 0;
    this.parentStateMachine = parentStateMachine;
    this.description = description;

    if (nested) {
      this.stateMachine = new StateMachine<TNestedId>(nested.defaultStateId, nested.states, this);
    }
  }

  public enter(): void {
    this.timeSinceStart = 0;
    this.completed = false;
    this.OnEnter();

    this.stateMachine?.Start();
  }

  protected OnEnter(): void { }

  public exit(): void {
    this.nextStateId = undefined;
    this.OnExit();

    this.stateMachine?.Stop();
  }

  protected OnExit(): void { }

  public update(dt: number): void {
    this.timeSinceStart += dt;

    this.stateMachine?.Update(dt);

    this.Update(dt);

    if (this.nextStateId) {
      this.parentStateMachine.ChangeState(this.nextStateId);
      this.nextStateId = undefined;
    }
  }

  protected Update(_dt: number): void { }

  protected RequestStateChange(nextStateId: TStateId): void {
    this.nextStateId = nextStateId;
  }

  public Finish(): void {
    this.completed = true;
  }

  public IsComplete(): boolean {
    return this.completed;
  }

  public ToString(): string {
    return [this.parentStateMachine.ToString(), this.description || "No description"].join(" -> ");
  }
}

export default State;
