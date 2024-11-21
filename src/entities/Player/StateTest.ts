import State from '@/core/stateMachine/State';
import StateMachine from '@/core/stateMachine/StateMachine';

import { PlayerStates } from './Player';

export class StateTest1 extends State<PlayerStates> {
  constructor(parentStateMachine: StateMachine<PlayerStates>) {
    super(PlayerStates.StateTest1, parentStateMachine, "StateTest1")
  }

  protected override OnEnter(): void {
  }

  protected override OnExit(): void {
  }

  protected override Update(): void {
    if (this.timeSinceStart >= 2) {
      this.RequestStateChange(PlayerStates.StateTest2);
    }
  }
}

enum StateTest2Nested {
  Nested1 = "Nested1",
  Nested2 = "Nested2",
  Nested3 = "Nested3",
}

export class StateTest2 extends State<PlayerStates, StateTest2Nested> {
  constructor(parentStateMachine: StateMachine<PlayerStates>) {
    super(
      PlayerStates.StateTest2,
      parentStateMachine,
      "StateTest2",
      {
        defaultStateId: StateTest2Nested.Nested1,
        states: [Nested1, Nested2, Nested3],
      },
    )
  }

  protected override OnEnter(): void {
  }

  protected override OnExit(): void {
  }

  protected override Update(): void { }
}

class Nested1 extends State<StateTest2Nested> {
  constructor(parentStateMachine: StateMachine<StateTest2Nested>) {
    super(StateTest2Nested.Nested1, parentStateMachine, "Nested1");
  }

  protected override OnEnter(): void {
  }

  protected override OnExit(): void {
  }

  protected override Update(): void {
    if (this.timeSinceStart >= 2) {
      this.RequestStateChange(StateTest2Nested.Nested2);
    }
  }
}

class Nested2 extends State<StateTest2Nested> {
  constructor(parentStateMachine: StateMachine<StateTest2Nested>) {
    super(StateTest2Nested.Nested2, parentStateMachine, "Nested2");
  }

  protected override OnEnter(): void {
  }

  protected override OnExit(): void {
  }

  protected override Update(): void {
    if (this.timeSinceStart >= 2) {
      this.RequestStateChange(StateTest2Nested.Nested3);
    }
  }
}

class Nested3 extends State<StateTest2Nested> {
  constructor(parentStateMachine: StateMachine<StateTest2Nested>) {
    super(StateTest2Nested.Nested3, parentStateMachine, "Nested3");
  }

  protected override OnEnter(): void {
  }

  protected override OnExit(): void {
  }

  protected override Update(): void {
    if (this.timeSinceStart >= 2) {
      this.Finish();
    }
  }
}