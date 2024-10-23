import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DisabledConfig, RangeConfig } from "./comet-calendar.interface";

@customElement("comet-calendar")
export class CometCalendar extends LitElement {
  @property({ type: Number })
  public abbreviationCount: 1 | 2 | 3 = 1;
  @property({ type: Object })
  public canSelect = { month: true, year: true };
  @property({ type: Object })
  public disabledConfig: DisabledConfig = {};
  @property()
  public initialDate = "";
  @property({ type: Object })
  public initialRange = { start: "", end: "" };
  @property()
  public localeString = "en-GB";
  @property({ type: Boolean })
  public monthNavigation = true;
  @property({ type: Boolean })
  public rangeSelection = false;
  @property()
  public theme = "";

  @property({ type: Array })
  public dayStrings: string[] = [];
  @property({ type: Array })
  public monthStrings: string[] = [];
  @property({ type: Number })
  public startYear = new Date().getFullYear() - 100;
  @property({ type: Number })
  public endYear = new Date().getFullYear() + 100;

  @state()
  public rangeSelected = false;
  @state()
  public showMonthsOptions = false;
  @state()
  public showYearsOption = false;

  public today: { day: number; month: number; year: number } = {
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };

  private _displayedMonth: string;
  private _displayedYear: number;
  private _monthsDetails: any;
  private _rangeEnd: RangeConfig;
  private _rangeStart: RangeConfig;
  private _selectedDay: any;
  private _selectedDateValue: string;
  private _selectedMonth: string;
  private _selectedStartDay: any;
  private _selectedStartMonth: any;
  private _selectedStartYear: any;
  private _selectedEndDay: any;
  private _selectedEndMonth: any;
  private _selectedEndYear: any;
  private _selectedYear: number | null;
  private _yearRange: number[] = [];

  constructor() {
    super();
    this._displayedMonth = "";
    this._displayedYear = this.getYearBetweenBounds(new Date().getFullYear());
    this._monthsDetails = [];
    this._rangeEnd = {};
    this._rangeStart = {};
    this._selectedDay;
    this._selectedDateValue = "";
    this._selectedMonth = "";
    this._selectedYear = this.getYearBetweenBounds(new Date().getFullYear());
  }

  set displayedMonth(val) {
    let oldVal = this._displayedMonth;
    this._displayedMonth = val;
    this.requestUpdate("displayedMonth", oldVal);
  }

  get displayedMonth(): string {
    return this._displayedMonth;
  }

  set displayedYear(val) {
    let oldVal = this._displayedYear;
    this._displayedYear = val;
    this.requestUpdate("displayedYear", oldVal);
  }

  get displayedYear(): number {
    return this._displayedYear;
  }

  set monthsDetails(val) {
    let oldVal = this._monthsDetails;
    this._monthsDetails = val;
    this.requestUpdate("monthsDetails", oldVal);
  }

  get monthsDetails() {
    return this._monthsDetails;
  }

  set rangeEnd(val) {
    let oldVal = this._rangeEnd;
    this._rangeEnd = val;
    this.requestUpdate("rangeEnd", oldVal);
  }

  get rangeEnd(): RangeConfig {
    return this._rangeEnd;
  }

  set rangeStart(val) {
    let oldVal = this._rangeStart;
    this._rangeStart = val;
    this.requestUpdate("rangeStart", oldVal);
  }

  get rangeStart(): RangeConfig {
    return this._rangeStart;
  }

  set selectedDateValue(val) {
    let oldVal = this._selectedDateValue;
    this._selectedDateValue = val;
    this.requestUpdate("selectedDateValue", oldVal);
  }

  get selectedDateValue(): string {
    return this._selectedDateValue;
  }

  set selectedDay(val) {
    let oldVal = this._selectedDay;
    this._selectedDay = val;
    this.requestUpdate("selectedDay", oldVal);
  }

  get selectedDay() {
    return this._selectedDay;
  }

  set selectedMonth(val) {
    let oldVal = this._selectedMonth;
    this._selectedMonth = val;
    this.requestUpdate("selectedMonth", oldVal);
  }

  get selectedMonth() {
    return this._selectedMonth;
  }

  set selectedYear(val) {
    let oldVal = this._selectedYear;
    this._selectedYear = val;
    this.requestUpdate("selectedYear", oldVal);
  }

  get selectedYear() {
    return this._selectedYear;
  }

