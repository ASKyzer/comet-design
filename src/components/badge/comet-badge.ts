import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icon/comet-icon";

@customElement("comet-badge")
export class CometBadge extends LitElement {
  @property()
  label: string = "";
  @property()
  icon: string = "";
  @property()
  iconPosition: "left" | "right" = "left";
  @property()
  badgestyle: "square" | "round" = "square";
  @property()
  theme:
    | "success"
    | "warning"
    | "error"
    | "info"
    | "grey"
    | "dark"
    | "contrast"
    | "secondary"
    | "light" = "contrast";
  @property()
  maxCharacters: number;

  ICON_COLORS = {
    success: "success-90",
    warning: "warning-90",
    error: "danger-90",
    info: "info-90",
    light: "primary-50",
    dark: "neutral-0",
    grey: "neutral-90",
    secondary: "neutral-0",
    contrast: "neutral-0",
  };

  getIconColor() {
    return this.ICON_COLORS[this.theme] || this.ICON_COLORS["grey"];
  }

  renderLabel(text) {
    if (
      !this.maxCharacters ||
      (this.maxCharacters &&
        this.maxCharacters > 4 &&
        text.length < this.maxCharacters)
    ) {
      return html`${text}`;
    } else {
      const id = Math.random().toString(36).substr(2, 9);
      return html`
        <span id="${id}">
          ${text.slice(0, this.maxCharacters - 4) + "..."}
        </span>
        <vaadin-tooltip
          for="${id}"
          slot="tooltip"
          .text=${text}
        ></vaadin-tooltip>
      `;
    }
  }

  render() {
    return html`
      <div
        class="container ${this.theme} ${this.badgestyle} ${this.icon &&
        this.label
          ? "with-icon"
          : ""} ${this.icon && !this.label ? "icon-only" : ""}"
      >
        ${this.iconPosition === "left"
          ? html` <div style="padding-top: 4px;">
              <comet-icon
                name="${this.icon}"
                size="${this.label ? "20" : "26"}"
                style="font-weight: bold; ${this.label &&
                this.icon &&
                this.iconPosition === "left"
                  ? "margin-right: 6px"
                  : ""}"
                primaryColor="${this.getIconColor()}"
              ></comet-icon>
            </div>`
          : ""}
        ${this.label
          ? html` <span class="label">${this.renderLabel(this.label)}</span>`
          : ""}
        ${this.iconPosition === "right"
          ? html` <div style="padding-top: 4px;">
              <comet-icon
                name="${this.icon}"
                size="${this.label ? "20" : "26"}"
                style="font-weight: bold; ${this.label &&
                this.icon &&
                this.iconPosition === "right"
                  ? "margin-left: 6px"
                  : ""}"
                primaryColor="${this.getIconColor()}"
              >
              </comet-icon>
            </div>`
          : ""}
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .container {
      align-items: center;
      background-color: var(--neutral-10);
      border-radius: var(--border-xs);
      color: var(--neutral-100);
      display: flex;
      font-size: var(--typo-caption-size);
      font-weight: var(--typo-font-weights-semibold);
      justify-content: center;
      padding-bottom: var(--spacing-xxs);
      padding-left: var(--spacing-xs);
      padding-right: var(--spacing-xs);
      padding-top: var(--spacing-xxs);
      width: fit-content;
    }

    .container.round {
      border-radius: 50px;
      padding-left: var(--spacing-xs);
      padding-right: var(--spacing-xs);
      text-align: center;
    }

    .contianer.icon-only {
      padding-bottom: 0;
      padding-left: var(--spacing-xxs);

      padding-right: var(--spacing-xxs);
      padding-top: 0;
    }

    .container.with-icon {
      padding-bottom: 0;
      padding-top: 0;
    }

    .success {
      background-color: var(--success-10);
      color: var(--success-90);
    }

    .info {
      background-color: var(--info-10);
      color: var(--info-90);
    }

    .error {
      background-color: var(--danger-10);
      color: var(--danger-90);
    }

    .warning {
      background-color: var(--warning-10);
      color: var(--warning-90);
    }

    .dark {
      background-color: var(--primary-50);
      color: var(--neutral-10);
    }

    .light {
      background-color: var(--primary-20);
      color: var(--primary-70);
    }

    .secondary {
      background-color: var(--secondary-60);
      color: var(--neutral-0);
    }

    .contrast {
      background-color: var(--primary-100);
      color: var(--neutral-0);
    }
  `;
}
