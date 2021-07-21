import { build } from 'esbuild';
import config    from './esbuild.config.js';

export default async function buildJS() {
  await build(config);
}
