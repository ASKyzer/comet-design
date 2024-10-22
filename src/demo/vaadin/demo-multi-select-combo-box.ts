import "@vaadin/form-layout";
import type { FormLayoutResponsiveStep } from "@vaadin/form-layout";
import "@vaadin/multi-select-combo-box";
import type { MultiSelectComboBoxI18n } from "@vaadin/multi-select-combo-box";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { COUNTRIES } from "../constants/countries";

@customElement("demo-multi-select-combo-box")
export class DemoMultiSelectComboBox extends LitElement {
  @state()
  private items: any[] = COUNTRIES;
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    { minWidth: 0, columns: 1 },
    { minWidth: "599px", columns: 2 },
  ];
  private i18n: MultiSelectComboBoxI18n = {
    cleared: "Alle Einträge entfernt",
    focused: " ausgewählt. Drücke Rücktaste zum Entfernen",
    selected: " hinzugefügt",
    deselected: " entfernt",
    total: "{count} Einträge ausgewählt",
  };

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Multi Select Combo Box
      </h1>

      <vaadin-form-layout
        .responsiveSteps="${this.responsiveSteps}"
        style="max-width: 800px;"
      >
        <vaadin-multi-select-combo-box
          required
          placeholder="Select countries to visit"
          label="Countries"
          item-label-path="name"
          item-id-path="code"
          .items="${this.items}"
        >
          <div slot="error-message">Please select at least one country</div>
        </vaadin-multi-select-combo-box>

        <vaadin-multi-select-combo-box
          helper-text="The first 4 countries that start with A are pre-selected"
          label="Pre-selected items"
          item-label-path="name"
          item-id-path="code"
          .items="${this.items}"
          .selectedItems="${this.items.slice(0, 4)}"
        ></vaadin-multi-select-combo-box>

        <vaadin-multi-select-combo-box
          label="Read-only"
          item-label-path="name"
          item-id-path="code"
          .items="${this.items}"
          .selectedItems="${this.items.slice(0, 4)}"
          readonly
        ></vaadin-multi-select-combo-box>

        <vaadin-multi-select-combo-box
          label="Länder (internationalization)"
          item-label-path="name"
          item-id-path="code"
          .items="${this.items}"
          .i18n="${this.i18n}"
        >
        </vaadin-multi-select-combo-box>

        <vaadin-multi-select-combo-box
          disabled
          label="Disabled"
          item-label-path="name"
          item-id-path="code"
          .items="${this.items}"
          .selectedItems="${this.items.slice(0, 4)}"
        >
          <div slot="error-message">Please select at least one country</div>
        </vaadin-multi-select-combo-box>

        <vaadin-multi-select-combo-box
          invalid
          required
          label="Invalid"
          item-label-path="name"
          item-id-path="code"
          .items="${this.items}"
        >
          <div slot="error-message">Please select at least one country</div>
        </vaadin-multi-select-combo-box>
      </vaadin-form-layout>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-multi-select-combo-box": DemoMultiSelectComboBox;
  }
}
