import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

export interface Card {
  title: string;
  checked: boolean;
  content: string;
  price: string;
  id: string;
  footer: string;
}

@customElement("comet-selection-card")
export class CustomSelectionCard extends LitElement {
  @property()
  public card!: Card;

  @property()
  public checked = false;

  private onRadioButtonClick() {
    this.dispatchEvent(
      new CustomEvent("card-selected", {
        bubbles: true,
        composed: true,
        detail: this.card,
      })
    );
  }

  render() {
    return html`
      <div part="comet-card-container" class="main">
        <div class="title">
          <h3>${this.card.title}</h3>
          <vaadin-radio-button
            ?checked=${this.checked}
            @click="${this.onRadioButtonClick}"
          ></vaadin-radio-button>
        </div>

        <div class="selection-card-content">
          <slot name="comet-selection-card-content">
            <p>${this.card.content}</p>
          </slot>
        </div>
        <div class="footer">
          <h4>${this.card.footer}</h4>
          <div>${this.card.price}</div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
      color: var(--comet-color-font-dark);
    }

    .main {
      background-color: var(--neutral-0);
      border: 1px solid lightgrey;
      border-radius: 8px;
      box-shadow: 0px 2px 4px rgba(51, 55, 66, 0.04),
        0px 4px 8px rgba(51, 55, 66, 0.04), 0px 4px 12px rgba(51, 55, 66, 0.02);
      max-width: 800px;
    }
    .title {
      display: flex;
      padding: 0px 20px;
      align-items: center;
    }
    .title h3 {
      flex-grow: 2;
    }
    .selection-card-content {
      padding: 0px 20px;
    }
    .footer {
      display: flex;
      padding: 0px 20px;
      align-items: center;
    }
    .footer h4 {
      flex-grow: 2;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-selection-card": CustomSelectionCard;
  }
}
