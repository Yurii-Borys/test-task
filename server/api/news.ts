import { readFile } from 'fs/promises';
import { join } from 'path';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async () => {
  try {
    // Construct the full file path to the news.json inside public/data
    const filePath = join(process.cwd(), 'public', 'data', 'news.json');

    // Read the JSON file asynchronously as UTF-8 text
    const json = await readFile(filePath, 'utf-8');

    // Parse the JSON string into JavaScript object/array
    const news = JSON.parse(json);

    console.log('News loaded successfully');

    // Return the parsed news data
    return news;
  } catch (error) {
    // Log any error that occurs during file reading or parsing
    console.error('Error loading news:', error);

    // Return an error object so the client knows the load failed
    return { error: 'Unable to load news' };
  }
});
