import { Router } from "@vaadin/router";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("demo-not-found")
export class DemoNotFound extends LitElement {
  private navigateHome() {
    Router.go("/");
  }

  render() {
    return html`
      <div class="container">
        <h1>404: Page Not Found</h1>
        <p>Oops! It seems you've ventured into uncharted space.</p>
        <p>
          The page you are looking for doesn't exist or may have been moved.
        </p>

        <vaadin-button @click=${this.navigateHome} theme="primary">
          Return to Home
        </vaadin-button>
      </div>
    `;
  }

  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-family: var(--lumo-font-family);
      color: var(--comet-color-font-dark);
    }

    .logo {
      width: 150px;
      height: auto;
      margin-bottom: 2rem;
    }

    h1 {
      color: var(--primary-50);
      font-size: var(--lumo-font-size-xxl);
      margin-bottom: 1rem;
    }

    p {
      font-size: var(--lumo-font-size-m);
      margin-bottom: 0.5rem;
    }

    vaadin-button {
      margin-top: 2rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-not-found": DemoNotFound;
  }
}
