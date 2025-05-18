import { describe, it, expect, vi } from 'vitest';
import { useEmitter } from '@/composables/useEmitter';
import type { ICommentItem } from '@/models/CommentType';

describe('useEmitter', () => {
  it('should emit and listen to new-comment event', () => {
    const emitter = useEmitter();
    const mockHandler = vi.fn();

    emitter.on('new-comment', mockHandler);

    const comment: ICommentItem = {
      id: 1,
      newsId: 101,
      comment: 'Test comment',
      author: 'Tester',
      date: new Date().toISOString(),
    };

    emitter.emit('new-comment', comment);

    expect(mockHandler).toHaveBeenCalledWith(comment);
  });
});
