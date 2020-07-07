import { Container, Token } from './container';

interface Provider<T> {
  provide: Token<T>;
  useClass?: Token<T>;
}

export function ContainerProvider(providers: Provider<any>[]) {
  const container = new Container();
  providers.forEach(({ provide, useClass }) => {
    container.provide(provide, useClass);
  });

  return (target: any) => {
    const connectedCallback = target.prototype.connectedCallback;

    target.prototype.connectedCallback = function () {
      this.addEventListener('request', (event: CustomEvent) => {
        try {
          event.detail.instance = container.get(event.detail.type);
          event.stopPropagation();
        } catch {}
      });

      if (connectedCallback) {
        connectedCallback();
      }
    };

    return target;
  };
}
