import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("comet-first")
export default class CometFirstComponent extends LitElement {
  @property({ type: String })
  name = "World";

  render() {
    return html`<h1>Hello, ${this.name}!</h1>`;
  }

  static styles = css`
    :host {
      color: var(--lumo-primary-text-color);
      font-size: 2rem;
    }
  `;
}
