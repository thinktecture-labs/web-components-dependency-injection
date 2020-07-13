export const Shadow = (template: HTMLTemplateElement) => {
  return class extends HTMLElement {
    protected shadow: ShadowRoot;

    constructor() {
      super();

      this.shadow = this.attachShadow({ mode: 'closed' });
      this.shadow.appendChild(template.content.cloneNode(true));
    }
  };
};
