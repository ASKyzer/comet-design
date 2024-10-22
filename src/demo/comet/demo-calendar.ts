import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/calendar/comet-calendar";

@customElement("demo-calendar")
export class DemoCalendar extends LitElement {
  private _dateValue: string;
  private _rangeEnd: string;
  private _rangeStart: string;

  private _seasonImage;
  private _imgURL = {
    fall: "https://media.istockphoto.com/id/1437987503/es/foto/washington-dc-en-el-oto%C3%B1o.jpg?s=612x612&w=0&k=20&c=1PAbPPFys14X79jaJtwm8_--9S4kISksPyTh34iMfXU=",
    winter:
      "https://media.istockphoto.com/id/465494106/es/foto/monumento-a-washington-tormenta-de-nieve-de-washington-dc.jpg?s=612x612&w=0&k=20&c=bFO_3XX-guZu0NXmhRdnbkibAu5E97eoNuGx43snYwA=",
    spring:
      "https://media.istockphoto.com/id/1203816477/es/foto/washington-dc-estados-unidos-en-primavera.jpg?s=612x612&w=0&k=20&c=17IrEYdCdyR-uJHY9OHoVuPxpDj5sHBfoKU9T_JZ-_8=",
    summer:
      "https://media.istockphoto.com/id/918165728/es/foto/monumento-a-washington-dc.jpg?s=612x612&w=0&k=20&c=bFv6bcedXZEC87xcLf-u0QShihsEKEsq0KPJMlzXve4=",
  };

  constructor() {
    super();
    this._dateValue = "";
    this._rangeEnd = "";
    this._rangeStart = "";
    this._seasonImage = "";
  }

  set dateValue(val) {
    let oldVal = this._dateValue;
    this._dateValue = val;
    this.requestUpdate("dateValue", oldVal);
  }

  get dateValue() {
    return this._dateValue;
  }

  set rangeStart(val) {
    let oldVal = this._rangeStart;
    this._rangeStart = val;
    this.requestUpdate("rangeStart", oldVal);
  }

  get rangeStart() {
    return this._rangeStart;
  }
  set rangeEnd(val) {
    let oldVal = this._rangeEnd;
    this._rangeEnd = val;
    this.requestUpdate("rangeEnd", oldVal);
  }

  get rangeEnd() {
    return this._rangeEnd;
  }

  set seasonImage(val) {
    let oldVal = this._seasonImage;
    this._seasonImage = val;
    this.requestUpdate("seasonImage", oldVal);
  }

  get seasonImage() {
    return this._seasonImage;
  }

  onDateSelected(event: CustomEvent) {
    this.dateValue = event.detail;
  }

  onMonthChange(event: CustomEvent) {
    this.seasonImage = this.getImageSource(event.detail) as string;
  }

  onRangeSelected(event: CustomEvent) {
    this.rangeStart = event.detail.start_date;
    this.rangeEnd = event.detail.end_date;
  }

  firstUpdated() {
    const date = new Date();
    const month = date.getMonth();
    this.seasonImage = this.getImageSource(month) as string;
  }

