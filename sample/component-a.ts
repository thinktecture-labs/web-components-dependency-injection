import { ContainerProvider, Inject } from "../src/container";
import { HttpLogger } from "./http";
import { ConsoleLog, Logger } from "./logger";

const template = document.createElement("template");

template.innerHTML = `
  <h1>Hallo</h1>
`;

export class ComponentA extends HTMLElement {
  @Inject("logger")
  logger?: Logger;

  @Inject("http")
  httpLogger?: HttpLogger;

  shadow: any;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "closed" });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log("Hier drunter sollte ein CREATING COMPONENT A stehen");
    this.logger?.log("Creating Component A");
    this.httpLogger?.log("HTTP Creating Component A");
    console.log("Hier drüber sollte ein CREATING COMPONENT A stehen");
  }
}

customElements.define("component-a", ComponentA);
