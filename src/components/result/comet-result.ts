import "@vaadin/vertical-layout";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icon/comet-icon";

@customElement("comet-result")
export class CometResult extends LitElement {
  @property()
  icon: string | undefined;

  @property()
  type = "warning";

  @property()
  message = "";

  @property()
  description = "";

  getIcon() {
    if (this.icon) {
      return this.icon;
    }
    if ("warning" == this.type) {
      return "vision-risk-prevention";
    }
    if ("error" == this.type) {
      return "vision-risk-prevention";
    }
    if ("success" == this.type) {
      return "check";
    }
    return "info";
  }

  render() {
    return html`
      <vaadin-vertical-layout style="align-items: center">
        <comet-icon
          name="${this.getIcon()}"
          type="wecons-circle"
          size="70"
          class="${this.type}"
          data-testid="result-icon"
          id="result-icon"
        ></comet-icon>
        <div class="message" data-testid="result-title" id="result-title">
          ${this.message}
        </div>
        <div
          class="description"
          data-testid="result-description"
          id="result-description"
        >
          ${this.description}
        </div>
        <slot></slot>
      </vaadin-vertical-layout>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
      width: 400px;
      display: block;
    }

    .warning {
      --primary-50: #ed9424;
      --secondary-40: #fef6e4;
    }

    .error {
      --primary-50: red;
      --secondary-40: #ffd0da;
    }

    .success {
      --primary-50: green;
    }

    .message {
      margin-top: 21px;

      font-family: "Kyn";
      font-style: normal;
      font-weight: 600;
      font-size: 22px;
      line-height: 28px;
      color: #242424;
    }

    .description {
      margin-top: 8px;
      margin-bottom: 8px;
      font-family: "Kyn";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      /* or 150% */

      text-align: center;
      font-feature-settings: "tnum" on, "lnum" on;
      color: #575655;
      color: #575655;
    }
  `;
}
