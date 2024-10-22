import "@vaadin/horizontal-layout";
import "@vaadin/number-field";
import "@vaadin/radio-group";
import { RadioGroupValueChangedEvent } from "@vaadin/radio-group";
import "@vaadin/vertical-layout";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("demo-radio-button")
export class DemoRadioButton extends LitElement {
  @state()
  private value?: string;

  @state()
  private items = [
    {
      pictureUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
      name: "name",
      id: "3453453454235",
      accountNumber: "**** **** **** 3452",
      expiryDate: "10/2025",
      checked: false,
    },
    {
      pictureUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1280px-MasterCard_Logo.svg.png",
      name: "name",
      id: "57464564",
      accountNumber: "**** **** **** 5934",
      expiryDate: "04/2026",
    },
    {
      pictureUrl:
        "https://1000marcas.net/wp-content/uploads/2020/03/logo-American-Express.png",
      name: "name",
      id: "234567563",
      accountNumber: "**** **** **** 0093",
      expiryDate: "08/2024",
    },
  ];

  protected override async firstUpdated() {
    this.value = String(this.items[0].id);
  }

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Radio Button
      </h1>

      <vaadin-vertical-layout theme="spacing">
        <vaadin-radio-group
          helper-text="Helper text goes here"
          label="Travel class"
          theme="vertical"
        >
          <vaadin-radio-button
            value="economy"
            label="Economy"
            checked
          ></vaadin-radio-button>
          <vaadin-radio-button
            value="business"
            label="Business"
          ></vaadin-radio-button>
          <vaadin-radio-button
            value="firstClass"
            label="First Class"
          ></vaadin-radio-button>
        </vaadin-radio-group>

        <vaadin-radio-group
          helper-text="Helper text goes here"
          label="Disabled"
          theme="vertical"
          disabled
        >
          <vaadin-radio-button
            value="economy"
            label="Economy"
            checked
          ></vaadin-radio-button>
          <vaadin-radio-button
            value="business"
            label="Business"
          ></vaadin-radio-button>
          <vaadin-radio-button
            value="firstClass"
            label="First Class"
          ></vaadin-radio-button>
        </vaadin-radio-group>

        <vaadin-radio-group label="Invalid" theme="vertical" invalid required>
          <vaadin-radio-button
            value="economy"
            label="Economy"
            invalid
            required
          ></vaadin-radio-button>
          <vaadin-radio-button
            value="business"
            label="Business"
            invalid
            required
          ></vaadin-radio-button>
          <vaadin-radio-button
            value="firstClass"
            label="First Class"
            invalid
            required
          ></vaadin-radio-button>
          <div slot="error-message">Required</div>
        </vaadin-radio-group>

        <vaadin-radio-group label="Theme horizontal" theme="horizontal">
          <vaadin-radio-button
            value="pending"
            label="Pending"
            checked
          ></vaadin-radio-button>
          <vaadin-radio-button
            value="submitted"
            label="Submitted"
          ></vaadin-radio-button>
          <vaadin-radio-button
            value="confirmed"
            label="Confirmed"
          ></vaadin-radio-button>
        </vaadin-radio-group>

        <vaadin-radio-group label="Read-only" readonly>
          <vaadin-radio-button
            value="inProgress"
            label="In progress"
            checked
          ></vaadin-radio-button>
          <vaadin-radio-button value="done" label="Done"></vaadin-radio-button>
          <vaadin-radio-button
            value="cancelled"
            label="Cancelled"
          ></vaadin-radio-button>
        </vaadin-radio-group>

        <h3 class="section-title">Custom entries with image</h3>

        <vaadin-radio-group
          label="Payment method"
          theme="vertical helper-above-field"
          helper-text="Please select a car on file"
          .value="${this.value}"
        >
          ${this.items.map(
            (card) => html`
              <vaadin-radio-button
                .value="${String(card.id)}"
                style="margin-bottom: 12px;"
              >
                <label slot="label">
                  <vaadin-horizontal-layout theme="spacing">
                    <img
                      src="${card.pictureUrl}"
                      alt="${card.name}"
                      style="height: 1.5em; width: 3rem;"
                    />
                    <span>${card.accountNumber}</span>
                  </vaadin-horizontal-layout>
                  <div>Expiry date: ${card.expiryDate}</div>
                </label>
              </vaadin-radio-button>
            `
          )}
        </vaadin-radio-group>

        <h3 class="section-title">
          Custom entries with custom additional item that triggers visibility of
          anothe field
        </h3>

        <vaadin-radio-group
          label="Payment method"
          theme="vertical"
          .value="${this.value}"
          @value-changed="${(event: RadioGroupValueChangedEvent) => {
            this.value = event.detail.value;
          }}"
        >
          ${this.items.map(
            (card) => html`
              <vaadin-radio-button .value="${String(card.id)}">
                <label slot="label">
                  <vaadin-horizontal-layout theme="spacing">
                    <img
                      src="${card.pictureUrl}"
                      alt="${card.name}"
                      style="height: 1em; width: 2em;"
                    />
                    <span>${card.accountNumber}</span>
                  </vaadin-horizontal-layout>
                </label>
              </vaadin-radio-button>
            `
          )}
          <vaadin-radio-button value="-1" label="Other"></vaadin-radio-button>
        </vaadin-radio-group>

        <vaadin-number-field
          label="Card number"
          .hidden="${this.value !== "-1"}"
        ></vaadin-number-field>
      </vaadin-vertical-layout>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .section-title {
      color: var(--primary-50);
      font-weight: var(--typo-font-weights-bold);
      font-size: 1.35rem;
      margin-bottom: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-radio-button": DemoRadioButton;
  }
}
