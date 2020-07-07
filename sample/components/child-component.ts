import { ContainerProvider } from '../../src';
import { ConsoleWarn } from '../services';

const template = document.createElement('template');
template.innerHTML = '<slot></slot>';

@ContainerProvider([{ provide: 'logger', useClass: ConsoleWarn }], 'child')
export class ChildComponent extends HTMLElement {
  shadow: any;

  constructor() {
    super();

    console.log(`[CHILD] constructor`);

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log('[CHILD] connected');
  }
}

customElements.define('di-child', ChildComponent);
