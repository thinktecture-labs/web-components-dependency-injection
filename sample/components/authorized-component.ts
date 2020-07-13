import { ContainerProvider } from '../../src';
import { AuthorizedConsoleLogger, AuthorizedHttpClient, HttpClient, Logger } from '../services';
import { Shadow } from '../services/shadow';

const template = document.createElement('template');
template.innerHTML = '<slot></slot>';

@ContainerProvider([
  { provide: Logger, useClass: AuthorizedConsoleLogger },
  { provide: HttpClient, useClass: AuthorizedHttpClient },
])
export class AuthorizedComponent extends Shadow(template) {
  constructor() {
    super();
  }
}

customElements.define('di-authorized', AuthorizedComponent);
