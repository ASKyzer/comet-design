import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../components/selection-card/comet-selection-card";

@customElement("demo-selection-card")
export class DemoSelectionCard extends LitElement {
  @property() public cards = [
    {
      title: "Carrier 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilia",
      price: "13,20€ / Monthly",
      id: "12",
      footer: "Payment end date 12.05.2024",
      checked: false,
    },
    {
      title: "Carrier 2",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilia",
      price: "13,20€ / Yearly",
      id: "23",
      footer: "Payment end date 24.02.2023",
      checked: false,
    },
    {
      title: "Carrier 3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilia",
      price: "13,20€ / Quarterly",
      id: "45",
      footer: "Payment end date 04.11.2026",
      checked: false,
    },
  ];

  @property() public LIST_CARDS = [
    {
      title: "Carrier 145",
      content: ["Apples", "Bananas", "Cranberries", "Durians"],
      price: "13,20€ / Monthly",
      id: "12",
      footer: "Payment end date 12.05.2024",
      checked: false,
    },
    {
      title: "Carrier 267",
      content: ["Alligators", "Bears", "Crabs", "Donkeys"],
      price: "13,20€ / Yearly",
      id: "23",
      footer: "Payment end date 24.02.2023",
      checked: false,
    },
    {
      title: "Carrier 389",
      content: ["Argentina", "Bonnaire", "Croatia", "Denmark"],
      price: "13,20€ / Quarterly",
      id: "45",
      footer: "Payment end date 04.11.2026",
      checked: false,
    },
  ];

  handleCardClick(event: CustomEvent) {
    this.cards = this.cards.map((card) => {
      if (card.id === event.detail.id) {
        card.checked = !card.checked;
      }

      return card;
    });
  }

  handleListCardClick(event: CustomEvent) {
    this.LIST_CARDS = this.LIST_CARDS.map((card) => {
      if (card.id === event.detail.id) {
        card.checked = !card.checked;
      }

      return card;
    });
  }

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        Comet Selection Card
      </h1>

      <div class="white-bg">
        ${this.cards.map((card) => {
          return html` <div style="margin-bottom: 16px;">
            <comet-selection-card
              @card-selected="${this.handleCardClick}"
              .card="${card}"
              ?checked="${card.checked}"
            ></comet-selection-card>
          </div>`;
        })}
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px;">
        Using the content slot to add a list from the content array.
      </h3>

      <div class="main">
        <h2 style="color: var(--primary-80); margin-top: 48px;">
          Available Products:
        </h2>
        ${this.LIST_CARDS.map((card) => {
          return html` <div style="margin-bottom: 24px;">
            <comet-selection-card
              @card-selected="${this.handleListCardClick}"
              .card="${card}"
              ?checked="${card.checked}"
            >
              <div slot="comet-selection-card-content">
                <div>The following items are available in this package.</div>
                <ul>
                  ${card.content.map((item) => {
                    return html` <li>${item}</li> `;
                  })}
                </ul>
              </div>
            </comet-selection-card>
          </div>`;
        })}
      </div>
    `;
  }

  static styles = css`
    .main ::part(comet-card-container) {
      border: none;
    }

    .main {
      background-color: var(--neutral-20);
      padding: 16px 64px;
    }
  `;
}
