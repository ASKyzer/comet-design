import "@vaadin/form-layout";
import { FormLayoutResponsiveStep } from "@vaadin/form-layout";
import "@vaadin/time-picker";
import type { TimePickerChangeEvent } from "@vaadin/time-picker";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-time-picker")
export class DemoTimePicker extends LitElement {
  @state()
  protected errorMessage = "";
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    { minWidth: 0, columns: 1 },
    { minWidth: "599px", columns: 2 },
  ];

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Time Picker
      </h1>

      <vaadin-form-layout
        class="container"
        .responsiveSteps="${this.responsiveSteps}"
      >
        <vaadin-time-picker label="Alarm" value="07:00"></vaadin-time-picker>

        <vaadin-time-picker
          label="Steps (30mins)"
          value="12:30"
          .step="${60 * 30}"
        ></vaadin-time-picker>

        <vaadin-time-picker
          label="Min/Max time"
          helper-text="Open 8:00-16:00"
          value="08:30"
          min="08:00"
          max="16:00"
          .step="${60 * 30}"
          error-message="${this.errorMessage}"
          @change="${(event: TimePickerChangeEvent) => {
            const { min, max, value } = event.target;
            if (value < min) {
              this.errorMessage = "Too early, choose another time";
            } else if (value > max) {
              this.errorMessage = "Too late, choose another time";
            } else {
              this.errorMessage = "";
            }
          }}"
        ></vaadin-time-picker>

        <vaadin-time-picker
          label="Placeholder w/ icon & clear button"
          helper-text="Helper text"
          placeholder="Placeholder"
          clear-button-visible
        >
          <comet-icon
            slot="prefix"
            name="home"
            primaryColor="neutral-60"
            size="24"
          ></comet-icon>
        </vaadin-time-picker>

        <vaadin-time-picker readonly label="Read-only" value="07:00">
        </vaadin-time-picker>

        <vaadin-time-picker
          disabled
          label="Disabled"
          helper-text="Disabled helper text"
        >
        </vaadin-time-picker>

        <vaadin-time-picker
          required
          invalid
          clear-button-visible
          label="Invalid"
        >
          <div slot="error-message">
            Please select a time for your appointment
          </div>
        </vaadin-time-picker>
      </vaadin-form-layout>
    `;
  }

  static styles = css`
    .container {
      max-width: 800px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-time-picker": DemoTimePicker;
  }
}
