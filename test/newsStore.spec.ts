import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useNewsStore } from '@/stores/news';
import type { INewsItem } from '@/models/NewsType';

// Mock global $fetch
vi.stubGlobal('$fetch', vi.fn());

describe('News Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should start with an empty news array', () => {
    const store = useNewsStore();
    expect(store.news).toEqual([]);
  });

  it('should fetch all news from API', async () => {
    const mockNews: INewsItem[] = [
      {
        id: 1,
        title: 'Launch of New Website',
        shortDescription: 'New website launched',
        fullDescription:
          'We are excited to announce the launch of our brand new company website. The new site features a modern design, improved navigation, faster load times, and mobile responsiveness, providing a much better user experience. We invite you to explore all the new content and features we have built.',
        date: '1747660800000',
      },
    ];

    // Mock $fetch to resolve with mockNews
    ($fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockNews);

    const store = useNewsStore();
    await store.FETCH_ALL_NEWS();

    expect(store.news).toEqual(mockNews);
  });

  it('should handle error when fetching news', async () => {
    // Mock $fetch to reject with error
    ($fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Fetch failed')
    );

    const store = useNewsStore();
    await store.FETCH_ALL_NEWS();

    expect(store.news).toEqual([]);
  });
});
