import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("comet-small-card")
export class CometSmallCard extends LitElement {
  @property({ type: Boolean }) public hasBorder = false;

  @property() public title!: string;

  @property()
  public description!: string;

  @property()
  public icon!: {
    name: string;
    type?: string;
    primaryColor?: string;
    secondaryColor?: string;
    size?: string;
  };

  public getIcon() {
    if (this.icon) {
      return html` <comet-icon
        name="${this.icon.name}"
        type="${this.icon.type || "ui"}"
        size="${this.icon.size || "48"}"
        primaryColor="${this.icon.primaryColor || "primary-50"}"
        secondaryColor="${this.icon.secondaryColor || "secondary-40"}"
      ></comet-icon>`;
    } else {
      return html`<slot name="comet-small-card-icon"></slot>`;
    }
  }

  render() {
    return html`
      <div
        part="comet-card-container"
        class="main ${this.hasBorder ? "with-border" : ""}"
      >
        ${this.getIcon()}
        <div>
          <h3 part="comet-small-card-title">${this.title}</h3>
          <slot name="comet-small-card-description"
            ><span>${this.description}</span></slot
          >
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .main {
      display: flex;
      align-items: center;
    }

    .main.with-border {
      border: 1px solid var(--comet-color-border-light);
      border-radius: 8px;
    }

    comet-icon {
      margin-right: 16px;
    }

    /* default styles for h3 and p to avoid code repetetion but can be customised with part (as shown in demo-small-card)*/

    h3 {
      margin: 4px 0;
      font-size: var(--typo-heading-small-size);
      color: var(--primary-100);
    }
    p {
      margin: 4px 0;
      font-size: var(--typo-caption-size);
      line-height: var(--typo-body-small-line-height);
      color: var(--primary-80);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-small-card": CometSmallCard;
  }
}
