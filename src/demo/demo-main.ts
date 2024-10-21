import { Route, Router } from "@vaadin/router";
import { css, html, LitElement, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import "./comet/demo-first";
import "./demo-home";

@customElement("demo-main")
export class DemoMain extends LitElement {
  router: Router | null = null;
  protected firstUpdated(_changedProperties: PropertyValues) {
    if (!this.router) {
      this.router = new Router(this.shadowRoot?.querySelector("#outlet"));
      this.router.setRoutes([
        {
          path: "/",
          component: "demo-home",
        },
        { path: "/first", component: "demo-first" },
      ] as Route[]);
    }
  }

  render() {
    return html`<div class="container">
        <vaadin-tabs>
          <vaadin-tab><a href="/">Home</a></vaadin-tab>
          <vaadin-tab><a href="/first">First</a></vaadin-tab>
        </vaadin-tabs>
      </div>
      <main id="outlet"></main>`;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
      text-decoration: none;
    }

    .container {
      padding: 24px;
    }

    a {
      color: var(--primary-50);
      text-decoration: none;
    }

    main {
      padding: 32px;
    }

    vaadin-tabs {
      display: flex;
      justify-content: flex-start;
      gap: 16px;
    }
  `;
}
