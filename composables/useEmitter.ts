import mitt from 'mitt';
import type { ICommentItem } from '@/models/CommentType';

// Define the events interface with event names as keys
// and payload types as values
interface Events {
  'new-comment': ICommentItem;
  error: Error | string; // payload for error event can be Error or string
}

const emitter = mitt<Events>();

// Global error handler
emitter.on('error', (error) => {
  console.error('Global error caught:', error);
});

export function useEmitter() {
  return emitter;
}