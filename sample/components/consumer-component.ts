import { Inject } from '../../src';
import { HttpLogger, Logger } from '../services';

const template = document.createElement('template');

template.innerHTML = `
  <h1>Hallo</h1>
`;

export class ConsumerComponent extends HTMLElement {
  @Inject('logger')
  logger?: Logger;

  @Inject('http')
  httpLogger?: HttpLogger;

  shadow: any;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log('Hier drunter sollte ein CREATING COMPONENT A stehen');
    this.logger?.log('Creating Component A');
    this.httpLogger?.log('HTTP Creating Component A');
    console.log('Hier drüber sollte ein CREATING COMPONENT A stehen');
  }
}

customElements.define('di-consumer', ConsumerComponent);
