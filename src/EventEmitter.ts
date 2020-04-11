/**
 * A tiny event emitter class.
 */
class EventEmitter {
  listeners = new Map<string, ((...args: any[]) => void)[]>();

  /**
   * Set up an event subscription.
   *
   * @param eventName The name of the event to subscribe to.
   * @param callback Function to invoke when event is triggered.
   * @returns A function which removes the subscription.
   * @example eventEmitter.on("fileOpen", (file) => doThingWithFile(file));
   */
  on(eventName: string, callback: (...args: any[]) => void) {
    const callbacks = this.listeners.get(eventName) || [];
    callbacks.push(callback);
    this.listeners.set(eventName, callbacks);

    return () => {
      const callbacks = this.listeners.get(eventName)!;
      const idx = callbacks.indexOf(callback);
      callbacks.splice(idx, 1);
    };
  }

  /**
   * Emit/invoke an event of a specific name with arguments.
   * @param eventName The event to invoke.
   * @param args Arguments to pass to event listeners.
   * @example eventEmitter.emit("fileOpen", someFile);
   */
  emit(eventName: string, ...args: any[]) {
    const callbacks = this.listeners.get(eventName) || [];
    callbacks.forEach((callback) => {
      callback(...args);
    });
  }
}

export default EventEmitter;
