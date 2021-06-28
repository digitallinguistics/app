import buildJS from '../buildJS.js';
import ora     from 'ora';

ora.promise(buildJS().catch(console.error), `Build JS`);
