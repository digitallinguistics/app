import { build } from 'esbuild';
import config    from './esbuild.config.cjs';

export default async function buildJS() {
  await build(config);
}
