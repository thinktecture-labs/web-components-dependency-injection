import { ContainerProvider } from '../../src';
import { ConsoleLogger, HttpClient, Logger, Shadow, TranslateService } from '../services';

const template = document.createElement('template');
template.innerHTML = `
<style>
  :host {
    --primary-color: #ff2d21;
    --background-color: #f9f8f7;
    --gap: 1rem;

    display: block;
    background-color: var(--background-color);
  }
</style>

<slot></slot>
`;

@ContainerProvider([
  { provide: Logger, useClass: ConsoleLogger },
  { provide: TranslateService },
  { provide: HttpClient },
])
export class RootComponent extends Shadow(template) {
  constructor() {
    super();
  }
}

customElements.define('di-root', RootComponent);
