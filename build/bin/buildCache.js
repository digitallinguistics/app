import createAssetList from '../createAssetList.js';
import ora             from 'ora';

ora.promise(createAssetList().catch(console.error), `Create asset list`);
