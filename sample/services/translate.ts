interface Translations {
  [key: string]: string;
}

const GERMAN: Translations = {
  DE: 'Deutsch',
  EN: 'Englisch',
  HELLO_WORLD: 'Hallo Welt!',
};

const ENGLISH: Translations = {
  DE: 'German',
  EN: 'English',
  HELLO_WORLD: 'Hello World!',
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

  languages(): { id: string; caption: string }[] {
    const translations = this.currentLanguage.translations;
    return LANGUAGES.map(({ id }) => ({ id, caption: translations[id] }));
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