  protected firstUpdated(): void {
    this.setYearRange();
    this.setDaysAndMonthsByLanguage();

    const initDateArray = this.initialDate.split(".");
    const initDay = parseInt(initDateArray[0]);
    const initMonth = parseInt(initDateArray[1]) - 1;
    const initYear = parseInt(initDateArray[2]);
    const initDate = new Date(initYear, initMonth, initDay);
    const date = this.initialDate ? initDate : new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    if (this.initialDate && !this.rangeSelection) {
      this.selectedDay = day;
      this.selectedMonth = this.monthStrings[month];
      this.selectedYear = this.getYearBetweenBounds(year);
      this.displayedMonth = this.monthStrings[initMonth];
      this._displayedYear = this.getYearBetweenBounds(initYear);
      this.monthsDetails = this.getMonthDetails(year, month, day);
      this.selectedDateValue = this.getDateValue();
      return;
    }

    this.selectedDay = null;
    this.selectedMonth = "";
    this.selectedYear = null;
    this.displayedMonth = this.monthStrings[month];
    this.displayedYear = this.getYearBetweenBounds(year);

    this.monthsDetails = this.getMonthDetails(year, month, day);
    this.selectedDateValue = this.getDateValue();

    this._setInitialRange();
  }

  getYearBetweenBounds(currentYear: number) {
    if (this.startYear < currentYear && this.endYear > currentYear) {
      return currentYear;
    }
    const startYearIsClosest =
      currentYear - this.startYear < this.endYear - currentYear;
    return startYearIsClosest ? this.startYear : this.endYear;
  }

  getDateValue(): string {
    const day = this.monthsDetails?.find(
      (d: any) => d.date === this.selectedDay
    )?.date;

    const month = this.monthStrings.indexOf(this.displayedMonth) + 1;
    return `${this._addZero(day)}.${this._addZero(month)}.${
      this.displayedYear
    }`;
  }

  getDayDetails = (details: any) => {
    const date = details.index - details.firstDay;
    const day = details.index % 7;
    let prevMonth = details.month - 1;
    let prevYear = details.year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    const prevMonthNumberOfDays = this.getNumberOfDays(prevYear, prevMonth);
    const _date =
      (date < 0 ? prevMonthNumberOfDays + date : date % details.numberOfDays) +
      1;
    const month = date < 0 ? -1 : date >= details.numberOfDays ? 1 : 0;

    return {
      date: _date,
      day,
      month,
      dayString: this.dayStrings[day],
      disabled: this.setDisabled(details, day, _date),
      leftEdge: day === 0,
      rightEdge: day === 6,
    };
  };

