import { Shadow } from '../services';

const template = document.createElement('template');
template.innerHTML = `
<style>
  :host {
    display: flex;
    background-color: var(--primary-color);
    color: white;
    align-items: center;
    padding-left: var(--gap);
  }

  slot[name="language-switcher"]::slotted(*) {
    margin-left: auto;
    margin-right: var(--gap);
  }
</style>

<slot></slot>
<slot name="language-switcher"></slot>
`;

export class HeaderComponent extends Shadow(template) {
  constructor() {
    super();
  }
}

customElements.define('di-header', HeaderComponent);
