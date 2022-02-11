import styles   from './Reconstructions.less';
import template from './Reconstructions.hbs';
import View     from '../../core/View.js';

export default class ReconstructionsPage extends View {

  /**
   * Create a new Reconstruction page.
   */
  constructor() {
    super({ styles, template });
  }

  /**
   * Render the Reconstructions Page.
   * @return {HTMLMainElement}
   */
  render() {
    this.loadStyles();
    this.cloneTemplate();

    return this.el;
  }


}
