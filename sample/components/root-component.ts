import { ContainerProvider } from '../../src';
import { ConsoleLog, HttpConsoleLog } from '../services';

const template = document.createElement('template');
template.innerHTML = '<slot></slot>';

@ContainerProvider([
  { a: 'logger', b: ConsoleLog },
  { a: 'http', b: HttpConsoleLog },
])
export class RootComponent extends HTMLElement {
  shadow: any;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log('Main CC');
  }
}

customElements.define('di-root', RootComponent);