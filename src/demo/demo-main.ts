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
import "./comet/demo-step";
import "./comet/demo-stepper";
import "./comet/demo-summary";
import "./comet/demo-table";
import "./comet/demo-timeline";
import "./comet/demo-toggle";
import "./demo-home";
import "./demo-not-found";
import "./vaadin/demo-avatar";
import "./vaadin/demo-button";
import "./vaadin/demo-checkbox";
import "./vaadin/demo-combo-box";
import "./vaadin/demo-confirm-dialog";
import "./vaadin/demo-context-menu";
import "./vaadin/demo-custom-field";
import "./vaadin/demo-date-picker";
import "./vaadin/demo-dialog";
import "./vaadin/demo-email-field";
import "./vaadin/demo-form-layout";
import "./vaadin/demo-integer-field";
import "./vaadin/demo-multi-select-combo-box";
import "./vaadin/demo-notification";
import "./vaadin/demo-number-field";
import "./vaadin/demo-password-field";
import "./vaadin/demo-progress-bar";
import "./vaadin/demo-radio-button";
import "./vaadin/demo-select";
import "./vaadin/demo-tabs";
import "./vaadin/demo-text-area";
import "./vaadin/demo-text-field";
import "./vaadin/demo-time-picker";
import "./vaadin/demo-tooltip";
import "./vaadin/demo-upload";

