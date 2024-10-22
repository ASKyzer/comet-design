import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("demo-not-found")
export class DemoNotFound extends LitElement {
  render() {
    return html`<h1>The page you are looking for does not exist.</h1>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-not-found": DemoNotFound;
  }
}
