import "@vaadin/form-layout";
import type { FormLayoutResponsiveStep } from "@vaadin/form-layout";
import "@vaadin/password-field";
import { PasswordFieldValueChangedEvent } from "@vaadin/password-field";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/icon/comet-icon";

type PasswordStrength = "moderate" | "strong" | "weak";

const StrengthColor: Record<PasswordStrength, string> = {
  weak: "red",
  moderate: "var(--comet-color-font-light)",
  strong: "var(--success-50)",
};

@customElement("demo-password-field")
export class DemoPasswordField extends LitElement {
  @state()
  strengthText: PasswordStrength = "weak";

  @state()
  strengthColor = StrengthColor.weak;

  pattern = "^(?=.*[0-9])(?=.*[a-zA-Z]).{8}.*$";

  responsiveSteps: FormLayoutResponsiveStep[] = [
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
        vaadin Password Field
      </h1>

      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-password-field
          label="Password"
          value="Ex@mplePassw0rd"
        ></vaadin-password-field>

        <vaadin-password-field
          label="Reveal hidden"
          value="Ex@mplePassw0rd"
          reveal-button-hidden
        ></vaadin-password-field>

        <vaadin-password-field
          label="Helper text"
          helper-text="Helper text"
          clear-button-visible
        >
        </vaadin-password-field>

        <vaadin-password-field
          label="Placeholder"
          placeholder="Placeholder text"
          clear-button-visible
        >
          <comet-icon
            slot="prefix"
            name="lock"
            size="32"
            primaryColor="neutral-60"
          ></comet-icon>
        </vaadin-password-field>

        <vaadin-password-field
          allowed-char-pattern="[A-Za-z0-9]"
          required
          min-length="6"
          max-length="12"
          label="Password"
          helper-text="6 to 12 characters. Only letters A-Z and numbers supported."
        ></vaadin-password-field>

        <vaadin-password-field
          readonly
          label="Read-only"
          value="Ex@mplePassw0rd"
        >
        </vaadin-password-field>

        <vaadin-password-field
          disabled
          label="Disabled"
          helper-text="Disabled helper text"
        >
        </vaadin-password-field>

        <vaadin-password-field
          invalid
          label="Invalid"
          value="Ex@mplePassw0rd"
          error-message="Not a valid password"
        ></vaadin-password-field>

        <vaadin-password-field
          label="Password strength indicator"
          @value-changed="${this.onPasswordChanged}"
          pattern="${this.pattern}"
          error-message="Not a valid password"
        >
          <comet-icon
            name="check"
            slot="suffix"
            primarycolor="success-60"
            ?hidden="${this.strengthText !== "strong"}"
          ></comet-icon>
          <div slot="helper">
            Password strength:
            <span class="strength-color-${this.strengthText}"
              >${this.strengthText}</span
            >
          </div>
        </vaadin-password-field>
      </vaadin-form-layout>
    `;
  }

  private onPasswordChanged(event: PasswordFieldValueChangedEvent) {
    let strength: PasswordStrength = "weak";
    const { value } = event.detail;
    if (value) {
      if (value.length > 9) {
        strength = "strong";
      } else if (value.length > 5) {
        strength = "moderate";
      }
    }
    this.strengthText = strength;
    this.strengthColor = StrengthColor[strength];
  }

  static styles = css`
    .strength-color-weak {
      color: var(--comet-color-invalid);
      -webkit-text-fill-color: var(--comet-color-invalid);
    }
    .strength-color-moderate {
      color: var(--comet-color-font-light);
      -webkit-text-fill-color: var(--comet-color-font-light);
    }
    .strength-color-strong {
      color: var(--success-50);
      -webkit-text-fill-color: var(--success-60);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-password-field": DemoPasswordField;
  }
}
