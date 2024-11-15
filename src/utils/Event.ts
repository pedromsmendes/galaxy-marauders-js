type Handler<T> = (data: T) => void;

class Signal<T> {
  private handlers: Set<Handler<T>> = new Set();

  public Connect(handler: Handler<T>) {
    this.handlers.add(handler)
  }

  public Disconnect(handler: Handler<T>) {
    this.handlers.delete(handler)
  }

  public Emit(data: T) {
    this.handlers.forEach(handler => handler(data))
  }
}

export default Signal;
