import { ContainerProvider } from '../../src';
import { ConsoleWarn, Logger } from '../services';
import { ShadowComponent } from './shadow-component';

const template = document.createElement('template');
template.innerHTML = '<slot></slot>';

@ContainerProvider([{ provide: Logger, useClass: ConsoleWarn }])
export class ChildComponent extends ShadowComponent(template) {
  constructor() {
    super();
  }
}

customElements.define('di-child', ChildComponent);
