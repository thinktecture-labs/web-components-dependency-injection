// from: https://github.com/thinktecture-labs/dependency-injection-poc

import 'reflect-metadata';

const KEY_IS_INJECTABLE = Symbol('IS_INJECTABLE');
const KEY_PARAMS = 'design:paramtypes';

interface DiRequest {
  type?: any;
  instance?: any;
}

console.log('Hallo i bims');

export function Inject(type: string) {
  return function (target: any, name: string) {
    Object.defineProperty(target, name, {
      get(): any {
        const event = new CustomEvent<DiRequest>('request', {
          detail: {
            type,
          },
          bubbles: true,
          composed: true,
        });

        this.dispatchEvent(event);

        return event.detail.instance;
      },
    });

    return target;
  };
}

export function ContainerProvider(providers: { a; b }[], name?: string) {
  console.log('Creating provider', name);
  const container = new Container();
  providers.forEach((provider) => container.provide(provider.a, provider.b));

  return function (target: any) {
    const connectedCallback = target.prototype.connectedCallback;

    target.prototype.connectedCallback = function () {
      this.addEventListener('request', (event: CustomEvent) => {
        let instance;

        try {
          instance = container.get(event.detail.type);

          if (instance) {
            event.stopPropagation();
          }
        } catch {}

        event.detail.instance = instance;
      });

      connectedCallback();
    };

    return target;
  };
}

interface Token<T> extends Function {
  new (...args: any[]): T;
}

interface Item<T> {
  clazz: Token<T>;
  instance?: T;
}

export class Container {
  private readonly container = new Map<string, Item<any>>();

  provide<T>(token: any, clazz?: any) {
    /*const actualClass = clazz || token;
    if (actualClass.prototype.constructor.length && !this.isInjectable(actualClass)) {
      throw new Error(`${actualClass.name} is not decorated!`);
    }*/
    this.container.set(token, { clazz });
  }

  get<T>(token: string): T {
    const item = this.container.get(token);
    if (!item) {
      throw new Error(`Nothing found for token ${token}`);
    }

    const { clazz, instance } = item;

    if (!instance) {
      const params = this.getInjectedParams(clazz);
      const newInstance = Reflect.construct(clazz, params);
      this.container.set(token, { clazz, instance: newInstance });
      return newInstance;
    }

    return instance;
  }

  // Check if target is decorated
  private isInjectable(target: Function): boolean {
    return Reflect.getMetadata(KEY_IS_INJECTABLE, target) === true;
  }

  // Read type information from metadata
  private getInjectedParams(clazz: Function): any[] {
    const argTypes = Reflect.getMetadata(KEY_PARAMS, clazz);
    if (argTypes === undefined) {
      return [];
    }
    return argTypes.map((token) => this.get(token));
  }
}
