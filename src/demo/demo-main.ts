import { Route, Router } from "@vaadin/router";
import "@vaadin/tabs";
import { css, html, LitElement, PropertyValues } from "lit";
import { customElement } from "lit/decorators.js";
import "./comet/demo-accordion";
import "./comet/demo-badge";
import "./comet/demo-banner";
import "./comet/demo-calendar";
import "./comet/demo-card";
import "./comet/demo-color-picker";
import "./comet/demo-comet-button";
import "./comet/demo-comet-date-picker";
import "./comet/demo-comet-default-button";
import "./comet/demo-comet-multi-select";
import "./comet/demo-comet-select";
import "./comet/demo-details-card";
import "./comet/demo-features-banner";
import "./comet/demo-feedback-message";
import "./comet/demo-icon";
import "./comet/demo-loading-spinner";
import "./comet/demo-options";
import "./comet/demo-options-categorized";
import "./comet/demo-pill";
import "./comet/demo-result";
import "./comet/demo-searchbar";
import "./comet/demo-selection-card";
import "./comet/demo-sidebar";
import "./comet/demo-skeleton";
import "./comet/demo-small-card";
import "./comet/demo-stages";
import "./comet/demo-summary";
import "./comet/demo-timeline";
import "./comet/demo-toggle";
import "./demo-home";
import "./vaadin/demo-button";

@customElement("demo-main")
export class DemoMain extends LitElement {
  router: Router | null = null;
  private routes: Route[] = [
    { path: "/", component: "demo-home" },
    { path: "/accordion", component: "demo-accordion" },
    { path: "/badge", component: "demo-badge" },
    { path: "/banner", component: "demo-banner" },
    { path: "/button", component: "demo-button" },
    { path: "/calendar", component: "demo-calendar" },
    { path: "/card", component: "demo-card" },
    { path: "/color-picker", component: "demo-color-picker" },
    { path: "/comet-button", component: "demo-comet-button" },
    { path: "/comet-date-picker", component: "demo-comet-date-picker" },
    {
      path: "/comet-default-button",
      component: "demo-comet-default-button",
    },
    { path: "/comet-multi-select", component: "demo-comet-multi-select" },
    { path: "/comet-select", component: "demo-comet-select" },
    { path: "/details-card", component: "demo-details-card" },
    { path: "/features-banner", component: "demo-features-banner" },
    { path: "/feedback-message", component: "demo-feedback-message" },
    { path: "/icon", component: "demo-icon" },
    { path: "/loading-spinner", component: "demo-loading-spinner" },
    { path: "/options", component: "demo-options" },
    { path: "/options-categorized", component: "demo-options-categorized" },
    { path: "/pill", component: "demo-comet-pill" },
    { path: "/result", component: "demo-result" },
    { path: "/selection-card", component: "demo-selection-card" },
    { path: "/sidebar", component: "demo-sidebar" },
    { path: "/skeleton", component: "demo-skeleton" },
    { path: "/small-card", component: "demo-small-card" },
    { path: "/summary", component: "demo-summary" },
    { path: "/stages", component: "demo-stages" },
    { path: "/searchbar", component: "demo-searchbar" },
    { path: "/timeline", component: "demo-timeline" },
    { path: "/toggle", component: "demo-toggle" },
  ];

  protected firstUpdated(_changedProperties: PropertyValues) {
    const outlet = this.shadowRoot?.querySelector("#outlet") as HTMLElement;
    if (outlet && !this.router) {
      this.router = new Router(outlet);
      this.router.setRoutes(this.routes);
    }
  }

  render() {
    return html`<div class="container">
        <vaadin-tabs>
          <vaadin-tab><a href="/">Home</a></vaadin-tab>
          <vaadin-tab><a href="/accordion">Accordion</a></vaadin-tab>
          <vaadin-tab><a href="/badge">Badge</a></vaadin-tab>
          <vaadin-tab><a href="/banner">Banner</a></vaadin-tab>
          <vaadin-tab><a href="/button">Button</a></vaadin-tab>
          <vaadin-tab><a href="/calendar">Calendar</a></vaadin-tab>
          <vaadin-tab><a href="/card">Card</a></vaadin-tab>
          <vaadin-tab><a href="/color-picker">Color Picker</a></vaadin-tab>
          <vaadin-tab><a href="/comet-button">Comet Button</a></vaadin-tab>
          <vaadin-tab
            ><a href="/comet-date-picker">Comet Date Picker</a></vaadin-tab
          >
          <vaadin-tab
            ><a href="/comet-default-button"
              >Comet Default Button</a
            ></vaadin-tab
          >
          <vaadin-tab><a href="/comet-select">Comet Select</a></vaadin-tab>
          <vaadin-tab
            ><a href="/comet-multi-select">Comet Multi Select</a></vaadin-tab
          >
          <vaadin-tab><a href="/details-card">Details Card</a></vaadin-tab>
          <vaadin-tab
            ><a href="/features-banner">Features Banner</a></vaadin-tab
          >
          <vaadin-tab
            ><a href="/feedback-message">Feedback Message</a></vaadin-tab
          >
          <vaadin-tab><a href="/icon">Icon</a></vaadin-tab>
          <vaadin-tab
            ><a href="/loading-spinner">Loading Spinner</a></vaadin-tab
          >
          <vaadin-tab><a href="/options">Options</a></vaadin-tab>
          <vaadin-tab
            ><a href="/options-categorized">Options Categorized</a></vaadin-tab
          >
          <vaadin-tab><a href="/pill">Pill</a></vaadin-tab>
          <vaadin-tab><a href="/result">Result</a></vaadin-tab>
          <vaadin-tab><a href="/searchbar">Searchbar</a></vaadin-tab>
          <vaadin-tab><a href="/selection-card">Selection Card</a></vaadin-tab>
          <vaadin-tab><a href="/sidebar">Sidebar</a></vaadin-tab>
          <vaadin-tab><a href="/skeleton">Skeleton</a></vaadin-tab>
          <vaadin-tab><a href="/small-card">Small Card</a></vaadin-tab>
          <vaadin-tab><a href="/stages">Stages</a></vaadin-tab>
          <vaadin-tab><a href="/summary">Summary</a></vaadin-tab>
          <vaadin-tab><a href="/timeline">Timeline</a></vaadin-tab>
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

    vaadin-tab {
      white-space: nowrap;
    }
  `;
}
