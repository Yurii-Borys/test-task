import type { ICommentItem } from '@/models/CommentType';

interface Events {
  'new-comment': (comment: ICommentItem) => void;
}

class EventBus<T extends Events> {
  // Map to store sets of event handlers for each event key
  private listeners: Map<keyof T, Set<T[keyof T]>> = new Map();

  // Subscribe to an event with a handler function
  on<K extends keyof T>(event: K, handler: T[K]) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
  }

  // Unsubscribe a handler from an event
  off<K extends keyof T>(event: K, handler: T[K]) {
    this.listeners.get(event)?.delete(handler);
  }

  // Emit an event, calling all subscribed handlers with the given payload
  emit<K extends keyof T>(event: K, payload: Parameters<T[K]>[0]) {
    this.listeners.get(event)?.forEach((handler) => {
      handler(payload);
    });
  }
}

// Export a singleton instance of EventBus for global use
const bus = new EventBus<Events>();
export default bus;