  getMonthDetails = (year: number, month: number, day?: number) => {
    const firstDay = new Date(year, month).getDay();
    const firstDayOfMonth = new Date(year, month, 1).getDate();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    const numberOfDays = this.getNumberOfDays(year, month);
    const monthArray = [];
    const rows = 6;
    const cols = 7;
    let currentDay = null;
    let index = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        currentDay = this.getDayDetails({
          index,
          numberOfDays,
          firstDay,
          year,
          month,
        });

        const ArrItem = this.rangeSelection
          ? {
              ...currentDay,
              currentMonth: this.monthStrings[month],
              currentMonthIndex: month,
              currentYear: this.getYearBetweenBounds(year),
              firstDayOfMonth: firstDayOfMonth === currentDay.date,
              lastDayOfMonth: lastDayOfMonth === currentDay.date,
              selected: this._getSelectedState(currentDay, month, year),
              highlighted: this._getHighlightedState(currentDay, month, year),
            }
          : {
              ...currentDay,
              currentMonth: this.monthStrings[month],
              currentMonthIndex: month,
              currentYear: this.getYearBetweenBounds(year),
              selected: this._getSelectedState(currentDay, month, year, day),
            };

        monthArray.push(ArrItem);
        index++;
      }
    }
    return this.removeExtraRow(monthArray);
  };

  private _getSelectedState(
    currentDay: any,
    month: number,
    year: number,
    day?: number
  ) {
    if (this.rangeSelection) {
      return (
        (currentDay.month === 0 &&
          this._selectedStartDay === currentDay.date &&
          year === this._selectedStartYear &&
          month === this._selectedStartMonth) ||
        (currentDay.month === 0 &&
          currentDay.date === this._selectedEndDay &&
          year === this._selectedEndYear &&
          month === this._selectedEndMonth)
      );
    }

    return (
      currentDay.month === 0 &&
      day === currentDay.date &&
      year === this.selectedYear &&
      month === this.monthStrings.indexOf(this.selectedMonth)
    );
  }

  private _getHighlightedState(currentDay: any, month: number, year: number) {
    const start = this.rangeStart;
    const end = this.rangeEnd;

    if (start.day && end.day) {
      if (currentDay.month !== 0) {
        return;
      }

      if (this._selectedEndYear > this._selectedStartYear) {
        if (year < this._selectedEndYear && year > this._selectedStartYear) {
          return true;
        }

        if (year === this._selectedEndYear) {
          if (month === this._selectedEndMonth) {
            return currentDay.date <= this._selectedEndDay;
          }

          if (month > this._selectedEndMonth) {
            return false;
          }

          if (month < this._selectedEndMonth) {
            return true;
          }
        }

        if (year < this._selectedEndYear) {
          if (month === this._selectedStartMonth) {
            return currentDay.date >= this._selectedStartDay;
          }

          if (month < this._selectedStartMonth) {
            return false;
          }

          if (
            month > this._selectedStartMonth &&
            year >= this._selectedStartYear &&
            year !== this._selectedEndYear
          ) {
            return true;
          }
        }
      }

      if (
        month >= this._selectedStartMonth &&
        month <= this._selectedEndMonth
      ) {
        if (month === this._selectedStartMonth) {
          if (end.day - start.day === 1) {
            return;
          }

          if (this._selectedEndMonth === this._selectedStartMonth) {
            return currentDay.date <= end.day && currentDay.date >= start.day;
          }

          if (this._selectedEndMonth > this._selectedStartMonth) {
            return currentDay.date >= start.day;
          }
        }

        if (month > this._selectedStartMonth) {
          if (currentDay.date <= end.day) {
            return true;
          }
        }

        if (
          month < this._selectedEndMonth &&
          month > this._selectedStartMonth
        ) {
          return true;
        }
      }
    }
  }

  getNumberOfDays = (year: number, month: number) => {
    return 40 - new Date(year, month, 40).getDate();
  };

  onCalendarDaySelected = (d: any): void => {
    this.selectedMonth = d.currentMonth;
    this.displayedYear = d.currentYear;

    if (!this.rangeSelection) {
      this.selectedDay = d.date;
      this.displayedMonth = d.currentMonth;
      this.selectedYear = d.currentYear;
      this.showYearsOption = false;
      this.showMonthsOptions = false;
      this.selectedDateValue = this.getDateValue();
      this._setMonthDetailsForRange(d);

      this.dispatchEvent(
        new CustomEvent("on-date-selected", {
          bubbles: true,
          composed: true,
          detail: this.getDateValue(),
        })
      );
    }

    if (this.rangeSelection) {
      if (this.initialRange.start && this.initialRange.end) {
        this.rangeSelected = true;
      }
      if (this.rangeSelected) {
        this.rangeStart = {};
        this.rangeEnd = {};
        this._selectedStartDay = null;
        this._selectedStartMonth = null;
        this._selectedStartYear = null;
        this._selectedEndDay = null;
        this._selectedEndMonth = null;
        this._selectedEndYear = null;
        this.rangeSelected = false;
      }

      if (!this.rangeSelected) {
        if (!this._selectedStartDay) {
          this._selectedStartDay = d.date;
          this._selectedStartMonth = d.currentMonthIndex;
          this._selectedStartYear = d.currentYear;
          this.rangeStart = {
            day: d.date,
            month_index: d.currentMonthIndex,
            month_string: d.currentMonth,
            year: d.currentYear,
          };
          this.rangeSelected = false;
          this._setMonthDetailsForRange(d);
          this._dispatchDateRange();
        } else {
          if (
            d.date <= this._selectedStartDay &&
            d.currentMonthIndex === this._selectedStartMonth &&
            d.currentYear === this._selectedStartYear
          ) {
            this.rangeStart = {};
            this._selectedStartDay = null;
            this._selectedStartMonth = null;
            this._selectedStartYear = null;
            return;
          }

          this._selectedEndDay = d.date;
          this._selectedEndMonth = d.currentMonthIndex;
          this._selectedEndYear = d.currentYear;
          this.rangeEnd = {
            day: d.date,
            month_index: d.currentMonthIndex,
            month_string: d.currentMonth,
            year: d.currentYear,
          };
          this.rangeSelected = true;
          this._setMonthDetailsForRange(d);
          this._dispatchDateRange();
        }
      }
    }
  };

  private _dispatchDateRange() {
    this.dispatchEvent(
      new CustomEvent("on-range-selected", {
        bubbles: true,
        composed: true,
        detail: this._getDateRangeValues(),
      })
    );
  }

  private _getDateRangeValues() {
    const start = this.rangeStart as any;
    const end = this.rangeEnd as any;

    const endDate = end.day
      ? {
          end_date: `${this._addZero(end.day)}.${this._addZero(
            end?.month_index + 1
          )}.${end.year}`,
        }
      : {};

    return {
      start_date: `${this._addZero(start.day)}.${this._addZero(
        start?.month_index + 1
      )}.${start.year}`,
      ...endDate,
    };
  }

  private _setInitialRange() {
    if (
      this.rangeSelection &&
      this.initialRange.start &&
      this.initialRange.end
    ) {
      const startRange = this.initialRange?.start?.split(".");
      const endRange = this.initialRange?.end?.split(".");
      const startRangeDay = parseInt(startRange[0]);
      const startMonth = parseInt(startRange[1]) - 1;
      const startYear = parseInt(startRange[2]);
      const endDay = parseInt(endRange[0]);
      const endMonth = parseInt(endRange[1]) - 1;
      const endYear = parseInt(endRange[2]);

      this.rangeStart = {
        day: startRangeDay,
        month_index: startMonth,
        month_string: this.monthStrings[startMonth],
        year: startYear,
      };

      this.rangeEnd = {
        day: endDay,
        month_index: endMonth,
        month_string: this.monthStrings[endMonth],
        year: endYear,
      };

      this._selectedStartDay = startRangeDay;
      this._selectedStartMonth = startMonth;
      this._selectedStartYear = startYear;
      this._selectedEndDay = endDay;
      this._selectedEndMonth = endMonth;
      this._selectedEndYear = endYear;
      this.displayedMonth = this.monthStrings[startMonth];
      this.displayedYear = startYear;
      this.monthsDetails = this.getMonthDetails(startYear, startMonth);

      this.onMonthSelected(this.monthStrings[startMonth]);
      this.onYearSelected(startYear);
    }
  }

  private _setMonthDetailsForRange(d: any) {
    this.monthsDetails = this.getMonthDetails(
      d.currentYear,
      d.currentMonthIndex,
      d.date
    );
  }

  onMonthNavigation = (direction: string): void => {
    const currentMonthIndex = this.monthStrings.indexOf(this.displayedMonth);
    this.showYearsOption = false;
    this.showMonthsOptions = false;
    let newMonth;

    if (direction === "back") {
      this.setPreviousMonth(currentMonthIndex);
      newMonth = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
    } else {
      this.setNextMonth(currentMonthIndex);
      newMonth = currentMonthIndex === 11 ? 0 : currentMonthIndex + 1;
    }
    this.monthsDetails = this.getMonthDetails(
      this.displayedYear,
      newMonth,
      this.selectedDay
    );
    this._dispatchMonthChange(newMonth);
  };

  onMonthSelected = (month: string): void => {
    this.displayedMonth = month;
    this.monthsDetails = this.getMonthDetails(
      this.displayedYear,
      this.monthStrings.indexOf(month),
      this.selectedDay
    );
    this._dispatchMonthChange(this.monthStrings.indexOf(month));
  };

  onYearSelected = (year: number): void => {
    this.displayedYear = year;
    this.monthsDetails = this.getMonthDetails(
      year,
      this.monthStrings.indexOf(this.displayedMonth),
      this.selectedDay
    );

    this.dispatchEvent(
      new CustomEvent("on-year-change", {
        bubbles: true,
        composed: true,
        detail: year,
      })
    );
  };

  removeExtraRow(monthsArray: any) {
    if (monthsArray[6].month !== 0) {
      monthsArray = monthsArray.slice(6);
    }

    if (monthsArray[35].month !== 0) {
      monthsArray = monthsArray.slice(0, -7);
    }
    return monthsArray;
  }

  setDisabled(details: any, day: number, _date: number): boolean {
    let disabled = false;

    if (!disabled && this.disabledConfig?.weekday) {
      disabled = this.disabledConfig.weekday.indexOf(day) !== -1;
    }
    if (!disabled && this.disabledConfig?.month) {
      disabled = this.disabledConfig.month.indexOf(details.month) !== -1;
    }
    if (!disabled && this.disabledConfig?.year) {
      disabled = this.disabledConfig.year.indexOf(details.year) !== -1;
    }
    if (!disabled && this.disabledConfig?.day_ranges) {
      this.disabledConfig.day_ranges.forEach((range) => {
        if (_date >= range[0] && _date <= range[1]) {
          disabled = true;
        }
      });
    }
    if (!disabled && this.disabledConfig?.valid_range) {
      const { start, end } = this.disabledConfig.valid_range;
      const today = new Date(
        `${details.month + 1}/${_date}/${details.year}`
      ).getTime();

      if (start) {
        const startArr = start.split(".") as string[];
        const startRange = new Date(
          `${startArr[1]}/${startArr[0]}/${startArr[2]}`
        ).getTime();
        disabled ||= today < startRange;
      }

      if (end) {
        const endArr = end.split(".") as string[];
        const endRange = new Date(
          `${endArr[1]}/${endArr[0]}/${endArr[2]}`
        ).getTime();
        disabled ||= today > endRange;
      }
    }

    return disabled;
  }

  setDaysAndMonthsByLanguage(): void {
    this.dayStrings = this.dayStrings.length
      ? this.dayStrings
      : Array.from({ length: 7 }, (d, i) => {
          const date = new Date(1970, 1, 1 + i);
          return date.toLocaleString(this.localeString, {
            weekday: "long",
          });
        });

    this.monthStrings = this.monthStrings.length
      ? this.monthStrings
      : Array.from({ length: 12 }, (m, i) => {
          return new Date(0, i).toLocaleString(this.localeString, {
            month: "long",
          });
        });
  }

  setNextMonth(currentMonthIndex: number): void {
    if (this.displayedYear === this.endYear && currentMonthIndex === 11) {
      return;
    }
    if (currentMonthIndex === 11) {
      this.displayedMonth = this.monthStrings[0];
      this.displayedYear = this.displayedYear + 1;
      this.monthsDetails = this.getMonthDetails(
        this.displayedYear,
        0,
        this.selectedDay
      );
    } else {
      this.displayedMonth = this.monthStrings[currentMonthIndex + 1];
      this.monthsDetails = this.getMonthDetails(
        this.displayedYear,
        currentMonthIndex + 1,
        this.selectedDay
      );
    }
  }

  setPreviousMonth(currentMonthIndex: number): void {
    if (this.displayedYear === this.startYear && currentMonthIndex === 0) {
      return;
    }
    if (currentMonthIndex === 0) {
      this.displayedMonth = this.monthStrings[11];
      this.displayedYear = this.displayedYear - 1;
      this.monthsDetails = this.getMonthDetails(
        this.displayedYear,
        11,
        this.selectedDay
      );
    } else {
      this.displayedMonth = this.monthStrings[currentMonthIndex - 1];
      this.monthsDetails = this.getMonthDetails(
        this.displayedYear,
        currentMonthIndex - 1,
        this.selectedDay
      );
    }
  }

  setYearRange(): void {
    this._yearRange = Array.from(
      { length: (this.endYear - this.startYear) / 1 + 1 },
      (v, i) => this.startYear + i * 1
    );
  }

  toggleMonthsOption(): void {
    this.showYearsOption = false;
    this.showMonthsOptions = !this.showMonthsOptions;
  }

  toggleYearsOption(): void {
    this.showMonthsOptions = false;
    this.showYearsOption = !this.showYearsOption;

    const sel = document.getElementById("year-select-element") as any;

    if (sel) {
      const optsLen = sel.options.length;
      const selIndex = sel.selectedIndex;
      const size = sel.size;
      if (selIndex >= size) {
        let newIndex = selIndex + size + 1;
        if (newIndex > optsLen) {
          newIndex = optsLen;
        }
        sel.selectedIndex = newIndex;
        setTimeout(function () {
          sel.selectedIndex = selIndex;
        }, 1); //slight delay so line above runs
      }
    } // Make selected year visible when options open
  }

  private _addZero(date: number): string | undefined {
    if (!date) {
      return;
    }

    const dateString = date.toString();
    return dateString.length === 1 ? `0${dateString}` : dateString;
  }

  private _dispatchMonthChange(month: number): void {
    this.dispatchEvent(
      new CustomEvent("on-month-change", {
        bubbles: true,
        composed: true,
        detail: month,
      })
    );
  }

  render() {
    return html`<div
      class="c-calendar__wrapper ${this.theme}"
      part="comet-calendar-wrapper"
    >
      ${this._renderCalendarHeader()}

      <div class="c-calendar__days-of-week" part="comet-calendar-days-of-week">
        ${this._renderWeeksHeader()}
      </div>

      <div class="c-calendar__container">${this._renderCells()}</div>
    </div> `;
  }

  private _renderCalendarHeader() {
    return html` <div part="comet-calendar-header" class="c-calendar__header">
      <div
        @click="${() => this.onMonthNavigation("back")}"
        class="c-calendar__icon--left-arrow ${this._endOfRange("start")
          ? "--disabled"
          : ""}"
      >
        ${this._renderChevron("left")}
      </div>
      <div class="c-calendar__header--month-year-selectors">
        ${this._renderMonthSelector()} ${this._renderYearSelector()}
      </div>
      <div
        @click="${this.onMonthNavigation}"
        class="c-calendar__icon--right-arrow ${this._endOfRange("end")
          ? "--disabled"
          : ""}"
      >
        ${this._renderChevron("right")}
      </div>
    </div>`;
  }

  private _renderChevron(position: string) {
    return this.monthNavigation
      ? html`<comet-icon
          name="chevron-up"
          size="24"
          primaryColor="${this._getArrowColor(position)}"
        ></comet-icon>`
      : null;
  }

  private _endOfRange(position?: string): boolean {
    const start = position === "start";
    return (
      this.displayedYear === (start ? this.startYear : this.endYear) &&
      this.monthStrings.indexOf(this.displayedMonth) === (start ? 0 : 11)
    );
  }

  public _getArrowColor = (position: string) => {
    return this._endOfRange(position === "left" ? "start" : "end")
      ? "neutral-50"
      : this.theme.includes("grey") || this.theme.includes("secondary")
      ? "neutral-100"
      : "primary-50";
  };

  private _renderMonthSelector() {
    return html` <div
      class="c-calendar__header--month-selector ${!this.canSelect?.month
        ? "--not-selectable"
        : ""}"
      @click="${this.toggleMonthsOption}"
    >
      <div id="month-options-header" class="flex_centered">
        ${this.displayedMonth}
        ${this._renderToggleIcon(this.showMonthsOptions, this.canSelect.month)}
      </div>
      ${this.showMonthsOptions
        ? html` <div class="c-calendar__header--months-container">
            ${this.monthStrings.map(
              (m) =>
                html`
                  <div
                    id="month-options-container"
                    @click="${() => this.onMonthSelected(m)}"
                    value="${m}"
                    class="c-calendar__header--month-option ${m ===
                    this.displayedMonth
                      ? "--selected"
                      : ""}"
                  >
                    ${m}
                  </div>
                `
            )}
          </div>`
        : ""}
    </div>`;
  }

  private _renderYearSelector() {
    return html` <div
      class="c-calendar__header--year-selector ${!this.canSelect?.year
        ? "--not-selectable"
        : ""}"
      @click="${this.toggleYearsOption}"
    >
      <div id="year-options-header" class="flex_centered">
        ${this.displayedYear}
        ${this._renderToggleIcon(this.showYearsOption, this.canSelect.year)}
      </div>
      ${this._renderYearsOptions()}
    </div>`;
  }

  private _renderToggleIcon(opened: boolean, render: boolean) {
    return render
      ? html` <comet-icon
          data-testid="toggle-icon"
          name="${!opened ? "chevron-down" : "chevron-up"}"
          size="16"
          primaryColor="${this.theme.includes("grey") ||
          this.theme.includes("secondary")
            ? "neutral-100"
            : "primary-50"}"
        ></comet-icon>`
      : null;
  }

  private _renderYearsOptions() {
    return html` ${this.showYearsOption
      ? html` <div class="c-calendar__header--years-container ${this.theme}">
          <select
            id="year-select-element"
            autocomplete="off"
            name="year-selection"
            size="${this._yearRange.length < 10
              ? this._yearRange.length
              : "10"}"
          >
            ${this._yearRange.map(
              (y) =>
                html`
                  <option
                    @click="${() => this.onYearSelected(y)}"
                    class="c-calendar__header--year-option ${y ===
                    this.displayedYear
                      ? "--selected"
                      : ""}"
                    value="${y}"
                    .selected="${y === this.displayedYear}"
                    id="${y === this.displayedYear ? "selected" : ""}"
                    role="option"
                  >
                    ${y}
                  </option>
                `
            )}
          </select>
        </div>`
      : ""}`;
  }

  private _renderWeeksHeader() {
    return html` ${this.dayStrings?.map(
      (d: any) =>
        html`
          <div>
            ${this._capitalizeFirstLetter(d.slice(0, this.abbreviationCount))}
          </div>
        `
    )}`;
  }

  private _capitalizeFirstLetter(str: string): string {
    return str.replace(/^./, (f) => f.toUpperCase());
  }

  private _renderCells() {
    return html` ${this.monthsDetails?.map(
      (d: any) => html`
        <div
          @click="${() => this.onCalendarDaySelected(d)}"
          class="c-calendar__conatainer--cell ${this
            .theme} ${this._getCellStates(d)}"
          part="comet-calendar-container-cell"
          disabled="${d.month !== 0 ||
          d.currentYear < this.startYear ||
          d.currentYear > this.endYear ||
          d.disabled}"
          highlighted="${d.highlighted}"
          selected="${d.selected}"
          today="${d.date === this.today.day &&
          d.currentMonthIndex === this.today.month &&
          d.currentYear === this.today.year &&
          d.month === 0}"
        >
          ${d.month === 0 ? d.date : ""}
          <span
            class="c-calendar__conatainer--cell--border-bottom ${this
              .theme} ${this._getCellStates(d)}"
          ></span>
        </div>
      `
    )}`;
  }

  private _getCellStates(d: any) {
    let disabled,
      highlighted,
      selected,
      left,
      right,
      start,
      end,
      today,
      first,
      last;

    disabled =
      d.month !== 0 ||
      d.currentYear < this.startYear ||
      d.currentYear > this.endYear ||
      d.disabled
        ? "--disabled"
        : "";
    highlighted = d.highlighted ? "--highlighted" : "";
    selected = d.selected ? "--selected" : "";
    left = d.leftEdge ? "--left" : "";
    right = d.rightEdge ? "--right" : "";
    start =
      d.date === this.rangeStart.day && this.rangeEnd.day ? "--start" : "";
    end = d.date === this.rangeEnd.day ? "--end" : "";
    today =
      d.date === this.today.day &&
      d.currentMonthIndex === this.today.month &&
      d.currentYear === this.today.year &&
      d.month === 0
        ? "--today"
        : "";
    first = d.firstDayOfMonth ? "--first" : "";
    last = d.lastDayOfMonth ? "--last" : "";

    return `${disabled} ${highlighted} ${selected} ${left} ${right} ${start} ${end} ${today} ${first} ${last}`;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    select {
      border: none;
      outline: none;
    }

    .c-calendar__header--month-selector,
    .c-calendar__header--year-selector {
      cursor: pointer;
      position: relative;
    }

    .c-calendar__header--month-selector.--not-selectable,
    .c-calendar__header--year-selector.--not-selectable {
      cursor: default;
      gap: 8px;
      pointer-events: none;
    }

    .c-calendar__header--months-container,
    .c-calendar__header--years-container {
      background-color: var(--neutral-0);
      box-shadow: var(--shadow-large);
      border: 1px solid var(--neutral-40);
      border-radius: 12px;
      left: 0;
      padding: 8px 0;
      position: absolute;
      top: 28px;
      width: max-content;
      z-index: 99998;
    }

    .c-calendar__header--years-container {
      max-height: 428px;
      overflow-y: scroll;
    }
    .c-calendar__header--months-container .c-calendar__header--month-option {
      font-size: 16px;
      padding: 8px 16px;
    }

    .c-calendar__header--years-container .c-calendar__header--year-option {
      color: var(--primary-50);
      font-size: 16px;
      padding: 8px 24px;
    }

    .c-calendar__header--years-container.grey .c-calendar__header--year-option,
    .c-calendar__header--years-container.secondary
      .c-calendar__header--year-option {
      color: var(--neutral-90);
    }

    .c-calendar__header--months-container
      .c-calendar__header--month-option:hover,
    .c-calendar__header--years-container
      .c-calendar__header--year-option:hover {
      background-color: var(--primary-10);
      color: var(--primary-50);
    }

    .c-calendar__header--months-container
      .c-calendar__header--month-option.--selected,
    .c-calendar__header--years-container
      .c-calendar__header--year-option.--selected {
      background-color: var(--primary-50) !important;
      -moz-cellhightligh: var(--primary-50) !important;
      color: var(--neutral-0) !important;
      -moz-color: var(--neutral-0) !important;
    }

    .flex_centered {
      align-items: center;
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .c-calendar__header--month-year-selectors {
      display: flex;
      gap: 16px;
    }

    .c-calendar__header {
      align-items: center;
      display: flex;
      font-weight: var(--typo-font-weights-bold);
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .c-calendar__icon--left-arrow,
    .c-calendar__icon--right-arrow {
      cursor: pointer;
    }

    .c-calendar__icon--left-arrow {
      transform: rotate(-90deg);
    }

    .c-calendar__icon--right-arrow {
      transform: rotate(90deg);
    }

    .c-calendar__icon--left-arrow.--disabled,
    .c-calendar__icon--right-arrow.--disabled {
      cursor: default;
      pointer-events: none;
    }

    .c-calendar__wrapper {
      background-color: var(--neutral-0);
      color: var(--primary-50);
      font-size: 16px;
      padding: 16px;
      width: 100%;
      z-index: 99999;
    }

    .c-calendar__wrapper.transparent {
      background-color: transparent;
    }

    .c-calendar__wrapper.grey,
    .c-calendar__wrapper.secondary {
      color: var(--neutral-90);
    }

    .c-calendar__wrapper.border {
      border: 1px solid var(--neutral-40);
      border-radius: 12px;
    }

    .c-calendar__wrapper.shadow {
      box-shadow: var(--shadow-large);
    }

    .c-calendar__container {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      max-width: 100%;
    }

    .c-calendar__days-of-week {
      align-items: center;
      color: var(--neutral-60);
      display: flex;
      justify-content: space-around;
      margin-bottom: 8px;
      margin-top: 8px;
    }

    .c-calendar__conatainer--cell {
      aspect-ratio: 5/4;
      align-items: center;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      margin-bottom: 4px;
      position: relative;
      width: 100%;
    }

    .c-calendar__conatainer--cell.--today {
      font-weight: var(--typo-font-weights-bold);
    }

    .c-calendar__conatainer--cell:hover,
    .c-calendar__conatainer--cell.--today:hover {
      background-color: var(--primary-10);
      border-radius: 12px;
      color: var(--primary-50);
    }

    .c-calendar__conatainer--cell.secondary:hover,
    .c-calendar__conatainer--cell.secondary.--today:hover {
      background-color: var(--secondary-10);
      color: var(--secondary-90);
    }

    .c-calendar__conatainer--cell.secondary.--selected:hover {
      color: var(--neutral-0);
    }

    .c-calendar__conatainer--cell.--today.--highlighted:hover {
      border-radius: 0;
    }

    .c-calendar__conatainer--cell.--disabled,
    .c-calendar__conatainer--cell.--today.--disabled {
      color: var(--neutral-60);
      cursor: default;
      pointer-events: none;
    }

    .c-calendar__conatainer--cell.--selected,
    .c-calendar__conatainer--cell.--selected.--today {
      color: var(--neutral-0);
      background-color: var(--primary-50);
      border-bottom: none;
    }

    .c-calendar__conatainer--cell.secondary.--selected,
    .c-calendar__conatainer--cell.secondary.--selected.--today {
      background-color: var(--secondary-60);
    }

    .c-calendar__conatainer--cell.--selected.--highlighted.--start {
      box-shadow: 10px 0 0px 0px var(--primary-10);
    }

    .c-calendar__conatainer--cell.secondary.--selected.--highlighted.--start {
      box-shadow: 10px 0 0px 0px var(--secondary-10);
    }

    .c-calendar__conatainer--cell.--selected.--highlighted.--end {
      box-shadow: -10px 0 0px 0px var(--primary-10);
    }

    .c-calendar__conatainer--cell.secondary.--selected.--highlighted.--end {
      box-shadow: -10px 0 0px 0px var(--secondary-10);
    }

    .c-calendar__conatainer--cell.--selected.--start.--right,
    .c-calendar__conatainer--cell.--selected.--end.--left {
      box-shadow: none;
    }

    .c-calendar__conatainer--cell.--highlighted {
      color: var(--primary-50);
      background-color: var(--primary-10);
      border-radius: 0;
    }

    .c-calendar__conatainer--cell.secondary.--highlighted {
      color: var(--secondary-90);
      background-color: var(--secondary-10);
    }

    .c-calendar__conatainer--cell.--highlighted.--first {
      border-radius: var(--spacing-s) 0 0 var(--spacing-s);
    }

    .c-calendar__conatainer--cell.--highlighted.--last {
      border-radius: 0 var(--spacing-s) var(--spacing-s) 0;
    }

    .c-calendar__conatainer--cell.--highlighted.--left {
      border-radius: var(--spacing-s) 0 0 var(--spacing-s);
    }

    .c-calendar__conatainer--cell.--highlighted.--right {
      border-radius: 0 var(--spacing-s) var(--spacing-s) 0;
    }

    .c-calendar__conatainer--cell.--highlighted.--left.--last,
    .c-calendar__conatainer--cell.--highlighted.--right.--first {
      border-radius: var(--spacing-s);
    }

    .c-calendar__conatainer--cell.--disabled:hover {
      background-color: transparent;
    }

    .c-calendar__conatainer--cell.--today.--disabled {
      background-color: transparent;
      padding-bottom: 0;
    }

    .c-calendar__conatainer--cell.--selected.--disabled,
    .c-calendar__conatainer--cell.--selected.--today.--disabled {
      background-color: transparent;
      border-radius: 0;
      color: var(--neutral-60);
      cursor: default;
      pointer-events: none;
    }

    .c-calendar__conatainer--cell--border-bottom {
      display: none;
    }

    .c-calendar__conatainer--cell--border-bottom.--today {
      background-color: var(--primary-50);
      bottom: -2px;
      display: block;
      height: 2px;
      left: 0;
      position: absolute;
      width: 100%;
      z-index: 999;
    }

    .c-calendar__conatainer--cell--border-bottom.secondary.--today {
      background-color: var(--secondary-90);
    }

    .c-calendar__conatainer--cell.--selected:hover {
      border-color: var(--primary-50);
      border-radius: 12px;
    }

    .c-calendar__conatainer--cell.secondary--selected:hover {
      border-color: var(--secondary-60);
    }

    .c-calendar__conatainer--cell.--highlighted.--selected.--start,
    .c-calendar__conatainer--cell.--highlighted.--selected.--start.--today,
    .c-calendar__conatainer--cell.--highlighted.--selected.--end,
    .c-calendar__conatainer--cell.--highlighted.--selected.--end.--today {
      color: var(--neutral-0);
      background-color: var(--primary-50);
      border-radius: 12px;
    }

    .c-calendar__conatainer--cell.secondary.--highlighted.--selected.--start,
    .c-calendar__conatainer--cell.secondary.--highlighted.--selected.--start.--today,
    .c-calendar__conatainer--cell.secondary.--highlighted.--selected.--end,
    .c-calendar__conatainer--cell.secondary.--highlighted.--selected.--end.--today {
      background-color: var(--secondary-60);
    }

    .c-calendar__conatainer--cell--border-bottom.--today.--selected {
      display: none;
    }

    .remove_pointer {
      cursor: default;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-calendar": CometCalendar;
  }
}
