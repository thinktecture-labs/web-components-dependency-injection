import { Inject } from '../../src';
import { HttpLogger, Logger } from '../services';

const template = document.createElement('template');

template.innerHTML = `
  <h1>Hallo</h1>
`;

export class ConsumerComponent extends HTMLElement {
  @Inject('logger')
  logger: Logger;

  @Inject('http')
  httpLogger: HttpLogger;

  shadow: any;

  constructor() {
    super();

    console.log('[CONSUMER] constructor');

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log('[CONSUMER] connected');

    this.logger.log('[CONSUMER] Logging');
    this.httpLogger.log('[CONSUMER] Http Logging');
  }
}

customElements.define('di-consumer', ConsumerComponent);
