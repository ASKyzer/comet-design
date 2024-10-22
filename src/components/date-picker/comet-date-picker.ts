import { Maskito } from "@maskito/core";
import { LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../calendar/comet-calendar";
import { DisabledConfig } from "../calendar/comet-calendar.interface";
import dateMask from "./masks/date-mask";

@customElement("comet-date-picker")
export class CometDatePicker extends LitElement {
  @property({ type: Object }) private disabledConfig: DisabledConfig;
  @property({ type: Number }) private startYear: number;
  @property({ type: Number }) private endYear: number;
  @property() value: string | undefined;
  @property() label = "";
  @property() placeholder = "";
  @property() testid = "";
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) invalid = false;
  @property({ type: Boolean }) readonly = false;
  @query("vaadin-text-field") _input;
  @state() actualValue: string | undefined;
  @state() public showCalendar = false;
  @state() public showCalendarRange = false;
  @state() private _selectedDate: string;
  @state() private _maskedInput: Maskito;

  constructor() {
    super();
  }

  firstUpdated(): void {
    const element = this.shadowRoot.querySelector("input") as HTMLInputElement;
    if (element) {
      this._maskedInput = new Maskito(element, dateMask);
    }
    if (this.value) {
      const [year, month, day] = this.value.split("-");
      this.selectedDate = `${day}.${month}.${year}`;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._maskedInput.destroy();
  }

  onInputChange() {
    this.showCalendar = false;
    this.setDateFromInputValue();
  }

  setDateFromInputValue() {
    const inputElement = this.root.getElementById("date-input");
    const date = inputElement.value;

    if (this.isInvalidDate(date)) {
      this.clearInputField();
      return;
    }

    const isOutsideRange =
      (this.startYear !== undefined && date.getFullYear() < this.startYear) ||
      (this.endYear !== undefined && date.getFullYear() > this.endYear);

    if (isOutsideRange) {
      this.clearInputField();
      return;
    }

    this.selectedDate = date;
    this.actualValue = this.formatDateString(date);
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: this.actualValue,
      })
    );
  }

  clearInputField() {
    const inputElement = this.root.getElementById("date-input");
    this.actualValue = "";
    inputElement.value = "";
    this.selectedDate = "";
  }

  isInvalidDate(date: string): boolean {
    let invalid = false;
    const [day, month, year] = date.split(".");
    const parsedDate = new Date(`${year}/${month}/${day}`);
    const isValidDate = !isNaN(parsedDate.getTime());

    if (!isValidDate) {
      return true;
    }

    if (!invalid && this.disabledConfig?.weekday) {
      invalid ||=
        this.disabledConfig.weekday.indexOf(parsedDate.getDay()) !== -1;
    }
    if (!invalid && this.disabledConfig?.month) {
      invalid ||=
        this.disabledConfig.month.indexOf(parsedDate.getMonth()) !== -1;
    }
    if (!invalid && this.disabledConfig?.year) {
      invalid ||=
        this.disabledConfig.year.indexOf(parsedDate.getFullYear()) !== -1;
    }
    if (!invalid && this.disabledConfig?.valid_range) {
      const { start, end } = this.disabledConfig.valid_range;
      const timeOfDate = parsedDate.getTime();

      if (start) {
        const startArr = start.split(".") as string[];
        const startRange = new Date(
          `${startArr[1]}/${startArr[0]}/${startArr[2]}`
        ).getTime();
        invalid ||= timeOfDate < startRange;
      }

      if (end) {
        const endArr = end.split(".") as string[];
        const endRange = new Date(
          `${endArr[1]}/${endArr[0]}/${endArr[2]}`
        ).getTime();
        invalid ||= timeOfDate > endRange;
      }
    }

    if (!invalid && this.disabledConfig?.day_ranges) {
      this.disabledConfig.day_ranges.forEach((range) => {
        if (
          Number.parseInt(day) >= range[0] &&
          Number.parseInt(day) <= range[1]
        ) {
          invalid ||= true;
        }
      });
    }

    return invalid;
  }

  get root(): any {
    return this.shadowRoot || this;
  }

  set selectedDate(val) {
    let oldVal = this._selectedDate;
    this._selectedDate = val;
    this.requestUpdate("selectedDate", oldVal);
  }

  get selectedDate() {
    return this._selectedDate;
  }

  toggleCalendar(): void {
    this.setDateFromInputValue();
    this.showCalendar = !this.showCalendar;
    document.addEventListener("click", (event) => {
      if (!event.composedPath().includes(this)) {
        this.showCalendar = false;
      }
    });
  }

  updateDateValue(event: CustomEvent) {
    this.selectedDate = event.detail;
    this.showCalendar = false;
    this.actualValue = this.formatDateString(this.selectedDate);
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: this.actualValue,
      })
    );
  }

  formatDateString(inputDate: string): string | null {
    const [day, month, year] = inputDate.split(".");
    const formattedDate = new Date(`${year}-${month}-${day}`);
    if (isNaN(formattedDate.getTime())) {
      return null;
    }
    return formattedDate.toISOString().split("T")[0];
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="input_container">
          <vaadin-text-field
            value="${this.selectedDate}"
            id="date-input"
            label=${this.label}
            @blur=${this.onInputChange}
            ?invalid=${this.invalid}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            placeholder="${this.placeholder}"
            data-testid=${this.testid}
          >
            <comet-icon
              @click="${this.toggleCalendar}"
              class="calendar_icon"
              slot="suffix"
              name="calendar"
              primaryColor="${this._getIconColor()}"
              size="24"
              readonly=${this.readonly}
            ></comet-icon>
            <slot name="error-message" slot="error-message"></slot>
          </vaadin-text-field>
        </div>
        ${this.showCalendar
          ? html` <div class="calendar_container">
              <comet-calendar
                @on-date-selected="${this.updateDateValue}"
                .initialDate="${this.selectedDate}"
                .canSelectMonthAndYear="${true}"
                startYear=${ifDefined(this.startYear)}
                endYear=${ifDefined(this.endYear)}
                .disabledConfig=${ifDefined(this.disabledConfig)}
                abbreviationCount="2"
                theme="border grey shadow"
              ></comet-calendar>
            </div>`
          : ""}
      </div>
    `;
  }

  private _getIconColor() {
    if (this.disabled) return "neutral-50";
    if (this.readonly) return "neutral-60";
    return "neutral-70";
  }

  static styles = css`
    vaadin-text-field {
      width: 100%;
    }

    .wrapper {
      position: relative;
    }

    .calendar_icon {
      cursor: pointer;
    }

    .calendar_icon[readonly~="true"] {
      pointer-events: none;
    }

    .calendar_container {
      left: 0;
      min-width: 350px;
      position: absolute;
      top: 92px;
      z-index: 9999;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-date-picker": CometDatePicker;
  }
}
