import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { map as litMap } from "lit/directives/map.js";
import { filter, Subscription } from "rxjs";
import { localized, msg } from "../domain/localization/lit-localize";
import { TableService } from "../domain/services/table.service";

@customElement("table-paginator")
@localized()
export class TablePaginator extends LitElement {
  // Properties
  @property({ type: Number })
  pageSize: number = 0;
  @property({ type: Array })
  pageSizeOptions: number[] = [];
  @property({ type: Number })
  totalItems = 0;
  @property({ type: Number })
  currentPage: number = 0;
  @property({ type: Object })
  tableService: TableService;

  // State properties
  @state()
  firstItem: number = 0;
  @state()
  lastItem: number = 0;
  @state()
  items = [];
  @state()
  totalPages: number = 0;
  @state()
  pageVisibles: Array<number> = [];

  // Subscriptions
  private _upstreamSubscription: Subscription;

  connectedCallback(): void {
    super.connectedCallback();
    this._initPaginatorComponent();
  }

  disconnectedCallback(): void {
    this._upstreamSubscription?.unsubscribe();
  }

  private _initPaginatorComponent(): void {
    this._upstreamSubscription = this.tableService
      .getUpstream()
      .pipe(filter((e) => e.items !== undefined))
      .subscribe(({ totalItems, items }) => {
        this.items = items;
        this.totalItems = totalItems;
        this._updatePaginatorVariables();
        this._sendEvent("change-data-loading-state", false);
      });
    this._fetchNewData();
  }

  private _fetchNewData(page: number = 0): void {
    this.currentPage = page;

    this._sendEvent("change-page", {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
    });
  }

  private _updatePaginatorVariables(): void {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.firstItem = this.currentPage * this.pageSize + 1;
    this.lastItem = this.firstItem + this.items.length - 1;
    this._showPageVisibles();
  }

  private _showPageVisibles() {
    let firstPage = this.currentPage < 2 ? 0 : this.currentPage - 2;
    let lastPage;

    if (this.currentPage + 2 >= this.totalPages) {
      lastPage = this.totalPages;
      firstPage = this.totalPages - 5 < 0 ? 0 : this.totalPages - 5;
    } else {
      lastPage = firstPage + 5;
    }

    this.pageVisibles = new Array(this.totalPages).fill(0).map((_v, i) => i);
  }

  private _sendEvent(eventType: string, eventDetail?: any): void {
    this.dispatchEvent(
      new CustomEvent(eventType, {
        composed: true,
        bubbles: true,
        detail: eventDetail,
      })
    );
  }

  private _changePageSize(index: number): void {
    this.pageSize = this.pageSizeOptions[index];
    this._fetchNewData();
  }

