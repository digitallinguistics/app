import copyAssets from '../copyAssets.js';
import ora        from 'ora';

ora.promise(copyAssets().catch(console.error), `Copy assets`);
