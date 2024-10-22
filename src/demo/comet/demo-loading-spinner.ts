import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/loading-spinner/comet-loading-spinner";

@customElement("demo-loading-spinner")
export class DemoLoadingSpinner extends LitElement {
  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0;">
        Comet Loading Spinner
      </h1>
      <div class="container">
        <h1
          style="color: var(--primary-50); margin-bottom: 24px; text-align: center"
        >
          Large (default)
        </h1>
        <loading-spinner></loading-spinner>
        <h1
          style="color: var(--primary-50); margin-bottom: 24px; text-align: center"
        >
          Small
        </h1>
        <loading-spinner size="small"></loading-spinner>
        <h1
          style="color: var(--primary-50); margin-bottom: 24px; text-align: center"
        >
          Medium with loading message
        </h1>
        <loading-spinner size="medium" message="Loading..."></loading-spinner>
      </div>
    `;
  }

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 48px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-loading-spinner": DemoLoadingSpinner;
  }
}
