import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface CardButtonConfig {
  disabled?: boolean;
  label?: string;
  size?: "small" | "large";
  theme:
    | "comet"
    | "danger"
    | "default"
    | "info"
    | "link"
    | "primary"
    | "primary-inverted"
    | "subtle"
    | "success"
    | "warning";
  icon?: ButtonIcon;
}

interface ButtonIcon {
  name: string;
  position: "prefix" | "suffix";
}

@customElement("comet-card")
export class CometCard extends LitElement {
  @property() border: boolean = false;
  @property() buttonConfig: CardButtonConfig = null;
  @property() imageSrc: string = "";
  @property() info: string = "";
  @property() title: string = "";
  @property() imageBelowTitle: boolean = false;

  handleActionButtonClick(): void {
    this.dispatchEvent(
      new CustomEvent("action-button-click", {
        bubbles: true,
        composed: true,
        detail: null,
      })
    );
  }

  render() {
    return html`
      <div
        part="comet-card-container"
        class="main ${this.border ? "-bordered" : ""}"
      >
        ${this.imageBelowTitle ? this._renderTitle() : null}
        ${this._renderImage()}
        ${!this.imageBelowTitle ? this._renderTitle() : null}

        <div part="comet-card-content">
          <slot></slot>
        </div>

        ${this._renderFooter()}
      </div>
    `;
  }

  private _renderTitle() {
    return html` <slot name="comet-card-header"
      >${this.title || this.info
        ? html`
            <div class="title ${this.border ? "bordered" : ""}">
              <h3>${this.title}</h3>
              <div class="info">${this.info}</div>
            </div>
          `
        : ""}</slot
    >`;
  }

  private _renderImage() {
    return html`<slot name="image">
      ${this.imageSrc
        ? html`
            <img
              class="${this.imageBelowTitle ? "" : "--above"}"
              src="${this.imageSrc}"
              width="100%"
              height="100%"
            />
          `
        : null}
    </slot>`;
  }

  private _renderFooter() {
    return html`
      <slot name="comet-card-footer">
        ${this.buttonConfig
          ? html`
              <div part="footer-container" class="footer-container">
                ${this._renderButton()}
              </div>
            `
          : null}
      </slot>
    `;
  }

  private _renderButton() {
    const config = this.buttonConfig;
    const icon = this.buttonConfig.icon;
    switch (config.theme) {
      case "comet": {
        return html`<comet-button
          @click=${this.handleActionButtonClick}
          label=${config.label}
          leadingIcon=${icon?.position === "prefix" ? icon?.name : null}
          trailingIcon=${icon?.position === "suffix" ? icon?.name : null}
          size=${config.size}
          .disabled=${config.disabled}
        ></comet-button>`;
      }
      case "default": {
        return html`<comet-default-button
          @click=${this.handleActionButtonClick}
          leadingIcon=${icon?.position === "prefix" ? icon?.name : null}
          trailingIcon=${icon?.position === "suffix" ? icon?.name : null}
          size=${config.size}
          .disabled=${config.disabled}
          >${config.label}</comet-default-button
        >`;
      }
      case "primary":
      case "primary-inverted":
      case "subtle":
      case "link":
      case "success":
      case "warning":
      case "danger":
      case "info": {
        return html`<vaadin-button
          @click=${this.handleActionButtonClick}
          theme="${config.theme} ${config.size} ${!config.label ? "icon" : ""}"
          .disabled=${config.disabled}
        >
          ${icon
            ? html`
                <comet-icon
                  slot="${icon?.position}"
                  name="${icon?.name}"
                  primaryColor="${this._getColor(config)}"
                  size="${config.label ? "24" : "36"}"
                ></comet-icon>
              `
            : null}
          ${config.label}
        </vaadin-button>`;
      }
    }
  }

  private _getColor(config) {
    if (config.disabled) return "neutral-60";
    if (config.theme === "subtle") return "neutral-70";
    if (config.theme === "primary-inverted" || config.theme === "link")
      return "primary-50";
    return "neutral-0";
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    img.--above {
      border-radius: var(--spacing-xs) var(--spacing-xs) 0 0;
    }

    .main {
      background-color: var(--neutral-0);
      border-radius: var(--spacing-xs);
      box-shadow: var(--shadow-default);
    }

    .main.-bordered {
      border: 1px solid var(--neutral-40);
    }

    .title {
      display: flex;
      align-items: center;
      color: var(--lumo-primary-text-color);
      padding: 1.5rem;
    }

    .title.bordered {
      border-bottom: 1px solid var(--neutral-40);
    }

    .title h3 {
      margin: 0;
      flex-grow: 2;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .title div {
      margin: 0;
      font-size: 1rem;
      font-weight: 400;
    }

    .footer-container {
      display: flex;
      justify-content: flex-end;
      padding: var(--spacing-md);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-card": CometCard;
  }
}
