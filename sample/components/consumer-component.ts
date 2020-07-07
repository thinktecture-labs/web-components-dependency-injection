import { Inject } from '../../src';
import { HttpLogger, Logger } from '../services';

const template = document.createElement('template');
template.innerHTML = `
  <h1>Hallo</h1>
`;

export class ConsumerComponent extends HTMLElement {
  @Inject() private readonly logger: Logger;
  @Inject() private readonly httpLogger: HttpLogger;

  private shadow: ShadowRoot;

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
