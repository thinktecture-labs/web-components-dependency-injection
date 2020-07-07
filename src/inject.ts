import { Token } from './container';

interface DiRequest {
  type?: any;
  instance?: any;
}

function makeRequestEvent(type: Token<any>): CustomEvent<DiRequest> {
  return new CustomEvent<DiRequest>('request', {
    detail: { type },
    bubbles: true,
    composed: true,
  });
}

export function Inject(type?: Token<any>) {
  return (target: any, name: string) => {
    const paramType = type || Reflect.getMetadata('design:type', target, name);

    const property = {
      get(): any {
        const event = makeRequestEvent(paramType);
        this.dispatchEvent(event);
        return event.detail.instance;
      },
    };

    Object.defineProperty(target, name, property);

    return target;
  };
}
