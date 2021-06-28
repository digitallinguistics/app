import buildCSS from '../buildCSS.js';
import ora      from 'ora';

ora.promise(buildCSS().catch(console.error), `Build CSS`);
