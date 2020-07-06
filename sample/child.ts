import { ContainerProvider } from "../src/container";
import { ConsoleLog2 } from "./logger";

const template = document.createElement("template");
template.innerHTML = "<slot></slot>";

@ContainerProvider([{ a: "logger", b: ConsoleLog2 }])
export class ComponentMain extends HTMLElement {
  shadow: any;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "closed" });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log("Child CC");
  }
}

customElements.define("component-child", ComponentMain);
