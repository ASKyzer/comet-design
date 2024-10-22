import "@vaadin/email-field";
import "@vaadin/form-layout";
import type { FormLayoutResponsiveStep } from "@vaadin/form-layout";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-email-field")
export class DemoEmailField extends LitElement {
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    // Use one column by default
    { minWidth: 0, columns: 1 },
    // Use two columns, if the layout's width exceeds 420px
    { minWidth: "420px", columns: 2 },
    // Use three columns, if the layout's width exceeds 690px
    { minWidth: "690px", columns: 3 },
  ];

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Email Field
      </h1>

      <div class="text">
        Email Field is an extension of Text Field that accepts only email
        addresses as input. If the given address is invalid, the field is
        highlighted in red and an error message appears underneath the input.
      </div>

      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-email-field
          label="Email address"
          name="email"
          value="julia.scheider@email.com"
          error-message="Enter a valid email address"
          clear-button-visible
        ></vaadin-email-field>

        <vaadin-email-field
          label="Email address"
          name="email"
          value="This is not an email"
          error-message="Enter a valid email address"
          clear-button-visible
          invalid
        ></vaadin-email-field>

        <vaadin-email-field
          label="Label"
          helper-text="Helper text"
          placeholder="Placeholder"
          clear-button-visible
        >
          <vaadin-tooltip slot="tooltip" text="Tooltip text"></vaadin-tooltip>
          <vaadin-icon slot="prefix" icon="vaadin:envelope"></vaadin-icon>
        </vaadin-email-field>

        <vaadin-email-field
          pattern="^.+@example\\.com$"
          required
          label="Email address"
          error-message="Enter a valid example.com email address"
          helper-text="Only example.com addresses allowed"
        ></vaadin-email-field>

        <vaadin-email-field
          readonly
          label="Read-only"
          value="example@example.com"
        >
        </vaadin-email-field>

        <vaadin-email-field
          disabled
          label="Disabled"
          helper-text="Disabled helper text"
        >
        </vaadin-email-field>
      </vaadin-form-layout>
    `;
  }

  static styles = css`
    .text {
      color: var(--primary-60);
    }
  `;
}
