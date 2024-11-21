import type { StateConstructor, StateId } from '../types';

import State from './State';

class StateMachine<TStateId extends StateId, TParentId extends StateId = StateId> {
  private defaultStateId: TStateId;
  private states: Map<TStateId, State<TStateId>> = new Map();
  private currentState?: State<TStateId>;
  private parentState?: State<TParentId>;
  private running = false;

  constructor(
    defaultStateId: TStateId,
    stateConstructors: StateConstructor<TStateId>[],
    parentState?: State<TParentId>,
  ) {
    for (const stateConstructor of stateConstructors) {
      const state = new stateConstructor(this);
      this.states.set(state.ID, state);
    }

    this.parentState = parentState;
    this.defaultStateId = defaultStateId;
  }

  public Start(): void {
    this.running = true;

    if (!this.currentState) {
      this.ChangeState(this.defaultStateId);
    }
  }

  public Stop(): void {
    this.currentState = undefined;

    this.running = false;
  }

  public ChangeState(newStateId: TStateId) {
    if (this.currentState?.ID === newStateId) return;

    this.currentState?.exit();

    const newState = this.states.get(newStateId);
    if (newState) {
      this.currentState = newState;

      this.currentState.enter();
    }
  }

  public SetParent(parent: State<TParentId> | undefined): void {
    this.parentState = parent;
  }

  public Update(dt: number): void {
    if (!this.running) return;

    this.currentState?.update(dt);

    if (this.currentState?.IsComplete()) {
      this.ChangeState(this.defaultStateId);
    }
  }

  public ToString(): string {
    return this.parentState?.ToString() || "";
  }
}

export default StateMachine;
