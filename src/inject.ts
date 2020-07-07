interface DiRequest {
  type?: any;
  instance?: any;
}

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