@customElement("demo-main")
export class DemoMain extends LitElement {
  router: Router | null = null;
  private routes: Route[] = [
    { path: "/", component: "demo-home" },
    { path: "/accordion", component: "demo-accordion" },
    { path: "/avatar", component: "demo-avatar" },
    { path: "/badge", component: "demo-badge" },
    { path: "/banner", component: "demo-banner" },
    { path: "/button", component: "demo-button" },
    { path: "/calendar", component: "demo-calendar" },
    { path: "/card", component: "demo-card" },
    { path: "/checkbox", component: "demo-checkbox" },
    { path: "/color-picker", component: "demo-color-picker" },
    { path: "/combo-box", component: "demo-combo-box" },
    { path: "/comet-button", component: "demo-comet-button" },
    { path: "/comet-date-picker", component: "demo-comet-date-picker" },
    {
      path: "/comet-default-button",
      component: "demo-comet-default-button",
    },
    { path: "/comet-multi-select", component: "demo-comet-multi-select" },
    { path: "/comet-select", component: "demo-comet-select" },
    { path: "/confirm-dialog", component: "demo-confirm-dialog" },
    { path: "/context-menu", component: "demo-context-menu" },
    { path: "/custom-field", component: "demo-custom-field" },
    { path: "/date-picker", component: "demo-date-picker" },
    { path: "/details-card", component: "demo-details-card" },
    { path: "/dialog", component: "demo-dialog" },
    { path: "/email-field", component: "demo-email-field" },
    { path: "/features-banner", component: "demo-features-banner" },
    { path: "/feedback-message", component: "demo-feedback-message" },
    { path: "/form-layout", component: "demo-form-layout" },
    { path: "/icon", component: "demo-icon" },
    { path: "/integer-field", component: "demo-integer-field" },
    { path: "/loading-spinner", component: "demo-loading-spinner" },
    { path: "/menu-bar", component: "demo-menu-bar" },
    {
      path: "/multi-select-combo-box",
      component: "demo-multi-select-combo-box",
    },
    { path: "/notification", component: "demo-notification" },
    { path: "/number-field", component: "demo-number-field" },
    { path: "/password-field", component: "demo-password-field" },
    { path: "/progress-bar", component: "demo-progress-bar" },
    { path: "/radio-button", component: "demo-radio-button" },
    { path: "/options", component: "demo-options" },
    { path: "/options-categorized", component: "demo-options-categorized" },
    { path: "/pill", component: "demo-comet-pill" },
    { path: "/result", component: "demo-result" },
    { path: "/searchbar", component: "demo-searchbar" },
    { path: "/select", component: "demo-select" },
    { path: "/selection-card", component: "demo-selection-card" },
    { path: "/sidebar", component: "demo-sidebar" },
    { path: "/skeleton", component: "demo-skeleton" },
    { path: "/small-card", component: "demo-small-card" },
    { path: "/step", component: "demo-step" },
    { path: "/stepper", component: "demo-stepper" },
    { path: "/summary", component: "demo-summary" },
    { path: "/stages", component: "demo-stages" },
    { path: "/table", component: "demo-table" },
    { path: "/tabs", component: "demo-tabs" },
    { path: "/text-area", component: "demo-text-area" },
    { path: "/text-field", component: "demo-text-field" },
    { path: "/time-picker", component: "demo-time-picker" },
    { path: "/tooltip", component: "demo-tooltip" },
    { path: "/upload", component: "demo-upload" },
    {
      path: "(.*)",
      component: "demo-not-found",
    },
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
          <vaadin-tab><a href="/avatar">Avatar</a></vaadin-tab>
          <vaadin-tab><a href="/badge">Badge</a></vaadin-tab>
          <vaadin-tab><a href="/banner">Banner</a></vaadin-tab>
          <vaadin-tab><a href="/button">Button</a></vaadin-tab>
          <vaadin-tab><a href="/calendar">Calendar</a></vaadin-tab>
          <vaadin-tab><a href="/card">Card</a></vaadin-tab>
          <vaadin-tab><a href="/checkbox">Checkbox</a></vaadin-tab>
          <vaadin-tab><a href="/color-picker">Color Picker</a></vaadin-tab>
          <vaadin-tab><a href="/combo-box">Combo Box</a></vaadin-tab>
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
          <vaadin-tab><a href="/confirm-dialog">Confirm Dialog</a></vaadin-tab>
          <vaadin-tab><a href="/context-menu">Context Menu</a></vaadin-tab>
          <vaadin-tab><a href="/custom-field">Custom Field</a></vaadin-tab>
          <vaadin-tab><a href="/date-picker">Date Picker</a></vaadin-tab>
          <vaadin-tab><a href="/details-card">Details Card</a></vaadin-tab>
          <vaadin-tab><a href="/dialog">Dialog</a></vaadin-tab>
          <vaadin-tab><a href="/email-field">Email Field</a></vaadin-tab>
          <vaadin-tab
            ><a href="/features-banner">Features Banner</a></vaadin-tab
          >
          <vaadin-tab
            ><a href="/feedback-message">Feedback Message</a></vaadin-tab
          >
          <vaadin-tab><a href="/form-layout">Form Layout</a></vaadin-tab>
          <vaadin-tab><a href="/icon">Icon</a></vaadin-tab>
          <vaadin-tab><a href="/integer-field">Integer Field</a></vaadin-tab>
          <vaadin-tab
            ><a href="/loading-spinner">Loading Spinner</a></vaadin-tab
          >
          <vaadin-tab
            ><a href="/multi-select-combo-box"
              >Multi Select Combo Box</a
            ></vaadin-tab
          >
          <vaadin-tab><a href="/notification">Notification</a></vaadin-tab>
          <vaadin-tab><a href="/number-field">Number Field</a></vaadin-tab>

          <vaadin-tab><a href="/options">Options</a></vaadin-tab>
          <vaadin-tab
            ><a href="/options-categorized">Options Categorized</a></vaadin-tab
          >
          <vaadin-tab><a href="/password-field">Password Field</a></vaadin-tab>
          <vaadin-tab><a href="/pill">Pill</a></vaadin-tab>
          <vaadin-tab><a href="/progress-bar">Progress Bar</a></vaadin-tab>
          <vaadin-tab><a href="/radio-button">Radio Button</a></vaadin-tab>
          <vaadin-tab><a href="/result">Result</a></vaadin-tab>
          <vaadin-tab><a href="/searchbar">Searchbar</a></vaadin-tab>
          <vaadin-tab><a href="/select">Select</a></vaadin-tab>
          <vaadin-tab><a href="/selection-card">Selection Card</a></vaadin-tab>
          <vaadin-tab><a href="/sidebar">Sidebar</a></vaadin-tab>
          <vaadin-tab><a href="/skeleton">Skeleton</a></vaadin-tab>
          <vaadin-tab><a href="/small-card">Small Card</a></vaadin-tab>
          <vaadin-tab><a href="/stages">Stages</a></vaadin-tab>
          <vaadin-tab><a href="/step">Step</a></vaadin-tab>
          <vaadin-tab><a href="/stepper">Stepper</a></vaadin-tab>
          <vaadin-tab><a href="/summary">Summary</a></vaadin-tab>
          <vaadin-tab><a href="/tabs">Tabs</a></vaadin-tab>
          <vaadin-tab><a href="/text-area">Text Area</a></vaadin-tab>
          <vaadin-tab><a href="/text-field">Text Field</a></vaadin-tab>
          <vaadin-tab><a href="/time-picker">Time Picker</a></vaadin-tab>
          <vaadin-tab><a href="/tooltip">Tooltip</a></vaadin-tab>
          <vaadin-tab><a href="/upload">Upload</a></vaadin-tab>
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
