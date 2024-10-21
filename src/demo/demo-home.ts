import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("demo-home")
export class DemoHome extends LitElement {
  render() {
    return html`
      <h1 margin-top: 0">
        Comet Design System
      </h1>
    `;
  }

  static styles = css``;
}
