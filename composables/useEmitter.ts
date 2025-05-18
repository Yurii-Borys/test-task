import mitt from 'mitt';
import type { ICommentItem } from '@/models/CommentType';

// Define the events interface with event names as keys
// and payload types as values
interface Events {
  'new-comment': ICommentItem; // Payload for 'new-comment' event
}

// Create a typed mitt emitter instance
const emitter = mitt<Events>();

// Export a function to access the emitter instance
export function useEmitter() {
  return emitter;
}
