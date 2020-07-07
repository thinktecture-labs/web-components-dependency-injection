import { ContainerProvider } from '../../src';
import { ConsoleWarn, Logger } from '../services';

const template = document.createElement('template');
template.innerHTML = '<slot></slot>';

@ContainerProvider([{ provide: Logger, useClass: ConsoleWarn }], 'child')
export class ChildComponent extends HTMLElement {
  shadow: any;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('di-child', ChildComponent);