  render() {
    return html`
      <vaadin-horizontal-layout class="footer-container" theme="spacing">
        ${this.pageVisibles.length === 0
          ? ""
          : html`
              <vaadin-horizontal-layout class="page-size-container">
                <!-- TODO text has to be on config and lokalised -->
                <span>${msg("Items per page")}</span>

                ${litMap(
                  this.pageSizeOptions,
                  (pageSizeOption: number, index: number) =>
                    html` <button
                      class="page-item ${pageSizeOption === this.pageSize
                        ? "selected"
                        : ""}"
                      data-testid="${pageSizeOption}-per-page-button"
                      @click=${() => this._changePageSize(index)}
                    >
                      ${pageSizeOption}
                    </button>`
                )}
              </vaadin-horizontal-layout>

              <!-- TODO text has to be on config and lokalised -->
              <span class="footer-label"
                >${msg("Showing")} ${this.firstItem} - ${this.lastItem}
                ${msg("of")} ${this.totalItems} ${msg("items")}</span
              >
            `}

        <ul class="paginator-container">
          ${this.currentPage <= 0
            ? ""
            : html`
                <li class="paginator-item ">
                  <button
                    class="page-item"
                    data-testid="previous-page-button"
                    @click=${(_) => this._fetchNewData(this.currentPage - 1)}
                  >
                    <comet-icon
                      name="chevron-up"
                      class="previous-item"
                      size="13"
                    ></comet-icon>
                  </button>
                </li>
              `}
          ${this._MapVisiblePages().map((e: any, i) => {
            return e === "visible"
              ? html`
                  <li class="paginator-item">
                    <button
                      class="page-item ${i === this.currentPage
                        ? "selected"
                        : ""}"
                      @click=${(_) => this._fetchNewData(i)}
                      data-testid="page-button-${i + 1}"
                    >
                      ${i + 1}
                    </button>
                  </li>
                `
              : i === 1 || i === this.pageVisibles.length - 2
              ? this._renderthreeDots(i)
              : null;
          })}
          ${this.currentPage < this.totalPages - 1
            ? html`
                <li class="paginator-item">
                  <button
                    class="page-item"
                    data-testid="next-page-button"
                    @click=${(_) => this._fetchNewData(this.currentPage + 1)}
                  >
                    <comet-icon
                      name="chevron-up"
                      class="next-item"
                      size="13"
                    ></comet-icon>
                  </button>
                </li>
              `
            : html` <li class="disabled"></li> `}
        </ul>
      </vaadin-horizontal-layout>
    `;
  }

  handleThreeDotsClick(index) {
    if (index === 1)
      this.currentPage = this.currentPage === 4 ? 0 : this.currentPage - 5;
    if (index === this.pageVisibles.length - 2)
      this.currentPage =
        this.currentPage === this.pageVisibles.length - 5
          ? this.pageVisibles.length - 1
          : this.currentPage + 5;

    this._fetchNewData(this.currentPage);
  }

  private _renderthreeDots(index: number) {
    return html`<button
      class="page-item skip-item"
      data-testid="skip-page-button"
      index=${index}
      @click=${() => this.handleThreeDotsClick(index)}
    >
      <comet-icon
        id="multiple-navigation"
        name="menu-vertical"
        class="previous-item"
        size="13"
      >
        <vaadin-tooltip
          overlay-class="theme-dark"
          for="multiple-navigation"
          position="top"
          text="${index === 1 ? msg("Previous 5 Pages") : msg("Next 5 Pages")}"
        ></vaadin-tooltip>
      </comet-icon>
    </button>`;
  }

  private _MapVisiblePages() {
    return this.pageVisibles.map((e: number | string, i: number) => {
      if (i === 0 || i === this.pageVisibles.length - 1) e = "visible";
      if (this.currentPage <= 3 && i <= 4) e = "visible";
      if (
        this.currentPage >= 4 &&
        this.currentPage <= this.pageVisibles.length - 4
      ) {
        if (i >= this.currentPage - 2 && i <= this.currentPage + 2)
          e = "visible";
      }
      if (
        this.currentPage >= this.pageVisibles.length - 4 &&
        i > this.pageVisibles.length - 6
      )
        e = "visible";

      return e;
    });
  }

  static styles = css`
    .footer-container {
      justify-content: space-between;
      align-items: center;
      margin-top: var(--spacing-xxl);
    }

    .footer-container > * {
      flex-grow: 1;
      width: 100%;
    }

    .paginator-container {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 0px;
      padding: 0px;
      font-family: Kyn;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      color: var(--neutral-80);
      align-items: center;
      gap: var(--spacing-xs);
    }

    .paginator-item {
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    .disabled {
      pointer-events: none;
      width: 28px;
      height: 28px;
      display: flex;
    }

    .previous-item {
      transform: rotate(-90deg);
    }

    .next-item {
      transform: rotate(90deg);
    }

    .previous-item,
    .next-item {
      display: flex;
    }

    .page-size-container {
      font-family: Kyn;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      color: var(--neutral-80);
      align-items: center;
      gap: var(--spacing-xs);
    }

    .footer-label {
      font-size: var(--typo-body-size);
      text-align: center;
      color: var(--neutral-60, #a5a4a1);
      font-variant-numeric: lining-nums tabular-nums;
      font-family: Kyn;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
    }

    .page-item {
      all: unset;
      cursor: pointer;
      display: flex;
      width: 28px;
      height: 28px;
      justify-content: center;
      align-items: center;
      color: var(--primary-70);
      transition: background-color 0.2s;
      border-radius: 8px;
    }

    .page-item.selected {
      pointer-events: none;
      background-color: var(--primary-50);
      color: var(--primary-10);
    }

    .paginator-item:hover,
    .page-item:hover {
      background-color: var(--primary-20);
      border-radius: 8px;
      color: var(--primary-90);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "table-paginator": TablePaginator;
  }
}
