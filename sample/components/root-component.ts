import { ContainerProvider } from '../../src';
import { ConsoleLog, HttpConsoleLog } from '../services';

const template = document.createElement('template');
template.innerHTML = '<slot></slot>';

@ContainerProvider(
  [
    { a: 'logger', b: ConsoleLog },
    { a: 'http', b: HttpConsoleLog },
  ],
  'root',
)
export class RootComponent extends HTMLElement {
  shadow: any;

  constructor() {
    super();

    console.log('[ROOT] constructor');

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log('[ROOT] connected');
  }
}

customElements.define('di-root', RootComponent);
