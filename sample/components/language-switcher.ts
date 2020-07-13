import { Inject } from '../../src';
import { TranslateService } from '../services/translate';

const template = document.createElement('template');
template.innerHTML = `
  <ul></ul>
`;

export class LanguageSwitcherComponent extends HTMLElement {
  @Inject() private readonly translateService: TranslateService;

  private shadow: ShadowRoot;
  private readonly ul: HTMLUListElement;
  private unregister = () => {};

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(template.content.cloneNode(true));

    this.ul = this.shadow.querySelector('ul');
  }

  connectedCallback(): void {
    this.unregister = this.translateService.registerLanguageChange(() => this.render());

    this.render();
  }

  disconnectedCallback(): void {
    this.unregister();
  }

  private render(): void {
    while (this.ul.firstChild) {
      this.ul.removeChild(this.ul.firstChild);
    }

    this.translateService.languages().forEach(({ id, caption }) => {
      const li = document.createElement('li');
      li.innerHTML = caption;
      li.addEventListener('click', () => this.translateService.setLanguage(id));
      this.ul.appendChild(li);
    });
  }
}

customElements.define('di-language-switcher', LanguageSwitcherComponent);
