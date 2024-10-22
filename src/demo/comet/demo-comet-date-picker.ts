import "@vaadin/text-field";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/calendar/comet-calendar";

@customElement("demo-comet-date-picker")
export class DemoCometDatePicker extends LitElement {
  @state() public showCalendar = false;
  @state() public showCalendarRange = false;
  @state() public startYear = 2023;
  @state() public endYear = 2050;

  private _selectedDate: string;
  private _rangeStartDate: string;
  private _rangeEndDate: string;

  constructor() {
    super();
    this._selectedDate = "";
    this._rangeStartDate = "";
    this._rangeEndDate = "";
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

  set rangeStartDate(val) {
    let oldVal = this._rangeStartDate;
    this._rangeStartDate = val;
    this.requestUpdate("rangeStartDate", oldVal);
  }

  get rangeStartDate() {
    return this._rangeStartDate;
  }

  set rangeEndDate(val) {
    let oldVal = this._rangeEndDate;
    this._rangeEndDate = val;
    this.requestUpdate("rangeEndDate", oldVal);
  }

  get rangeEndDate() {
    return this._rangeEndDate;
  }

  updateDateValue(event: CustomEvent) {
    this.selectedDate = event.detail;
    this.showCalendar = false;
  }

  updateRangeInputs(event: CustomEvent) {
    this.rangeStartDate = event.detail.start_date;
    this.rangeEndDate = event.detail.end_date;
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

  toggleCalendarRange(): void {
    this.showCalendarRange = !this.showCalendarRange;
    document.addEventListener("click", (event) => {
      if (!event.composedPath().includes(this)) {
        this.showCalendarRange = false;
      }
    });
  }

  onKeyUp() {
    this.showCalendar = false;
    this.setDateFromInputValue();
  }

  setDateFromInputValue() {
    const inputElement = this.root.getElementById("date-input");
    const value = inputElement.value;

    if (value.length === 10) {
      const [day, month, year] = value.split(".");
      const date = new Date(`${year}/${month}/${day}`);
      const isValidDate = !isNaN(date.getTime());

      if (!isValidDate) {
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

      this.selectedDate = value;
    }
  }

  clearInputField() {
    const inputElement = this.root.getElementById("date-input");
    inputElement.value = "";
    this.selectedDate = "";
  }

  render() {
    return html`
      <h1 id="header" style="color: var(--primary-50); margin-top: 0">
        Demo Comet Date Picker
      </h1>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        This demo shows how we can build the date picker component by combining
        an input element with the Comet Calendar component and binding the
        value.
      </h3>

      <div class="wrapper">
        <div class="input_container">
          <vaadin-text-field
            label="Start date"
            value="${this.selectedDate}"
            ?required="${true}"
            id="date-input"
            @keyup="${this.onKeyUp}"
          >
            <comet-icon
              @click="${this.toggleCalendar}"
              class="calendar_icon"
              slot="suffix"
              name="calendar"
              primaryColor="neutral-70"
              size="24"
            ></comet-icon>
            <div slot="error-message">Required</div>
          </vaadin-text-field>
        </div>
        ${this.showCalendar
          ? html` <div class="calendar_container">
              <comet-calendar
                id="calendar"
                @on-date-selected="${this.updateDateValue}"
                .initialDate="${this.selectedDate}"
                .canSelectMonthAndYear="${true}"
                .startYear="${this.startYear}"
                .endYear="${this.endYear}"
                abbreviationCount="2"
                localeString="es-ES"
                theme="border grey shadow"
              ></comet-calendar>
            </div>`
          : ""}
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        The calendar when used with rangeSelection = true can also be used to
        select a date range.
      </h3>

      <div class="wrapper2 date-range-wrapper">
        <div class="input_container_range">
          <vaadin-text-field
            label="Start date"
            value="${this.rangeStartDate}"
            ?required="${true}"
            id="date-input"
            readonly
            @keyup="${this.onKeyUp}"
          >
            <comet-icon
              @click="${this.toggleCalendarRange}"
              class="calendar_icon"
              slot="suffix"
              name="calendar"
              primaryColor="neutral-70"
              size="24"
            ></comet-icon>
            <div slot="error-message">Required</div>
          </vaadin-text-field>
          <vaadin-text-field
            label="End date"
            value="${this.rangeEndDate}"
            ?required="${true}"
            id="date-input"
            readonly
            @keyup="${this.onKeyUp}"
          >
            <comet-icon
              @click="${this.toggleCalendarRange}"
              class="calendar_icon"
              slot="suffix"
              name="calendar"
              primaryColor="neutral-70"
              size="24"
            ></comet-icon>
            <div slot="error-message">Required</div>
          </vaadin-text-field>
        </div>
        ${this.showCalendarRange
          ? html` <div class="calendar_container_range">
              <comet-calendar
                id="calendar"
                @on-range-selected="${this.updateRangeInputs}"
                .initialRange="${{
                  start: this.rangeStartDate,
                  end: this.rangeEndDate,
                }}"
                .canSelectMonthAndYear="${true}"
                .startYear="${this.startYear}"
                .endYear="${this.endYear}"
                .rangeSelection=${true}
                abbreviationCount="2"
                localeString="es-ES"
                theme="border grey shadow"
              ></comet-calendar>
            </div>`
          : ""}
      </div>
    `;
  }

  static styles = css`
    vaadin-text-field {
      width: 400px;
    }

    .wrapper {
      position: relative;
    }

    .calendar_icon {
      cursor: pointer;
    }

    .calendar_container {
      left: 0;
      min-width: 350px;
      position: absolute;
      top: 92px;
      z-index: 9999;
    }

    .wrapper2 {
      height: 500px;
      position: relative;
      margin-bottom: 500px;
    }

    .input_container_range {
      display: flex;
      gap: 8px;
      max-width: 500px;
    }

    .calendar_container_range {
      left: 0;
      min-width: 350px;
      max-width: 464px;
      width: 100%;
      position: absolute;
      top: 92px;
      z-index: 9998;
    }
  `;
}
