import { Inject } from '../../src';
import { TranslateService } from '../services';

const template = document.createElement('template');
template.innerHTML = `
  <td class="id"></td>
  <td class="text"></td>
  <td><a target="_blank"></a></td>
`;

export class PokeListItemComponent extends HTMLTableRowElement {
  @Inject() translateService: TranslateService;

  private idElement: HTMLElement;
  private textElement: HTMLTableCellElement;
  private linkElement: HTMLAnchorElement;

  constructor() {
    super();

    this.appendChild(template.content.cloneNode(true));

    this.idElement = this.querySelector('.id') as HTMLTableCellElement;
    this.textElement = this.querySelector('.text') as HTMLTableCellElement;
    this.linkElement = this.querySelector('a')!;
  }

  static get observedAttributes() {
    return ['id', 'link', 'text'];
  }

  set link(value: string) {
    this.linkElement.href = value;
  }

  set id(value: string) {
    this.idElement.innerText = value;
  }

  set text(value: string) {
    this.textElement.innerText = value;
  }

  connectedCallback() {
    this.linkElement.innerText = this.translateService.get('POKE_LIST_DETAILS');
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    if (oldVal !== newVal) {
      // @ts-ignore
      this[name] = newVal;
    }
  }
}

customElements.define('di-poke-list-item', PokeListItemComponent, { extends: 'tr' });
