import buildSVG from '../buildSVG.js';
import ora      from 'ora';

ora.promise(buildSVG().catch(console.error), `Build SVG`);
