import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCommentsStore } from '@/stores/comments';
import type { ICommentItem } from '@/models/CommentType';

// Mock global $fetch
vi.stubGlobal('$fetch', vi.fn());

describe('Comments Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should start with an empty comments array', () => {
    const store = useCommentsStore();
    expect(store.comments).toEqual([]);
  });

  it('should add a new comment', () => {
    const store = useCommentsStore();
    const newComment: ICommentItem = {
      id: 1,
      newsId: 101,
      comment: 'Test comment',
      author: 'Tester',
      date: Date.now().toString(),
    };

    store.ADD_COMMENT(newComment);

    expect(store.comments.length).toBe(1);
    expect(store.comments[0]).toEqual(newComment);
  });

  it('should fetch all comments from API', async () => {
    const mockData: ICommentItem[] = [
      {
        id: 1,
        newsId: 1,
        comment: 'First comment',
        author: 'Alice',
        date: Date.now().toString(),
      },
    ];

    // Mock $fetch response
    ($fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockData);

    const store = useCommentsStore();
    await store.FETCH_ALL_COMMENTS();

    expect(store.comments).toEqual(mockData);
  });

  it('should handle error when fetching comments', async () => {
    // Mock $fetch to throw an error
    ($fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Fetch failed')
    );

    const store = useCommentsStore();
    await store.FETCH_ALL_COMMENTS();

    expect(store.comments).toEqual([]);
  });
});
