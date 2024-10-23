import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icon/comet-icon";

@customElement("comet-banner")
export class CometBanner extends LitElement {
  @property() public buttonLabel: string = "";
  @property({ type: Boolean }) public hasCloseButton = true;
  @property({ type: Boolean }) public hasIcon = false;
  @property() public icon: string = "";
  @property() public iconSize: string = "40";
  @property() public theme:
    | "success"
    | "warning"
    | "error"
    | "info"
    | "default" = "default";
  @property() public title: string = "";

  private onCloseButtonClick() {
    this.dispatchEvent(
      new CustomEvent("close-button-click", {
        bubbles: true,
        composed: true,
      })
    );
  }

  private onActionButtonClick() {
    this.dispatchEvent(
      new CustomEvent("action-button-click", {
        bubbles: true,
        composed: true,
      })
    );
  }

  private getByTheme(theme: string) {
    switch (theme) {
      case "info":
        return {
          buttonTheme: theme,
          closeButtonColor: "info-80",
          icon: this.icon ? this.icon : "feedback-info",
          iconColor: "info-50",
        };
      case "error":
        return {
          buttonTheme: "danger",
          closeButtonColor: "danger-80",
          icon: this.icon ? this.icon : "feedback-danger",
          iconColor: "danger-50",
        };
      case "success":
        return {
          buttonTheme: theme,
          closeButtonColor: "success-80",
          icon: this.icon ? this.icon : "feedback-success",
          iconColor: "success-50",
        };
      case "warning":
        return {
          buttonTheme: theme,
          closeButtonColor: "warning-80",
          icon: this.icon ? this.icon : "feedback-warning",
          iconColor: "warning-50",
        };
      default:
        return {
          buttonTheme: "primary",
          closeButtonColor: "primary-90",
          icon: this.icon,
          iconColor: "primary-50",
        };
    }
  }

  render() {
    return html`
      <div part="comet-banner-container" class="banner-container ${this.theme}">
        <div part="banner-main" class="banner-main">
          ${this._renderIcon()}
          <div style="display:flex; flex-direction: column;">
            ${this._renderTitle()}
            <div part="comet-banner-content" class="banner-content">
              <slot></slot>
            </div>
            ${this._renderActionButton()}
          </div>
        </div>
        ${this._renderCloseButton()}
      </div>
    `;
  }

  private _renderActionButton() {
    if (!this.buttonLabel) {
      return null;
    }
    return html` <slot name="comet-banner-action-button">
      <vaadin-button
        class="action-button"
        style="width: fit-content;"
        @click="${this.onActionButtonClick}"
        theme="small ${this.getByTheme(this.theme).buttonTheme}"
        >${this.buttonLabel}</vaadin-button
      >
    </slot>`;
  }

  private _renderCloseButton() {
    if (!this.hasCloseButton) {
      return null;
    }
    return html`<slot name="comet-banner-close-button">
      <div class="banner-close-button">
        <comet-icon
          @click="${this.onCloseButtonClick}"
          name="x"
          primaryColor="${this.getByTheme(this.theme)?.closeButtonColor}"
          size="${this.iconSize}"
        ></comet-icon>
      </div>
    </slot> `;
  }

  private _renderIcon() {
    if (!this.hasIcon) {
      return null;
    }
    return html`<comet-icon
      class="banner-theme-icon"
      name="${this.getByTheme(this.theme)?.icon}"
      type="ui"
      primaryColor="${this.getByTheme(this.theme)?.iconColor}"
      size="${this.iconSize}"
    ></comet-icon>`;
  }

  private _renderTitle() {
    if (!this.title) {
      return null;
    }
    return html` <div part="comet-banner-title" class="banner-title">
      <div>${this.title}</div>
    </div>`;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .banner-container {
      display: flex;
      padding: var(--spacing-md);
      justify-content: space-between;
      border-radius: 8px;
      border: 1px solid var(--comet-color-border);
      color: var(--comet-color-font-dark);
    }

    .banner-container.info,
    .banner-container.success,
    .banner-container.warning,
    .banner-container.error {
      border: none;
    }

    .banner-main {
      display: flex;
      align-items: center;
    }

    .banner-title {
      font-size: var(--typo-heading-small-size);
      font-weight: var(--typo-font-weights-semibold);
      margin-bottom: var(--spacing-xxs);
    }

    .banner-theme-icon {
      display: flex;
      margin-right: var(--spacing-md);
    }

    .banner-close-button {
      cursor: pointer;
      margin-left: 8px;
    }

    .banner-action-button-with-icon {
      margin-left: var(--spacing-xjumbo);
      padding-left: var(--spacing-xxs);
      margin-top: var(--spacing-xs);
    }

    .success {
      background-color: var(--success-background-color);
      color: var(--success-font-color);
    }

    .info {
      background-color: var(--info-background-color);
      color: var(--info-font-color);
    }

    .warning {
      background-color: var(--warning-background-color);
      color: var(--warning-font-color);
    }

    .error {
      background-color: var(--danger-background-color);
      color: var(--danger-font-color);
    }

    .default {
      background-color: var(--neutral-0) !important;
      color: var(--comet-color-font-dark);
    }
  `;
}
declare global {
  interface HTMLElementTagNameMap {
    "comet-banner": CometBanner;
  }
}
