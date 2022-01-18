import '../../../dist/components/Abbreviation/Abbreviation.css';
import page from './Abbreviation.stories.mdx';

export default {
  docs: {
    page,
  },
  title: `Components/Abbreviation`,
};

export const Abbreviation = () => `<p>The acronym <abbr class="abbr" title="Digital Linguistics">DLx</abbr> stands for "Digital Linguistics".</p>`;
