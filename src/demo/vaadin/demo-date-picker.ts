import "@vaadin/date-picker";
import type { DatePickerChangeEvent } from "@vaadin/date-picker";
import "@vaadin/form-layout";
import type { FormLayoutResponsiveStep } from "@vaadin/form-layout";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-date-picker")
export class DemoDatePicker extends LitElement {
  public dateFormat = "dd.MM.yyyy";

  @state()
  private selectedDateValue: string = "";

  private responsiveSteps: FormLayoutResponsiveStep[] = [
    // Use one column by default
    { minWidth: 0, columns: 1 },
    // Use two columns, if the layout's width exceeds 599px

    { minWidth: "599px", columns: 2 },
  ];

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Date Picker
      </h1>

      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-date-picker
          style="flex-grow: 1;"
          placeholder="dd.mm.yyyy"
          label="Custom format:"
          value="${this.selectedDateValue}"
          helper-text="With function to customize the format"
          @change="${(event: DatePickerChangeEvent) => {
            this.selectedDateValue = event.target.value;
          }}"
        ></vaadin-date-picker>

        <vaadin-date-picker
          style="flex-grow: 1;"
          invalid
          required
          label="Invalid"
        >
          <div slot="error-message">Required</div>
        </vaadin-date-picker>
      </vaadin-form-layout>

      <vaadin-form-layout .responsiveSteps="${this.responsiveSteps}">
        <vaadin-date-picker
          style="flex-grow: 1;"
          disabled
          placeholder="dd.mm.yyyy"
          label="Disabled"
          value="${this.selectedDateValue}"
          helper-text="With function to customize the format"
          @change="${(event: DatePickerChangeEvent) => {
            this.selectedDateValue = event.target.value;
          }}"
        ></vaadin-date-picker>

        <vaadin-date-picker
          style="flex-grow: 1;"
          readonly
          label="Read-only"
          value="2020-06-12"
        >
          <div slot="error-message">Required</div>
        </vaadin-date-picker>
      </vaadin-form-layout>
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-date-picker": DemoDatePicker;
  }
}
