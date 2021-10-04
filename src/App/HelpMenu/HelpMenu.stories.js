import './HelpMenu.css';

export default {
  title: `App/HelpMenu`,
};

export const HelpMenu = () => `
<div id=help-menu class=help-menu>
  <details>
    <summary>
      <span>Help & Feedback</span>
      <svg><use href=#iicon></svg>
    </summary>
    <div class=dropdown-content>
    <ul>
      <li><a class='link' href="https://github.com/digitallinguistics/app/discussions/categories/announcements">
        <svg><use href=#megaphone></svg>
        <span>What's new</span>
    </a></li>
      <li><a class='link' href="https://github.com/digitallinguistics/app/issues/new?assignees=&labels=🐞+bug&template=bug_report.md&title=">
        <svg><use href=#alert-circle></svg>
        <span>Report an issue</span>
      </a></li>
      <li><a class='link' href="https://github.com/digitallinguistics/app/issues/new?assignees=&labels=🎁+feature&template=feature_request.md&title=">
        <svg><use href=#plus-circle></svg>
        <span>Request a feature</span>
      </a></li>
      <li><a class='link' href="https://github.com/digitallinguistics/app/discussions/categories/q-a">
        <svg><use href=#help-circle></svg>
        <span>Visit the Q&A</span>
      </a></li>
    </ul>
    </div>
  </details>
</div>
`;
