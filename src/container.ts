// from: https://github.com/thinktecture-labs/dependency-injection-poc

import 'reflect-metadata';

const KEY_IS_INJECTABLE = Symbol('IS_INJECTABLE');
const KEY_PARAMS = 'design:paramtypes';

export interface Token<T> extends Function {
  new (...args: any[]): T;
}

interface Item<T> {
  clazz: Token<T>;
  instance?: T;
}

export class Container {
  private readonly container = new Map<Function, Item<any>>();

  provide<T>(token: Token<T>, clazz?: Token<T>) {
    const actualClass = clazz || token;
    if (actualClass.prototype.constructor.length && !this.isInjectable(actualClass)) {
      throw new Error(`${actualClass.name} is not decorated!`);
    }
    this.container.set(token, { clazz: actualClass });
  }

  get<T>(token: Token<T>): T {
    const item = this.container.get(token);
    if (!item) {
      throw new Error(`Nothing found for token ${token.name}`);
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
