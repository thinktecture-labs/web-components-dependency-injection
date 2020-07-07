import { Inject } from '../../src';
import { HttpLogger, Logger } from '../services';

const template = document.createElement('template');

template.innerHTML = `
  <h1>Hallo</h1>
`;

export class ConsumerComponent extends HTMLElement {
  @Inject(Logger)
  logger: Logger;

  @Inject(HttpLogger)
  httpLogger: HttpLogger;

  shadow: any;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.logger.log('[CONSUMER] Logging');
    this.httpLogger.log('[CONSUMER] Http Logging');
  }
}

customElements.define('di-consumer', ConsumerComponent);
