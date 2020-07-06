import { ContainerProvider } from '../src/container';
import { HttpConsoleLog } from './http';
import { ConsoleLog } from './logger';

const template = document.createElement('template');
template.innerHTML = '<slot></slot>';

@ContainerProvider([
  { a: 'logger', b: ConsoleLog },
  { a: 'http', b: HttpConsoleLog },
])
export class ComponentMain extends HTMLElement {
  shadow: any;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log('Main CC');
  }
}

customElements.define('component-main', ComponentMain);
