import "@vaadin/date-time-picker";
import "@vaadin/form-layout";
import type { FormLayoutResponsiveStep } from "@vaadin/form-layout";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-date-time-picker")
export class DemoDateTimePicker extends LitElement {
  private responsiveSteps: FormLayoutResponsiveStep[] = [
    { minWidth: 0, columns: 1 },
    { minWidth: "599px", columns: 2 },
  ];

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Date Time Picker
      </h1>

      <vaadin-form-layout
        .responsiveSteps="${this.responsiveSteps}"
        style="max-width: 900px;"
      >
        <vaadin-date-time-picker
          label="Meeting date and time"
        ></vaadin-date-time-picker>

        <vaadin-date-time-picker
          label="With steps (30 mins)"
          value="2020-06-12T12:30"
          .step="${60 * 30}"
        ></vaadin-date-time-picker>

        <vaadin-date-time-picker
          label="Label"
          helper-text="Helper text"
          date-placeholder="Date"
          time-placeholder="Time"
        >
          <vaadin-tooltip slot="tooltip" text="Tooltip text"></vaadin-tooltip>
        </vaadin-date-time-picker>

        <vaadin-date-time-picker
          readonly
          label="Read-only"
          value="2020-06-12T12:30"
        >
        </vaadin-date-time-picker>

        <vaadin-date-time-picker
          disabled
          label="Disabled"
          helper-text="Disabled helper text"
        >
        </vaadin-date-time-picker>

        <vaadin-date-time-picker required invalid label="Invalid">
          <div slot="error-message">
            Please select both the start date and time.
          </div>
        </vaadin-date-time-picker>
      </vaadin-form-layout>
    `;
  }

  static styles = css``;
}
