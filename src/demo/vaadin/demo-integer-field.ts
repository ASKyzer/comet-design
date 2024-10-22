import "@vaadin/horizontal-layout";
import "@vaadin/integer-field";
import "@vaadin/vertical-layout";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("demo-integer-field")
export class DemoIntegerField extends LitElement {
  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Integer Field
      </h1>

      <vaadin-vertical-layout theme="spacing">
        <div class="text">
          The integer field inherits the styling of the number field. When using
          it with min/max, it is a good idea to set an initial value.
        </div>
        <vaadin-horizontal-layout theme="spacing">
          <vaadin-integer-field
            label="With min & max"
            helper-text="Max 10 items"
            min="0"
            max="10"
            value="2"
            step-buttons-visible
            required
          >
            <div slot="error-message">Required</div>
          </vaadin-integer-field>

          <vaadin-integer-field
            label="X"
            value="-1284"
            helper-text="Can be a negative integer"
          ></vaadin-integer-field>

          <vaadin-integer-field label="Y" value="3910" required
            ><div slot="error-message">
              Error message here.
            </div></vaadin-integer-field
          >
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout theme="spacing">
          <vaadin-integer-field
            required
            invalid
            label="Invalid"
            helper-text="Max 10 items"
            min="0"
            max="10"
            step-buttons-visible
          >
            <div slot="error-message">Required</div></vaadin-integer-field
          >

          <vaadin-integer-field
            disabled
            label="Disabled"
            value="-1284"
            helper-text="Can be a negative integer"
          ></vaadin-integer-field>

          <vaadin-integer-field label="Read-only" value="3910" required readonly
            ><div slot="error-message">
              Error message here.
            </div></vaadin-integer-field
          >
        </vaadin-horizontal-layout>

        <vaadin-integer-field
          label="Younges person"
          placeholder="Placeholder"
          required
          ><div slot="error-message">
            Error message here.
          </div></vaadin-integer-field
        >
      </vaadin-vertical-layout>
    `;
  }

  static styles = css`
    .text {
      color: var(--primary-60);
    }
  `;
}
