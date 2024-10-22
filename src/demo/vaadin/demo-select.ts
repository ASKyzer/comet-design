import "@vaadin/form-layout";
import type { FormLayoutResponsiveStep } from "@vaadin/form-layout";
import "@vaadin/select";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-select")
export class DemoSelect extends LitElement {
  @state()
  private items = [
    {
      label: "Most recent first",
      value: "recent",
    },
    {
      label: "Rating: high to low",
      value: "rating-desc",
    },
    {
      label: "Rating: low to high",
      value: "rating-asc",
    },
    {
      label: "Price: high to low",
      value: "price-desc",
    },
    {
      label: "Price: low to high",
      value: "price-asc",
    },
  ];

  private responsiveSteps: FormLayoutResponsiveStep[] = [
    // Use one column by default
    { minWidth: 0, columns: 1 },
    // Use two columns, if the layout's width exceeds 320px
    { minWidth: "420px", columns: 2 },
  ];

  private responsiveStepsThreeColumns: FormLayoutResponsiveStep[] = [
    // Use one column by default
    { minWidth: 0, columns: 1 },
    // Use two columns, if the layout's width exceeds 420px
    // Use three columns, if the layout's width exceeds 690px
    { minWidth: "599px", columns: 3 },
  ];

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">vaadin Select</h1>

      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-select
          colspan
          label="Sort by"
          .items="${this.items}"
          .value="${this.items[0].value}"
        ></vaadin-select>

        <vaadin-select
          readonly
          label="Read-only"
          .items="${this.items}"
          .value="${this.items[0].value}"
        ></vaadin-select>
      </vaadin-form-layout>

      <vaadin-form-layout
        .responsiveSteps="${this.responsiveStepsThreeColumns}"
      >
        <vaadin-select
          disabled
          label="Disabled"
          helper-text="Disabled helper text"
          .items="${this.items}"
          .value="${this.items[0].value}"
        ></vaadin-select>

        <vaadin-select
          invalid
          required
          label="Invalid"
          helper-text="Helper text"
          placeholder="Placeholder"
          .items="${this.items}"
        >
          <div slot="error-message">Required field</div>
          <vaadin-tooltip slot="tooltip" text="Tooltip text"></vaadin-tooltip>
          <comet-icon
            slot="prefix"
            name="chat"
            size="24"
            primaryColor="neutral-60"
          ></comet-icon>
        </vaadin-select>

        <vaadin-select
          label="Placeholder"
          helper-text="Helper text"
          placeholder="Placeholder"
          .items="${this.items}"
        >
        </vaadin-select>
      </vaadin-form-layout>
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
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-select": DemoSelect;
  }
}
