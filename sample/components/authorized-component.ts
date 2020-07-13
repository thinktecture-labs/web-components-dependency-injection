import { ContainerProvider } from '../../src';
import { AuthorizedConsoleLogger, AuthorizedHttpClient, HttpClient, Logger } from '../services';
import { ShadowComponent } from './shadow-component';

const template = document.createElement('template');
template.innerHTML = '<slot></slot>';

@ContainerProvider([
  { provide: Logger, useClass: AuthorizedConsoleLogger },
  { provide: HttpClient, useClass: AuthorizedHttpClient },
])
export class AuthorizedComponent extends ShadowComponent(template) {
  constructor() {
    super();
  }
}

customElements.define('di-authorized', AuthorizedComponent);
