import { Inject } from '../../src';
import { Shadow, TranslateService } from '../services';

const template = document.createElement('template');
template.innerHTML = `
<style>
  ul {
    list-style-type: none;
    display: flex;
  }

  li.active {
    text-decoration: underline;
  }

  li:hover {
    cursor: pointer;
  }

  li + li {
    margin-left: calc(var(--gap) / 2);
    border-left: 2px solid var(--background-color);
    padding-left: calc(var(--gap) / 2);
  }
</style>

<ul></ul>
`;

export class LanguageSwitcherComponent extends Shadow(template) {
  @Inject() private readonly translateService: TranslateService;

  private readonly ul: HTMLUListElement;
  private unregister = () => {};

  constructor() {
    super();

    this.ul = this.shadow.querySelector('ul')!;
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

    this.translateService.languages().forEach(({ id, caption, active }) => {
      const li = document.createElement('li');

      li.innerText = id;
      li.addEventListener('click', () => this.translateService.setLanguage(id));

      if (active) {
        li.classList.add('active');
      }

      this.ul.appendChild(li);
    });
  }
}

customElements.define('di-language-switcher', LanguageSwitcherComponent);
