import buildHTML from '../buildHTML.js';
import ora       from 'ora';

ora.promise(buildHTML().catch(console.error), `Build HTML`);
