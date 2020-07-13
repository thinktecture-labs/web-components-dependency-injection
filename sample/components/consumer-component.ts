import { Inject } from '../../src';
import { HttpLogger, Logger } from '../services';
import { TranslateService } from '../services/translate';

const template = document.createElement('template');
template.innerHTML = `
  <span></span>
`;

export class ConsumerComponent extends HTMLElement {
  @Inject() private readonly logger: Logger;
  @Inject() private readonly httpLogger: HttpLogger;
  @Inject() private readonly translateService: TranslateService;

  private shadow: ShadowRoot;
  private readonly span: HTMLSpanElement;
  private unregister = () => {};

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(template.content.cloneNode(true));

    this.span = this.shadow.querySelector('span');
  }

  connectedCallback(): void {
    this.logger.log('[CONSUMER] Logging');
    this.httpLogger.log('[CONSUMER] Http Logging');

    this.unregister = this.translateService.registerLanguageChange(() => this.render());

    this.render();
  }

  disconnectedCallback(): void {
    this.unregister();
  }

  private render(): void {
    this.span.innerText = this.translateService.get('HELLO_WORLD');
  }
}

customElements.define('di-consumer', ConsumerComponent);
