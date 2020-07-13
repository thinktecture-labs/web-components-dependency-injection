interface Translations {
  [key: string]: string;
}

const GERMAN: Translations = {
  DE: 'Deutsch',
  EN: 'Englisch',
  POKE_LIST_ID: 'Eindeutige Nummer',
  POKE_LIST_NAME: 'Name des Pokémons',
  POKE_LIST_DETAILS: '[ Weitere Details ]',
};

const ENGLISH: Translations = {
  DE: 'German',
  EN: 'English',
  POKE_LIST_ID: 'Unique Identifier',
  POKE_LIST_NAME: 'Name of the pokémon',
  POKE_LIST_DETAILS: '[ Further details ]',
};

const LANGUAGES = [
  { id: 'DE', translations: GERMAN },
  { id: 'EN', translations: ENGLISH },
];

export class TranslateService {
  private currentLanguage = LANGUAGES[0];
  private observers: (() => void)[] = [];

  get(key: string): string {
    return this.currentLanguage.translations[key];
  }

  setLanguage(language: string): void {
    const foundTranslations = LANGUAGES.find(({ id }) => id === language);
    if (foundTranslations) {
      this.currentLanguage = foundTranslations;
      this.notifyLanguageChange();
    }
  }

  languages(): { id: string; caption: string; active: boolean }[] {
    const translations = this.currentLanguage.translations;
    return LANGUAGES.map(({ id }) => ({ id, caption: translations[id], active: id === this.currentLanguage.id }));
  }

  registerLanguageChange(fn: () => void): () => void {
    const removeObserver = () => {
      this.observers = this.observers.filter((observer) => observer !== fn);
    };

    removeObserver();
    this.observers = [...this.observers, fn];

    return removeObserver;
  }

  private notifyLanguageChange(): void {
    this.observers.forEach((fn) => fn());
  }
}
