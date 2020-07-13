import { ContainerProvider } from '../../src';
import { ConsoleLog, HttpConsoleLog, HttpLogger, Logger } from '../services';
import { TranslateService } from '../services/translate';
import { ShadowComponent } from './shadow-component';

const template = document.createElement('template');
template.innerHTML = `
<style>
  :host {
    --primary-color: #ff2d21;
    --background-color: #f9f8f7;

    display: block;
    background-color: var(--background-color);
  }
</style>


<slot></slot>

`;

@ContainerProvider([
  { provide: Logger, useClass: ConsoleLog },
  { provide: HttpLogger, useClass: HttpConsoleLog },
  { provide: TranslateService },
])
export class RootComponent extends ShadowComponent(template) {
  constructor() {
    super();
  }
}

customElements.define('di-root', RootComponent);
