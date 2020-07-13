import { Inject } from '../../src';
import { HttpLogger, Logger } from '../services';
import { TranslateService } from '../services/translate';
import { ShadowComponent } from './shadow-component';

const template = document.createElement('template');
template.innerHTML = `
  <span></span>
`;

export class ConsumerComponent extends ShadowComponent(template) {
  @Inject() private readonly logger: Logger;
  @Inject() private readonly httpLogger: HttpLogger;
  @Inject() private readonly translateService: TranslateService;

  private readonly span: HTMLSpanElement;
  private unregister = () => {};

  constructor() {
    super();

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
