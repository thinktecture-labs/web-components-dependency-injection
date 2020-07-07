import { Container } from './container';

interface Provider {
  provide: string;
  useClass: any;
}

export function ContainerProvider(providers: Provider[], name?: string) {
  console.log('Providing Container', name);

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

      connectedCallback();
    };

    return target;
  };
}
