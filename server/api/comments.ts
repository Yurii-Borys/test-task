import { readFileSync } from 'fs';
import { join } from 'path';
import { defineEventHandler } from 'h3';

export default defineEventHandler(() => {
  try {
    // Construct the full path to the comments.json file inside the 'data' folder
    const filePath = join(process.cwd(), 'data', 'comments.json');

    // Read the file content synchronously as utf-8 string
    const rawData = readFileSync(filePath, 'utf-8');

    // Parse the JSON string into JavaScript object/array
    const comments = JSON.parse(rawData);

    console.log('Comments loaded successfully');

    // Return the parsed comments data
    return comments;
  } catch (error) {
    // Log any errors that occur during reading or parsing
    console.error('Error loading comments:', error);

    // Return a friendly error object for the client
    return { error: 'Unable to load comments' };
  }
});
