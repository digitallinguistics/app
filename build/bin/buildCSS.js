import buildCSS       from '../buildCSS.js';
import { oraPromise } from 'ora';

oraPromise(buildCSS().catch(console.error), `Build CSS`);
