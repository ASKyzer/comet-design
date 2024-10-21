import { Route, Router } from "@vaadin/router";
import { css, html, LitElement, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import "./comet/demo-accordion";
import "./comet/demo-badge";
import "./comet/demo-card";
import "./comet/demo-comet-button";
import "./comet/demo-comet-default-button";
import "./comet/demo-icon";
import "./comet/demo-small-card";
import "./comet/demo-toggle";
import "./demo-home";
import "./vaadin/demo-button";

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
        { path: "/accordion", component: "demo-accordion" },
        { path: "/badge", component: "demo-badge" },
        { path: "/button", component: "demo-button" },
        { path: "/card", component: "demo-card" },
        { path: "/comet-button", component: "demo-comet-button" },
        {
          path: "/comet-default-button",
          component: "demo-comet-default-button",
        },
        { path: "/icon", component: "demo-icon" },
        { path: "/small-card", component: "demo-small-card" },
        { path: "/toggle", component: "demo-toggle" },
      ] as Route[]);
    }
  }

  render() {
    return html`<div class="container">
        <vaadin-tabs>
          <vaadin-tab><a href="/">Home</a></vaadin-tab>
          <vaadin-tab><a href="/accordion">Accordion</a></vaadin-tab>
          <vaadin-tab><a href="/badge">Badge</a></vaadin-tab>
          <vaadin-tab><a href="/button">Button</a></vaadin-tab>
          <vaadin-tab><a href="/card">Card</a></vaadin-tab>
          <vaadin-tab><a href="/comet-button">Comet Button</a></vaadin-tab>
          <vaadin-tab
            ><a href="/comet-default-button"
              >Comet Default Button</a
            ></vaadin-tab
          >
          <vaadin-tab><a href="/icon">Icon</a></vaadin-tab>
          <vaadin-tab><a href="/small-card">Small Card</a></vaadin-tab>
          <vaadin-tab><a href="/toggle">Toggle</a></vaadin-tab>
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