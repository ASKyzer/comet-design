import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icon/comet-icon";

@customElement("comet-features-banner")
export class CometFeaturesBanner extends LitElement {
  @property()
  public title: string = "";

  @property()
  public icon: string = "";

  @property()
  public iconPosition: "left" | "right" = "right";

  @property()
  public description: string = "";

  @property()
  public buttonLabel: string = "";

  @property()
  public theme: "primary" | "secondary" = "primary";

  @property()
  public buttonTheme:
    | "default"
    | "primary"
    | "primary-inverted"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "" = "";

  private actionButtonClick() {
    this.dispatchEvent(
      new CustomEvent("button-click", {
        bubbles: true,
        composed: true,
      })
    );
  }

  getContainerWidth() {}

  getButtonTheme(theme: string) {
    if (this.buttonTheme) {
      return this.buttonTheme;
    }
    return theme === "primary" ? "default" : "primary";
  }

  render() {
    return html`
      <div
        part="comet-features-banner-container"
        class="container ${this.theme} ${this.icon}"
      >
        ${this._renderImage(this.theme)}
        <div
          part="comet-features-banner-content-container"
          class="content-container ${this.theme} ${this.icon}"
        >
          ${this._renderContent()}
        </div>
      </div>
    `;
  }

  private _renderContent() {
    return html`
      <h3 part="comet-features-banner-title" class="title ${this.theme}">
        ${this.title}
      </h3>
      <slot name="comet-features-banner-description">
        <p
          part="comet-features-banner-description"
          class="description ${this.theme}"
        >
          ${this.description}
        </p>
      </slot>
      <slot name="comet-features-banner-button">
        ${this._renderActionButton()}
      </slot>
    `;
  }

  private _renderActionButton() {
    if (!this.buttonLabel) {
      return null;
    }

    return html` <vaadin-button
      @click="${this.actionButtonClick}"
      theme="${this.getButtonTheme(this.theme)}"
      >${this.buttonLabel}</vaadin-button
    >`;
  }

  private _renderImage(theme: string) {
    return html` <div
      part="comet-features-banner-image-container"
      class="three-d-image ${this.theme} ${this.icon}"
    >
      <slot name="comet-features-banner-image">
        <div
          class="${this.icon} ${this.theme}"
          icon=${this.icon}
          part="comet-features-banner-image"
        >
          <comet-icon
            name="${this.icon}"
            size="${this._getImageSize()}"
            type="three-dimensional"
          ></comet-icon>
        </div>
      </slot>
    </div>`;
  }

  private _getImageSize() {
    if (this.theme === "primary") {
      switch (this.icon) {
        case "random":
          return 350;
        case "blocks":
          return 300;
        case "lead-cost":
          return this.buttonLabel ? 350 : 300;
        default:
          return 250;
      }
    }

    return 250;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .container {
      align-items: center;
      border-radius: 20px;
      display: flex;
      flex-shrink: 0;
      height: fit-content;
      position: relative;
    }

    .container.primary {
      background: linear-gradient(180deg, #9086df 0%, #9a91ec 100%);
      min-height: 200px;
    }

    .container.secondary {
      background: var(--secondary-80, #01abb2);
      min-height: 175px;
    }

    .three-d-image {
      height: auto;
      pointer-events: none;
      position: absolute;
      transition: opacity 0.5s, filter 0.5s;
    }

    .three-d-image.primary {
      bottom: 0;
      height: auto;
      right: 48px;
    }

    .three-d-image.primary.random {
      bottom: -76px;
      right: -16px;
    }

    .three-d-image.primary.blocks {
      bottom: -36px;
      right: -30px;
    }

    .three-d-image.primary.claim,
    .three-d-image.primary.viewnav,
    .three-d-image.primary.risk-analysis {
      bottom: -36px;
      right: 56px;
    }

    .three-d-image.primary.lead-cost {
      bottom: -48px;
      right: -24px;
    }

    .three-d-image.secondary {
      bottom: -16px;
      left: 0;
    }

    .three-d-image.secondary.shapes {
      bottom: -36px;
      left: 8px;
    }

    .content-container {
      position: relative;
    }

    .content-container.primary {
      margin: 20px 32px;
      width: 100%;
    }

    .content-container.secondary {
      margin: 16px 32px 16px 300px;
      width: 100%;
    }

    .title {
      color: var(--neutral-0);
      font-family: Kyn;
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 12px;
      margin-top: 0;
      width: 100%;
    }

    .description {
      color: var(--neutral-0);
      font-family: Kyn;
      font-size: 20px;
      line-height: 28px;
      width: 100%;
    }

    .description.primary {
      width: calc(100% - 300px);
      max-width: 1800px;
    }

    .title.primary {
      width: calc(100% - 220px);
      max-width: 1800px;
    }

    @media (max-width: 767px) {
      .container {
        overflow: hidden;
      }
      .three-d-image {
        opacity: 0.2;
        filter: blur(3px);
      }

      .description.primary,
      .title.primary {
        width: 100%;
      }

      .content-container.secondary {
        margin: 16px 32px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-features-banner": CometFeaturesBanner;
  }
}
