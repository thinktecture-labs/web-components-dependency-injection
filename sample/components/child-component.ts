import { ContainerProvider } from '../../src';
import { ConsoleLog2 } from '../services';

const template = document.createElement('template');
template.innerHTML = '<slot></slot>';

@ContainerProvider([{ a: 'logger', b: ConsoleLog2 }], 'child')
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
