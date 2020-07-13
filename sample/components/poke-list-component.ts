import { Inject } from '../../src';
import { HttpClient, Logger, TranslateService } from '../services';
import { ShadowComponent } from './shadow-component';

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
`;

const tableRowTemplate = document.createElement('template');
tableRowTemplate.innerHTML = `
<tr>
  <td class="id"></td>
  <td></td>
  <td><a target="_blank"></a></td>
</tr>
`;

interface Pokemon {
  id: string;
  name: string;
  url: string;
}

export class PokeListComponent extends ShadowComponent(template) {
  @Inject() private readonly logger: Logger;
  @Inject() private readonly translateService: TranslateService;
  @Inject() private readonly httpClient: HttpClient;

  private unregister = () => {};
  private pokemons?: Pokemon[];
  private table: {
    headId: HTMLTableHeaderCellElement;
    headName: HTMLTableHeaderCellElement;
    body: HTMLTableSectionElement;
  };

  constructor() {
    super();

    this.table = {
      body: this.shadow.querySelector('tbody')!,
      headId: this.shadow.querySelector('#id') as HTMLTableHeaderCellElement,
      headName: this.shadow.querySelector('#name') as HTMLTableHeaderCellElement,
    };
  }

  connectedCallback(): void {
    this.unregister = this.translateService.registerLanguageChange(() => this.render());

    this.render();

    this.loadData().then(() => this.render());
  }

  disconnectedCallback(): void {
    this.unregister();
  }

  private render(): void {
    this.table.headId.innerText = this.translateService.get('POKE_LIST_ID');
    this.table.headName.innerText = this.translateService.get('POKE_LIST_NAME');

    this.table.body.innerHTML = '';

    if (!this.pokemons) {
      return;
    }

    this.pokemons.forEach((pokemon) => {
      const row = tableRowTemplate.content.cloneNode(true) as HTMLElement;

      const [id, name] = row.querySelectorAll('td');
      const link = row.querySelector('a')!;

      id.innerText = pokemon.id;
      name.innerText = pokemon.name;
      link.href = pokemon.url;
      link.innerText = this.translateService.get('POKE_LIST_DETAILS');

      this.table.body.appendChild(row);
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
