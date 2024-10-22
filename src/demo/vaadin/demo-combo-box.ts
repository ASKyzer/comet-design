import "@vaadin/combo-box";
import "@vaadin/form-layout";
import type { FormLayoutResponsiveStep } from "@vaadin/form-layout";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-combo-box")
export class DemoComboBox extends LitElement {
  @state()
  private items = ["Chrome", "Edge", "Firefox", "Safari"];

  private responsiveSteps: FormLayoutResponsiveStep[] = [
    // Use one column by default
    { minWidth: 0, columns: 1 },
    // Use two columns, if the layout's width exceeds 599px

    { minWidth: "599px", columns: 2 },
  ];

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">vaadin Combo Box</h1>

      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-combo-box
          style="flex-grow: 1;"
          required
          helper-text="Helper text goes here"
          label="Browser"
          placeholder="Placeholder"
          item-label-path="name"
          item-value-path="id"
          .items="${this.items}"
        >
          <div slot="error-message">Required</div>
        </vaadin-combo-box>
        <vaadin-combo-box
          style="flex-grow: 1;"
          required
          invalid
          label="Invalid"
          placeholder="Placeholder"
          item-label-path="name"
          item-value-path="id"
          .items="${this.items}"
        >
          <div slot="error-message">Required</div>
        </vaadin-combo-box>
      </vaadin-form-layout>

      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-combo-box
          style="flex-grow: 1;"
          disabled
          required
          helper-text="Helper text goes here"
          label="Disabled"
          placeholder="Placeholder"
          item-label-path="name"
          item-value-path="id"
          .items="${this.items}"
        >
          <div slot="error-message">Required</div>
        </vaadin-combo-box>
        <vaadin-combo-box
          style="flex-grow: 1;"
          readonly
          helper-text="Helper text goes here"
          label="Read-only"
          .items="${["Value"]}"
          value="Value"
        >
          <div slot="error-message">Required</div>
        </vaadin-combo-box>
      </vaadin-form-layout>

      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-combo-box
          style="flex-grow: 1;"
          label="With icon and clear"
          helper-text="Clear button appears when there is a value"
          placeholder="Placeholder"
          clear-button-visible
          .items="${["Value"]}"
        >
          <comet-icon
            slot="prefix"
            name="search"
            size="24"
            primaryColor="neutral-60"
          ></comet-icon>
        </vaadin-combo-box>

        <vaadin-combo-box
          style="flex-grow: 1;"
          auto-open-disabled
          helper-text="The overlay opens automatically when the field is focused using a pointer (i.e., mouse or touch), or when the user types in the field. You can disable this so that the overlay opens only when the toggle button or the Up/Down arrow keys are pressed."
          label="Auto open disabled"
          item-label-path="name"
          item-value-path="id"
          .items="${this.items}"
        ></vaadin-combo-box>
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
    "demo-combo-box": DemoComboBox;
  }
}