  getToday = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${this._addZero(day)}.${this._addZero(month + 1)}.${year}`;
  };

  private _addZero(date: number): string | undefined {
    if (!date) {
      return;
    }

    const dateString = date.toString();
    return dateString.length === 1 ? `0${dateString}` : dateString;
  }

  private getImageSource(month: number) {
    if (month >= 2 && month <= 4) {
      return this._imgURL.spring;
    }
    if (month >= 5 && month <= 7) {
      return this._imgURL.summer;
    }
    if (month >= 8 && month <= 10) {
      return this._imgURL.fall;
    }
    if (month === 11 || month === 0 || month === 1) {
      return this._imgURL.winter;
    }
  }

  getValidRange = () => {
    const date = new Date();
    // The valid range will be today and up to three years
    const start = date.toLocaleDateString("en-GB").replace(/\//g, ".");
    const end = this.addYears(date, 3)
      .toLocaleDateString("en-GB")
      .replace(/\//g, ".");

    return {
      valid_range: {
        start,
        end,
      },
    };
  };

  getCurrentYear = () => {
    return new Date().getFullYear();
  };

  addYears(date: Date, years: number) {
    date.setFullYear(date.getFullYear() + years);
    return date;
  }

  disablePriorMonths = (): number[] => {
    return Array.from({ length: new Date().getMonth() }, (d, i) => i);
  };

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Calendar</h1>

      <div class="selected_date_box">
        <div
          style="margin-right: 4px; display: inline-flex; white-space: nowrap;"
        >
          Selected Date:
          <input
            id="selectedDateValue"
            style="width: max-content; border: none; background-color: transparent; margin-left: 8px; color: var(--tertiary-40);       font-family: var(--lumo-font-family); font-weight: bold; font-size: 16px"
            value="${this.dateValue}"
          />
        </div>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 0">
        The comet calendar is a Gregorian calendar that can be used simply as a
        display or as an interactive tool to navigate and select a particular
        date. The calendar has two text colour themes: purple by default or
        grey. It also allows for month by month navigation or to select a
        particular month and/or year. The calendar can also allow to only select
        permissible dates by disabling certain dates such as days of the week,
        months, day ranges withing a month, years. You can also set a valid
        range by disabling dates prior to and after the dates in the range. The
        calendar, by default will display a range of 100 years prior to and 100
        years after the current year, however, that range can also be
        customized. Internationalization can be set by choosing the proper
        locale string code. By default, this is English ('en-GB') and the first
        example is Greek, 'el-GR'. If, however, the locale string code does not
        return a correct result, one can also pass the values array to the
        component.
      </h3>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        Basic calendar with minimal/all default configs.
      </h3>

      <div
        class="wrapper5"
        id="basicCalendarContainer"
        style="padding: 24px 96px 24px 48px; background: var(--neutral-10); width: 500px;"
      >
        <comet-calendar
          id="firstCalendar"
          @on-date-selected="${this.onDateSelected}"
        ></comet-calendar>
      </div>
      <br />

      <div class="wrapper">
        <div class="cal_container" id="greekCalendarContainer">
          <comet-calendar
            id="greekCalendar"
            @on-date-selected="${this.onDateSelected}"
            abbreviationCount="2"
            theme="transparent"
            localeString="el-GR"
            .endYear=${this.getCurrentYear() + 3}
            .startYear=${this.getCurrentYear()}
            .disabledConfig="${this.getValidRange()}"
          ></comet-calendar>
        </div>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 0">
        The size of the calendar is based on the width of the user's container.
        The height is automatically adjusted so that the cells (days container)
        has an aspect ratio of 5:3.
      </h3>

      <h3 style="color: var(--primary-50); margin-top: 0">
        The default theme has a white background and purple text color, but it
        can be removed like the above calendar by adding a transparent theme as
        shown above. The grey color theme is shown below.
      </h3>

      <div class="wrapper2">
        <div class="cal-container">
          <div>
            <img width="516px" height="350px" src="${this.seasonImage}" />
          </div>
          <comet-calendar
            @on-date-selected="${this.onDateSelected}"
            @on-month-change="${this.onMonthChange}"
            localeString="de-DE"
            theme="grey"
            .endYear=${this.getCurrentYear()}
            .startYear=${this.getCurrentYear()}
            .canSelect="${{ month: true, year: false }}"
            .disabledConfig="${{
              weekday: [0, 2, 4, 6],
              month: this.disablePriorMonths(),
              valid_range: { start: this.getToday(), end: "31.12.2023" },
            }}"
          ></comet-calendar>
        </div>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        Set day ranges within a single month
      </h3>

      <div class="wrapper3">
        <comet-calendar
          @on-date-selected="${this.onDateSelected}"
          abbreviationCount="3"
          theme="shadow border"
          .endYear=${this.getCurrentYear() + 75}
          .startYear=${this.getCurrentYear()}
          .disabledConfig="${{
            day_ranges: [
              [1, 7],
              [18, 18],
              [23, 31],
            ],
          }}"
        ></comet-calendar>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        Selection of Date Range. A range of date can be selected. The start and
        end date will be is the selected primary-50 color while all dates that
        fall in between will have the light primary-10 background highlighted
        color.
      </h3>

      <div class="wrapper4">
        <comet-calendar
          @on-range-selected="${this.onRangeSelected}"
          abbreviationCount="3"
          .canSelect=${{ month: false, year: false }}
          .rangeSelection=${true}
          .endYear=${2050}
          .startYear=${2023}
        ></comet-calendar>

        <div
          style="margin-right: 4px; margin-top: 16px; color: var(--primary-80);"
        >
          ${this.rangeStart
            ? html`<span>Start date: ${this.rangeStart}</span>`
            : ""}
          ${this.rangeEnd
            ? html`<span> - End date: ${this.rangeEnd}</span>`
            : ""}
        </div>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        Secondary Theme: combines the grey theme for the calendar with the
        selected and highlight colors using the comet secondary color variants.
      </h3>

      <div
        style="padding: 24px 96px 24px 48px; background: var(--neutral-10); width: 500px;"
      >
        <comet-calendar
          id="secondaryTheme"
          theme="secondary"
          rangeSelection="true"
          @on-date-selected="${this.onDateSelected}"
        ></comet-calendar>
      </div>
      <br />

      <h3 style="color: var(--primary-50); margin-top: 48px">
        See also how the calendar can be used as a date picker with or without a
        combined text input in the
        <a href="/comet-date-picker">Comet Date Picker</a>
      </h3>
    `;
  }

  static styles = css`
    .selected_date_box {
      background-color: var(--secondary-60);
      border: 1px solid var(--secondary-70);
      border-radius: 50px;
      box-shadow: var(--shadow-large);
      color: var(--tertiary-40);
      padding: 16px;
      position: fixed;
      right: 40px;
      top: 86px;
      width: 250px;
      z-index: 99999;
    }

    .wrapper {
      background: #eee5ee;
      margin-bottom: 48px;
      width: 100%;
    }

    .wrapper ::part(comet-calendar-header) {
      font-weight: normal;
    }

    .wrapper .cal_container {
      max-width: 350px;
      min-width: 300px;
    }

    .wrapper2 ::part(comet-calendar-wrapper) {
      border: 1px solid var(--neutral-100);
      font-size: 24px;
      padding: 16px 8px 8px;
      width: 500px;
    }

    .wrapper2 .cal-container {
      align-items: center;
      background: var(--neutral-100);
      border: 1px solid black;
      display: flex;
      flex-direction: column;
      padding: 6px;
      width: 524px;
    }

    .wrapper3 {
      max-width: 450px;
      min-width: 350px;
    }

    .wrapper3 ::part(comet-calendar-wrapper) {
      font-size: 20px;
    }

    .wrapper4 {
      max-width: 450px;
      min-width: 350px;

      ::part(comet-calendar-wrapper) {
        font-size: 1.2rem;
      }

      ::part(comet-calendar-container-cell) {
        aspect-ratio: 1/1;
      }
    }

    .wrapper5 {
      max-width: 500px;
      min-width: 350px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-calendar": DemoCalendar;
  }
}
