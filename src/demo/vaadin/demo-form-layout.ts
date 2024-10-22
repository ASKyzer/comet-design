import "@vaadin/email-field";
import "@vaadin/form-layout";
import type { FormLayoutResponsiveStep } from "@vaadin/form-layout";
import "@vaadin/horizontal-layout";
import "@vaadin/number-field";
import "@vaadin/split-layout";
import "@vaadin/text-field";
import "@vaadin/vertical-layout";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-form-layout")
export class DemoFormLayout extends LitElement {
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    // Use one column by default
    { minWidth: 0, columns: 1 },
    // Use two columns, if the layout's width exceeds 320px
    { minWidth: "420px", columns: 12 },
  ];

  private responsiveStepsThreeColumns: FormLayoutResponsiveStep[] = [
    // Use one column by default
    { minWidth: 0, columns: 1 },
    // Use two columns, if the layout's width exceeds 420px
    { minWidth: "420px", columns: 2 },
    // Use three columns, if the layout's width exceeds 690px
    { minWidth: "690px", columns: 3 },
  ];

  protected override render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Form Layout
      </h1>

      <h4 style="color: var(--primary-50); margin-top: 0">
        This layout is with a colspan of 12 and then 1 at the 500px breakpoint.
        Line 1: colspan="6", colspan="6" Line 2: colspan="12" Line 3:
        colspan="8", colspan="4" Line 4: colspan="4", colspan="8"
      </h4>

      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-text-field colspan="6" label="First name"></vaadin-text-field>
        <vaadin-text-field colspan="6" label="Last name"></vaadin-text-field>
        <!-- Stretch the username field over 2 columns -->
        <vaadin-email-field
          colspan="12"
          label="Email address"
          name="email"
          value="julia.scheider@email.com"
          error-message="Enter a valid email address"
          clear-button-visible
        ></vaadin-email-field>
        <vaadin-text-field colspan="8" label="Street"></vaadin-text-field>
        <vaadin-number-field
          colspan="4"
          label="House number"
        ></vaadin-number-field>
        <vaadin-number-field
          colspan="4"
          label="Postal code"
        ></vaadin-number-field>
        <vaadin-text-field colspan="8" label="City"></vaadin-text-field>
      </vaadin-form-layout>

      <h4 style="color: var(--primary-50); margin-top: 48px">
        When another input group needs a different layout we can wrap it in
        another form-layout component and assign it a different responsive steps
        configuration. Below is 1 column up to 420px and then 2 cols up to 690px
        then 3.
      </h4>

      <vaadin-form-layout
        .responsiveSteps="${this.responsiveStepsThreeColumns}"
      >
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

        <vaadin-email-field disabled label="Disabled"> </vaadin-email-field>
      </vaadin-form-layout>
    `;
  }

  static styles = css``;
}
