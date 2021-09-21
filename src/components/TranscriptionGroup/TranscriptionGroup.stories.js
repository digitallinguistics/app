import './TranscriptionGroup.css';

export default {
  title: `Components/Transcription Group`,
};

export const TranscriptionGroup = () => `<div class="txn-group">
  <label class=label for="storybook-mod">mod</label>
  <input autocomplete="off" class="line-input txn" data-ortho="mod" id="storybook-mod" inputmode="text" lang="ctm" name="storybook-mod" placeholder="placeholder text" spellcheck="false" type="text" value="sitimaxa">
  <label class=label for="storybook-swd">swd</label>
  <input autocomplete="off" class="line-input txn" data-ortho="swd" id="storybook-swd" inputmode="text" lang="ctm" name="storybook-swd" placeholder="placeholder text" spellcheck="false" type="text" value="sitimaʃa">
  <label class=label for="storybook-test">test</label>
  <input autocomplete="off" class="line-input txn" data-ortho="test" id="storybook-test" inputmode="text" lang="ctm" name="storybook-test" placeholder="placeholder text" spellcheck="false" type="text" value="">
</div>`;
