import Component from '@/ecs/Component';

export enum Event {
  EntityDeath,
}

export type EventCallback = (component: Component) => void;

class EventManager {
  public static Instance: EventManager;

  private events: Map<Event, EventCallback[]> = new Map();

  constructor() {
    /* Singleton */ {
      if (EventManager.Instance) {
        return EventManager.Instance
      }

      EventManager.Instance = this;
    }
  }

  public static On(event: Event, callback: EventCallback): void {
    if (!this.Instance.events.has(event)) {
      this.Instance.events.set(event, []);
    }

    this.Instance.events.get(event)?.push(callback);
  }

  public static Emit(event: Event, component: Component): void {
    if (this.Instance.events.has(event)) {
      this.Instance.events.get(event)?.forEach(callback => callback(component));
    }
  }
}

export default EventManager;
