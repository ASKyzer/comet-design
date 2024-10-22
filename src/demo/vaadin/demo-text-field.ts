import { FormLayoutResponsiveStep } from "@vaadin/form-layout";
import "@vaadin/text-field";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-text-field")
export class DemoTextField extends LitElement {
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    { minWidth: 0, columns: 1 },
    { minWidth: "420px", columns: 2 },
    { minWidth: "690px", columns: 3 },
  ];
  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">vaadin Text Field</h1>

      <div class="text">
        Text Field allows the user to input and edit text. Prefix and suffix
        components, such as icons, are also supported.
      </div>
      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-text-field
          label="Street"
          value="Ruukinkatu 2"
          clear-button-visible
        >
          <comet-icon
            slot="prefix"
            name="search"
            size="24"
            primaryColor="neutral-60"
          ></comet-icon>
        </vaadin-text-field>

        <vaadin-text-field
          required
          min-length="5"
          max-length="18"
          placeholder="+34 456876295"
          pattern="^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$"
          allowed-char-pattern="[0-9()+-]"
          label="Phone number"
          helper-text="Format: +(123)456-7890"
          ><div slot="error-message">Required</div></vaadin-text-field
        >

        <vaadin-text-field readonly label="Read-only" value="Value">
        </vaadin-text-field>

        <vaadin-text-field disabled label="Disabled" helper-text="Helper text">
        </vaadin-text-field>

        <vaadin-text-field
          theme="align-right small helper-above-field"
          label="Label"
          helper-text="Helper text"
          value="Value"
          style="--vaadin-input-field-border-width: 1px;"
        >
        </vaadin-text-field>

        <vaadin-text-field
          required
          invalid
          theme="align-right small helper-above-field"
          label="Invalid"
          helper-text="Helper text"
          style="--vaadin-input-field-border-width: 1px;"
        >
          <div slot="error-message">Required</div>
        </vaadin-text-field>
      </vaadin-form-layout>
    `;
  }

  static styles = css`
    .text {
      color: var(--primary-60);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-text-field": DemoTextField;
  }
}
