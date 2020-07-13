import { Inject } from '../../src';
import { HttpClient, Logger, Shadow, TranslateService } from '../services';

const template = document.createElement('template');
template.innerHTML = `

<style>
  header {
    font-size: 150%;
    font-weight: bold;
    text-align: center;
    margin-bottom: var(--gap);
  }

  table {
    border-spacing: 0;
  }

  th {
    padding: calc(var(--gap) / 2);
  }

  thead tr {
    background-color: var(--primary-color);
    color: white;
  }

  tbody td.id {
    text-align: center;
  }

  tbody tr:nth-child(odd) {
    background-color: lightgray;
  }

  a {
    text-decoration: none;
    color: var(--primary-color);
  }

  slot {
    display:none;
  }
</style>

<header>Pokemon List</header>

<table>
  <thead>
    <tr>
      <th id="id"></th>
      <th id="name"></th>
      <th></th>
    </tr>
  </thead>
  <tbody>

  </tbody>
</table>

<slot name="list-item"></slot>
`;

interface Pokemon {
  id: string;
  name: string;
  url: string;
}

export class PokeListComponent extends Shadow(template) {
  @Inject() private readonly logger: Logger;
  @Inject() private readonly translateService: TranslateService;
  @Inject() private readonly httpClient: HttpClient;
  private pokemons?: Pokemon[];
  private table: {
    headId: HTMLTableHeaderCellElement;
    headName: HTMLTableHeaderCellElement;
    body: HTMLTableSectionElement;
  };
  private listItemTemplate?: HTMLTemplateElement;

  constructor() {
    super();

    this.table = {
      body: this.shadow.querySelector('tbody')!,
      headId: this.shadow.querySelector('#id') as HTMLTableHeaderCellElement,
      headName: this.shadow.querySelector('#name') as HTMLTableHeaderCellElement,
    };

    const slot = this.shadow.querySelector('slot') as HTMLSlotElement;
    slot.addEventListener('slotchange', () => {
      const [listItem] = slot.assignedNodes();

      if (listItem) {
        this.listItemTemplate = listItem as HTMLTemplateElement;
        this.render();
      }
    });
  }

  connectedCallback(): void {
    this.unregister = this.translateService.registerLanguageChange(() => this.render());

    this.render();

    this.loadData().then(() => this.render());
  }

  disconnectedCallback(): void {
    this.unregister();
  }

  private unregister = () => {};

  private render(): void {
    this.table.headId.innerText = this.translateService.get('POKE_LIST_ID');
    this.table.headName.innerText = this.translateService.get('POKE_LIST_NAME');

    this.table.body.innerHTML = '';

    if (!this.pokemons || !this.listItemTemplate) {
      return;
    }

    this.pokemons.forEach((pokemon) => {
      const rowFragment = this.listItemTemplate!.content.cloneNode(true) as HTMLElement;
      const row = rowFragment.firstElementChild!;
      this.table.body.appendChild(row);

      row.setAttribute('id', pokemon.id);
      row.setAttribute('text', pokemon.name);
      row.setAttribute('link', pokemon.url);
    });
  }

  private async loadData(): Promise<void> {
    this.logger.log('[POKELIST] Requesting pokemon list...');

    const { results } = await this.httpClient.get<{ results: Pokemon[] }>('https://pokeapi.co/api/v2/pokemon');

    this.logger.log(`[POKELIST] Got results, count: ${results.length}`);

    this.pokemons = results.map((pokemon) => {
      const { name, url, split } = { ...pokemon, split: pokemon.url.split('/') };

      return {
        id: split[split.length - 2],
        name,
        url,
      };
    });
  }
}

customElements.define('di-poke-list', PokeListComponent);
