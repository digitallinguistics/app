import buildStories from '../buildStories.js';
import ora          from 'ora';

ora.promise(buildStories().catch(console.error), `Build stories.`);
