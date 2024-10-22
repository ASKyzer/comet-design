import "@vaadin/custom-field";
import type { CustomFieldChangeEvent } from "@vaadin/custom-field";
import "@vaadin/date-picker";
import type { DatePicker } from "@vaadin/date-picker";
import type { FormLayoutResponsiveStep } from "@vaadin/form-layout";
import { css, html, LitElement } from "lit";
import { customElement, query, state } from "lit/decorators.js";

@customElement("demo-custom-field")
export class DemoCustomField extends LitElement {
  responsiveSteps: FormLayoutResponsiveStep[] = [
    // Use one column by default
    { minWidth: 0, columns: 1 },
    // Use two columns, if the layout's width exceeds 420px
    // Use three columns, if the layout's width exceeds 690px
    { minWidth: "1260px", columns: 2 },
  ];

  @query("#start")
  private start!: DatePicker;

  @query("#end")
  private end!: DatePicker;

  protected override firstUpdated() {
    // Set title for screen readers
    this.start.focusElement!.setAttribute("title", "Start date");
    this.end.focusElement!.setAttribute("title", "End date");
  }

  @state()
  private currencies = [
    { label: "AUD", value: "aud" },
    { label: "CAD", value: "cad" },
    { label: "CHF", value: "chf" },
    { label: "EUR", value: "eur" },
    { label: "GBP", value: "gbp" },
    { label: "JPY", value: "jpy" },
    { label: "USD", value: "usd" },
  ];

  @state()
  private customFieldValue = "";

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Custom Field
      </h1>

      <div class="section-title">
        Custom Field is a component for wrapping multiple components as a single
        field. It provides standard input field features like label, helper,
        validation, and data binding. Use it to create custom input components.
      </div>

      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-custom-field
          label="Enrollment period"
          helper-text="Cannot be longer than 30 days"
          required
        >
          <vaadin-date-picker
            style="width: 48.5%"
            id="start"
            placeholder="Start date"
          >
          </vaadin-date-picker>
          &ndash;
          <vaadin-date-picker
            style="width: 48.5%"
            id="end"
            placeholder="End date"
          ></vaadin-date-picker>
          <div slot="error-message">
            Dates cannot be more than 30 days apart
          </div>
        </vaadin-custom-field>

        <vaadin-custom-field
          label="Invalid"
          helper-text="Cannot be longer than 30 days"
          required
          invalid
        >
          <vaadin-date-picker
            style="width: 48.5%"
            required
            invalid
            id="start"
            placeholder="Start date"
          >
          </vaadin-date-picker>
          &ndash;
          <vaadin-date-picker
            style="width: 48.5%"
            id="end"
            placeholder="End date"
            required
            invalid
          ></vaadin-date-picker>
          <div slot="error-message">
            Dates cannot be more than 30 days apart
          </div>
        </vaadin-custom-field>

        <vaadin-custom-field
          label="Price"
          helper-text="Choose your starting bid"
        >
          <vaadin-horizontal-layout theme="spacing-s">
            <vaadin-text-field
              style="width: 70%"
              id="amount"
            ></vaadin-text-field>
            <vaadin-select
              style="width: 30%"
              id="currency"
              .items="${this.currencies}"
              style="width: 6em;"
            ></vaadin-select>
          </vaadin-horizontal-layout>
        </vaadin-custom-field>

        <vaadin-custom-field
          label="Disabled"
          helper-text="Choose your starting bid"
          disabled
        >
          <vaadin-horizontal-layout theme="spacing-s">
            <vaadin-text-field
              style="width: 700%;"
              id="amount"
              disabled
            ></vaadin-text-field>
            <vaadin-select
              disabled
              id="currency"
              .items="${this.currencies}"
              style="width: 30%;"
            ></vaadin-select>
          </vaadin-horizontal-layout>
        </vaadin-custom-field>

        <vaadin-custom-field
          label="Read-only"
          helper-text="Choose your starting bid"
          readonly
        >
          <vaadin-horizontal-layout theme="spacing-s">
            <vaadin-text-field
              style="width: 700%;"
              id="amount"
              readonly
              value="4500"
            ></vaadin-text-field>
            <vaadin-select
              readonly
              id="currency"
              .items="${this.currencies}"
              style="width: 30%;"
              value="${this.currencies[2].value}"
            ></vaadin-select>
          </vaadin-horizontal-layout>
        </vaadin-custom-field>

        <div style="width: 100%;  flex-grow: 1;">
          <vaadin-custom-field
            style="width: 100%;  flex-grow: 1;"
            label="With native elements"
            theme="whitespace"
            @change="${(event: CustomFieldChangeEvent) => {
              this.customFieldValue = event.target.value ?? "";
            }}"
          >
            <vaadin-horizontal-layout
              style="width: 100%; flex-grow: 1;"
              theme="spacing-s"
            >
              <input
                style="width: 100%;"
                aria-label="Cardholder name"
                pattern="[\\p{L} \\-]+"
                placeholder="Cardholder name"
                required
                type="text"
              />
              <input
                style="width: 100%;"
                aria-label="Card number"
                pattern="[\\d ]{12,23}"
                placeholder="Card number"
                required
                type="text"
              />
              <input
                style="width: 100%;"
                aria-label="Security code"
                pattern="[0-9]{3,4}"
                placeholder="Security code"
                required
                type="text"
              />
            </vaadin-horizontal-layout>
          </vaadin-custom-field>
          <p><b>Payment information:</b> ${this.customFieldValue}</p>
        </div>
      </vaadin-form-layout>
    `;
  }

  static styles = css`
    .section-title {
      color: var(--primary-50);
      font-weight: var(--typo-font-weights-bold);
      font-size: 1.35rem;
      margin: 24px 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-custom-field": DemoCustomField;
  }
}
