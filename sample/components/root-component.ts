import { ContainerProvider } from '../../src';
import { ConsoleLog, HttpConsoleLog, HttpLogger, Logger } from '../services';

const template = document.createElement('template');
template.innerHTML = '<slot></slot>';

@ContainerProvider(
  [
    { provide: Logger, useClass: ConsoleLog },
    { provide: HttpLogger, useClass: HttpConsoleLog },
  ],
  'root',
)
export class RootComponent extends HTMLElement {
  shadow: any;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('di-root', RootComponent);
