import "@vaadin/grid";
import { Grid, GridItemModel } from "@vaadin/grid";
import type { GridColumnBodyLitRenderer } from "@vaadin/grid/lit.js";
import {
  columnBodyRenderer,
  columnHeaderRenderer,
  gridRowDetailsRenderer,
} from "@vaadin/grid/lit.js";
import { LitElement, PropertyValueMap, css, html } from "lit";
import {
  customElement,
  property,
  query,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { Observable, Subject, Subscription } from "rxjs";
import { CometSearchBar } from "../searchbar/comet-searchbar";
import "./application/components/filters/filter-tags";
import "./application/components/filters/table-filter";
import "./application/components/table-drop-down";
import "./application/components/table-expandable-content";
import "./application/components/table-feedback-message";
import "./application/components/table-paginator";
import "./application/components/table-search-bar";
import "./application/components/table-sorter";
import { DynamicTableColumnHeader } from "./application/domain/interfaces/dynamic-table-column-header.interface";
import { FilterTag } from "./application/domain/interfaces/filter-tag.interface";
import { TableFeedback } from "./application/domain/interfaces/table-feedback.interface";
import { setLocale } from "./application/domain/localization/localization";
import { FilterService } from "./application/domain/services/filter.service";
import { TableService } from "./application/domain/services/table.service";
import {
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_NO_RESULTS_MESSAGE,
} from "./utils/default-feedback-messages";

@customElement("comet-table")
export class CometTable extends LitElement {
  // State properties
  @state()
  private currentPage: number = 0;
  @state()
  public isDataLoading: boolean = true;
  @state()
  public sortKey: string = "";
  @state()
  public sortValue: string = "";
  @state()
  public searchBarValue: string = "";
  @state()
  private totalItems: number = 0;
  @state()
  private items: Array<any> = [];
  @state()
  private feedbackMessage: TableFeedback;

  // Query properties
  @query("#data-table")
  private _dataTable: Grid;
  @query("comet-searchbar")
  CometSearchBar: Promise<CometSearchBar>;
  @queryAssignedElements({ slot: "custom-filter" })
  customFiltersList: Array<HTMLElement>;

  // Properties
  @property({ type: Number })
  pageSize = 10;
  @property({ type: Array })
  pageSizeOptions: number[] = [10, 20, 40];
  @property({ type: Array })
  columns: Array<DynamicTableColumnHeader>;
  @property({ type: Object })
  noResultsMessage: TableFeedback;
  @property({ type: Object })
  errorMessage: TableFeedback;
  @property({ type: Boolean })
  space: boolean = false;
  @property({ type: Boolean })
  showClearButton: boolean = false;
  @property({ type: Boolean })
  hasGlobalSearchbar: boolean = false;
  @property({ type: Boolean })
  hasPaginator: boolean = false;
  @property({ type: Boolean })
  autoHeight: boolean = false;
  @property({ type: String })
  searchbarPlaceholder: string = "";
  @property({ type: String })
  locale: string = "en";
  @property({ type: Object })
  refreshDataTable$: Subject<void>;
  @property()
  loadData: (
    currentPage: number,
    pageSize: number,
    sortValue: string,
    searchBarValue: string,
    sort: Array<string>,
    filter: { [key: string]: string }
  ) => Observable<{ content: Array<any>; total_elements: number }>;
  @property()
  transformData: (data: Array<any>) => Array<any> = (data) => data;

  // private properties
  private sort: Array<string> = [];
  private filter: { [key: string]: string };
  private _defaultNoResultsMessage: { [locale: string]: TableFeedback } =
    DEFAULT_NO_RESULTS_MESSAGE;
  private _defaultErrorMessage: { [locale: string]: TableFeedback } =
    DEFAULT_ERROR_MESSAGE;

  get filterTags(): Array<FilterTag> {
    if (this.columns?.length)
      return this.filterService.updateFilterTagsByNewColumns(this.columns);
    return [];
  }
  set defaultFilters(value: { [key: string]: string }) {
    if (!this.filter) this.filter = value;
  }

  // Services
  private tableService: TableService = new TableService();
  private filterService: FilterService;

  // Subscriptions
  private _loadDataSubscription: Subscription;
  private _searchbarEventsSubscription: Subscription;
  private _refreshDataTableSubscription: Subscription;

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);
    if (!this.filter) this.filter = {};
    this.filterService = new FilterService(this.columns, this.filter);
    if (!this.hasPaginator) this._fetchNewData();
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.updated(_changedProperties);

    if (
      _changedProperties.has("refreshDataTable$") &&
      !_changedProperties.get("refreshDataTable$")
    ) {
      this._refreshDataTableSubscription?.unsubscribe();
      this._refreshDataTableSubscription = this.refreshDataTable$
        .asObservable()
        .subscribe(this._fetchNewData.bind(this));
    }
    if (_changedProperties.has("locale")) {
      setLocale(this.locale);
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this._loadDataSubscription?.unsubscribe();
    this._searchbarEventsSubscription?.unsubscribe();
    this._refreshDataTableSubscription?.unsubscribe();
  }

  public copyToClipboard(textToCopy: string): void {
    navigator.clipboard.writeText(textToCopy);
  }

  render() {
    return html`
      <div class="table-wrapper">
        <div class="table-header">
          <slot name="table-header"></slot>
        </div>
        <div class="table-container ${this.isDataLoading ? "blur" : ""}">
          ${this.hasGlobalSearchbar
            ? html`
                <div class="table-searchbar">
                  <comet-searchbar
                    @search-bar-input=${({ detail }) => {
                      this.searchBarValue = detail;
                      this._fetchNewData();
                    }}
                    .border="${"medium"}"
                    .placeholder=${this.searchbarPlaceholder}
                    .value=${this.searchBarValue}
                    size="large"
                    data-testid="table-searchbar"
                  ></comet-searchbar>
                </div>
              `
            : ""}

          <div
            class="filter-tags-wrapper"
            style="margin-bottom: ${(this.filterService &&
              this.filterService.getFilterTags().length !== 0) ||
            this.customFiltersList.length !== 0
              ? "var(--spacing-l);"
              : "0px;"}"
          >
            <slot name="custom-filter"></slot>
            ${this.filterService &&
            this.filterService.getFilterTags().length !== 0
              ? html`
          <filter-tags
          @clear-all-filters=${(e) => {
            this.onSendEvent("ON_CLEAR_ALL_FILTERS");
            this._prepareToFetch(e);
          }}
          ?showClearButton=${this.showClearButton}
          .filterService=${this.filterService}
          .filterTags=${this.filterTags}
          ></filter-tags>
          </filter-tags>
        `
              : ""}
          </div>

          <div class="grid-container">
            <vaadin-grid
              type="${this.space ? "space" : ""} ${this.autoHeight
                ? "auto-height"
                : ""}"
              id="data-table"
              all-rows-visible
              .items="${this.items}"
              ${gridRowDetailsRenderer<any>(
                (item) => this.rowDetailRenderer(item),
                [this.columns]
              )}
            >
              ${map(
                this.columns,
                (column: DynamicTableColumnHeader, index) => html`
                  <vaadin-grid-column
                    .hidden=${!column.showColumn}
                    flex-grow="1"
                    auto-width
                    ${columnHeaderRenderer(this.headerRenderer(column), [
                      this.sortKey,
                      this.sortValue,
                      this.columns,
                    ])}
                    ${columnBodyRenderer(
                      (root, column) =>
                        this.cellRenderer(
                          root,
                          column,
                          this.columns[index] as any
                        ),
                      [this.columns]
                    )}
                  >
                  </vaadin-grid-column>
                `
              )}
            </vaadin-grid>

            ${this.hasPaginator
              ? html`
                  <table-paginator
                    id="paginator"
                    .pageSize=${this.pageSize}
                    .currentPage=${this.currentPage}
                    .pageSizeOptions=${this.pageSizeOptions}
                    .tableService=${this.tableService}
                    .totalItems=${this.totalItems}
                    @change-data-loading-state=${this._changeDataLoadingHandler}
                    @change-page=${this._prepareToFetch}
                  ></table-paginator>
                `
              : ""}
            ${this.items.length === 0 && !this.isDataLoading
              ? html`
                  <table-feedback-message
                    .filterService=${this.filterService}
                    .feedbackMessage=${this.feedbackMessage}
                    @reload=${this._prepareToFetch}
                  >
                  </table-feedback-message>
                `
              : ""}
          </div>

          ${this.isDataLoading
            ? html`
                <div class="loading-container">
                  <div class="loading-overlay"></div>
                  <span class="loader"></span>
                </div>
              `
            : ""}
        </div>
      </div>
    `;
  }

  private headerRenderer = (column) => {
    return () => html`
      <vaadin-horizontal-layout
        data-testid="${column.tSelector}"
        class="header-cell ${column.headerLabel ? "spacing-header" : ""}"
      >
        <span>${column.headerLabel}</span>
        ${column.filter
          ? html`
              <table-filter
                @filter-column=${this._onFilterColumn}
                .headerLabel=${column.headerLabel}
                .filterService=${this.filterService}
                .displayKey=${column.cell?.displayKey}
                .filterConfig=${column.filterConfig}
              >
              </table-filter>
            `
          : ""}
        ${column.sort === true
          ? html`
              <table-sorter
                .column=${column}
                .sortKey=${this.sortKey}
                .sortValue=${this.sortValue}
                @change-order=${this._prepareToFetch}
              ></table-sorter>
            `
          : ""}
      </vaadin-horizontal-layout>
    `;
  };

  private cellRenderer: GridColumnBodyLitRenderer<any> = (
    root,
    column,
    model
  ) => {
    const columnConfig: any = model;
    if (columnConfig.cell.type === "CELL_STRING") {
      return html` <span
        data-testid="${root[columnConfig.cell.displayKey + "TSelector"]
          ? root[columnConfig.cell.displayKey + "TSelector"] +
            (column.index + 1)
          : columnConfig.cell.tSelector + (column.index + 1)}"
      >
        ${this.filterService.getFilterValueFromLabel(
          columnConfig.cell.displayKey,
          root[columnConfig.cell.displayKey]
        )}
      </span>`;
    } else if (columnConfig.cell.type === "CELL_STRING_ACTION") {
      return html`
        <vaadin-button
          data-testid="${root[columnConfig.cell.displayKey + "TSelector"]
            ? root[columnConfig.cell.displayKey + "TSelector"] +
              (column.index + 1)
            : columnConfig.cell.tSelector + (column.index + 1)}"
          theme="link small"
          class="cell-string-action"
          @click="${() =>
            this.onSendEvent(columnConfig.cell.options.eventName, root)}"
        >
          <span
            >${this.stringContentRenderer(
              root[columnConfig.cell.displayKey]
            )}</span
          >
        </vaadin-button>
      `;
    } else if (columnConfig.cell.type === "CELL_STRING_COPY") {
      return html` <span id="cell-string-copy">
        <span
          data-testid="${root[columnConfig.cell.displayKey + "TSelector"]
            ? root[columnConfig.cell.displayKey + "TSelector"] +
              (column.index + 1)
            : columnConfig.cell.tSelector + (column.index + 1)}"
        >
          ${columnConfig.cell.displayKey === "password" &&
          !!root[columnConfig.cell.displayKey]
            ? "********"
            : this.stringContentRenderer(root[columnConfig.cell.displayKey])}
        </span>
        ${!root[columnConfig.cell.displayKey] ||
        root[columnConfig.cell.displayKey] === "-"
          ? ""
          : html`
              <vaadin-button
                theme="icon link"
                @click="${() =>
                  this.copyToClipboard(root[columnConfig.cell.displayKey])}"
              >
                <comet-icon name="copy" size="24"></comet-icon>
              </vaadin-button>
            `}
      </span>`;
    } else if (columnConfig.cell.type === "CELL_IMAGE_STRING") {
      return html`
        <span
          class="cell-image-string"
          data-testid="${root[columnConfig.cell.displayKey + "TSelector"]
            ? root[columnConfig.cell.displayKey + "TSelector"] +
              (column.index + 1)
            : columnConfig.cell.tSelector + (column.index + 1)}"
        >
          <img
            class="mr-small"
            src="${root[columnConfig.cell.imageUrl]}"
            width="32px"
            height="32px"
          />
          ${this.stringContentRenderer(root[columnConfig.cell.displayKey])}
        </span>
      `;
    } else if (columnConfig.cell.type === "CELL_ICON_ACTION") {
      return html`
        <vaadin-button
          data-testid="${root[columnConfig.cell.displayKey + "TSelector"]
            ? root[columnConfig.cell.displayKey + "TSelector"] +
              (column.index + 1)
            : columnConfig.cell.tSelector + (column.index + 1)}"
          theme="link small"
          @click="${() =>
            this.onSendEvent(columnConfig.cell.options.eventName, root)}"
        >
          <comet-icon
            name="${root[columnConfig.cell.displayKey]
              ? "favorite-active"
              : "favorite"}"
            type="ui"
            size="26"
            primaryColor="${root[columnConfig.cell.displayKey]
              ? "#FBA625"
              : "neutral-60"}"
            secondaryColor="${"secondary-40"}"
          ></comet-icon>
        </vaadin-button>
      `;
    } else if (columnConfig.cell.type === "CELL_BADGE") {
      return html`
        <comet-badge
          data-testid="${root[columnConfig.cell.displayKey + "TSelector"]
            ? root[columnConfig.cell.displayKey + "TSelector"] +
              (column.index + 1)
            : columnConfig.cell.tSelector + (column.index + 1)}"
          class="d-inline-block"
          style="display:flex;justify-content:center;"
          theme="${root["statusBadge"]}"
          label="${root[columnConfig.cell.displayKey]}"
          maxCharacters="20"
        >
        </comet-badge>
      `;
    } else if (columnConfig.cell.type === "CELL_EXPANDABLE_TRIGGER") {
      return html`
        <vaadin-button
          data-testid="${root[columnConfig.cell.displayKey + "TSelector"]
            ? root[columnConfig.cell.displayKey + "TSelector"] +
              (column.index + 1)
            : columnConfig.cell.tSelector + (column.index + 1)}"
          theme="${root[columnConfig.cell.displayKey] ? "icon" : ""} link small"
          class="expand-row-button"
          @click="${() => this.onClickExpandableButton(root, column)}"
        >
          ${root[columnConfig.cell.displayKey]
            ? columnConfig.cell.displayKey === "status"
              ? html`
                  <comet-badge
                    data-testid="${root[
                      columnConfig.cell.displayKey + "TSelector"
                    ]
                      ? root[columnConfig.cell.displayKey + "TSelector"] +
                        (column.index + 1)
                      : columnConfig.cell.tSelector + (column.index + 1)}"
                    class="d-inline-block"
                    style="display:flex;justify-content:center;"
                    theme="${root["statusBadge"]}"
                    label="${root[columnConfig.cell.displayKey]}"
                    slot="prefix"
                  >
                  </comet-badge>
                `
              : html`<span slot="prefix"
                  >${this.stringContentRenderer(
                    root[columnConfig.cell.displayKey]
                  )}</span
                >`
            : ""}
          <comet-icon
            name="arrow-drop-${column.detailsOpened ? "up" : "down"}"
            type="ui"
            size="26"
          ></comet-icon>
        </vaadin-button>
      `;
    } else if (columnConfig.cell.type === "CELL_BUTTON") {
      return html`
        <div class="buttons-cell">
          ${root[columnConfig.cell.displayKey].map((button) => {
            return button?.dropdownIcons?.length > 0
              ? html`
                  <table-drop-down hasIcon .iconName=${button?.icon?.key}>
                    <vaadin-vertical-layout>
                      ${button.dropdownIcons.map((dropDownItem) => {
                        return html`
                          <vaadin-button
                            theme="link small"
                            .disabled=${dropDownItem.disabled}
                            @click="${() =>
                              this.onSendEvent(dropDownItem.eventName, root)}"
                            data-testid="${dropDownItem.eventName}-action-button"
                            style="${dropDownItem?.icon?.color
                              ? `color: var(--${button.icon.color})`
                              : "color: var(--primary-50)"}"
                          >
                            ${dropDownItem.icon
                              ? html`
                                  <comet-icon
                                    .name=${dropDownItem.icon.key}
                                    .primaryColor=${dropDownItem.icon?.color ||
                                    "primary-50"}
                                    slot="prefix"
                                    type="ui"
                                    size="24"
                                  ></comet-icon>
                                `
                              : ""}
                            ${dropDownItem.displayText}
                          </vaadin-button>
                        `;
                      })}
                    </vaadin-vertical-layout>
                  </table-drop-down>
                `
              : html`
                  <vaadin-button
                    .disabled=${button.disabled}
                    style="${button?.icon?.color
                      ? `color: var(--${button.icon.color})`
                      : "color: var(--primary-50)"}"
                    theme="${button.displayText ? "" : "icon"} link small"
                    @click="${() => this.onSendEvent(button.eventName, root)}"
                    data-testid="${button.eventName}-action-button"
                  >
                    ${button.tooltip
                      ? html`
                          <vaadin-tooltip
                            theme="table-tooltip"
                            slot="tooltip"
                            .text=${button.tooltip.text}
                          ></vaadin-tooltip>
                        `
                      : ""}
                    <comet-icon
                      .name=${button?.icon?.key}
                      slot="prefix"
                      .primaryColor=${button?.icon?.color || "primary-50"}
                      .type=${button?.icon?.type || "ui"}
                      size="24"
                    ></comet-icon>
                    ${button.displayText ? button.displayText : ""}
                  </vaadin-button>
                `;
          })}
        </div>
      `;
    }
  };

  private stringContentRenderer = (text: string) => {
    if ((text ?? "").length < 20) {
      return html`${text}`;
    } else {
      const id = Math.random().toString(36).substr(2, 9);
      return html`
        <span id="${id}"> ${text.slice(0, 16) + "..."} </span>
        <vaadin-tooltip
          for="${id}"
          slot="tooltip"
          .text=${text}
        ></vaadin-tooltip>
      `;
    }
  };

  private rowDetailRenderer = (item: any) => {
    return html`
      <table-expandable-content
        .expandableType=${item.expandableType}
        .expandableConfig=${item.expandableConfig}
      >
      </table-expandable-content>
    `;
  };

  private onSendEvent(eventType: string, eventDetail?: any) {
    this.dispatchEvent(
      new CustomEvent("on-table-event", {
        bubbles: true,
        composed: true,
        detail: { eventName: eventType, element: eventDetail },
      })
    );
  }

  private onClickExpandableButton(root: any, column: GridItemModel<any>): void {
    if (column.detailsOpened) {
      this._dataTable.closeItemDetails(root);
    } else {
      this._dataTable.openItemDetails(root);
    }
  }

  private _fetchNewData(): void {
    this.isDataLoading = true;

    if (!this.hasPaginator) {
      this.currentPage = 0;
      this.pageSize = 99999;
    }

    this._loadDataSubscription = this.loadData(
      this.currentPage,
      this.pageSize,
      this.sortValue,
      this.searchBarValue,
      this.sort,
      this.filter || {}
    ).subscribe({
      next: ({ content: items, total_elements: totalItems }) => {
        this.items = this.transformData(items);

        if (this.items.length === 0) this._generateFeedbackMessage();
        this.totalItems = totalItems;
        this.tableService.updateItems(this.items, this.totalItems);
        if (!this.hasPaginator) {
          this.isDataLoading = false;
        }
      },
      error: (_) => {
        this._generateFeedbackMessage(true);
        this.isDataLoading = false;
        this.items = [];
        this.totalItems = 0;
        this.tableService.updateItems(this.items, this.totalItems);
        if (!this.hasPaginator) {
          this.isDataLoading = false;
        }
      },
    });
  }

  private _onFilterColumn({ detail }): void {
    const filter = { ...this.filter, ...detail.filter };
    Object.keys(filter).forEach((key) => {
      if (
        !filter[key] ||
        filter[key] === this.filterService.allWord() ||
        filter[key]?.length === 0 ||
        (typeof filter[key] === "object" &&
          filter[key].length &&
          filter[key]?.length ===
            this.filterService.getFilterOptionsByDisplayKey(key).length)
      ) {
        delete filter[key];
      }
    });

    detail.filter = filter;
    this._prepareToFetch({ detail });
  }

  private _changeDataLoadingHandler({ detail }): void {
    this.isDataLoading = detail;
  }

  private _prepareToFetch({ detail }): void {
    Object.keys(detail).forEach((key) => (this[key] = detail[key]));
    this._fetchNewData();
  }

  private _generateFeedbackMessage(error: boolean = false): void {
    this.feedbackMessage = error
      ? {
          ...this._defaultErrorMessage[this.locale],
          ...this.errorMessage,
        }
      : {
          ...this._defaultNoResultsMessage[this.locale],
          ...this.noResultsMessage,
        };
  }

  static styles = css`
    .table-wrapper {
      padding: 12px;
      border-radius: 16px;
      border: 1px solid var(--neutral-30, #ebeae8);
      background: var(--neutral-0);
      box-shadow: 0px 4px 12px 0px rgba(51, 55, 66, 0.02),
        0px 4px 8px 0px rgba(51, 55, 66, 0.04),
        0px 2px 4px 0px rgba(51, 55, 66, 0.04);
    }
    .table-container {
      border-radius: 16px;
      position: relative;
      overflow: hidden;
      padding: 12px;
    }

    .table-header {
      padding: 0px 12px;
    }

    .table-container.blur > *:not(.loading-container) {
      filter: blur(8px);
    }

    .table-searchbar {
      margin-bottom: var(--spacing-md);
    }

    vaadin-grid {
      border: none;
    }

    .grid-container {
      position: relative;
    }

    .loading-container {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .loading-overlay {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }

    .loading-icon {
      position: relative;
    }

    .header-cell {
      color: var(--primary-60, #3d127a);
      font-variant-numeric: lining-nums tabular-nums;
      font-family: Kyn;
      font-size: 16px;
      font-style: normal;
      font-weight: var(--typo-font-weights-semibold);
      line-height: 24px;
      align-items: center;
      justify-content: space-between;
    }

    .buttons-cell {
      display: flex;
      align-items: center;
      width: 100%;
      column-gap: 24px;
    }

    .buttons-cell > * {
      margin: 0px;
      padding: 0px;
    }

    .spacing-header {
      padding: 0.5em 1em;
    }

    .cell-string-action::part(label) {
      text-decoration: underline;
    }

    .expand-row-button {
      margin: 0px;
      padding: 0px;
    }

    .filter-tags-wrapper {
      display: flex;
      gap: var(--spacing-s);
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: var(--spacing-l);
    }

    .loader,
    .loader:before,
    .loader:after {
      border-radius: 50%;
      width: 2.5em;
      height: 2.5em;
      animation-fill-mode: both;
      animation: bblFadInOut 1.8s infinite ease-in-out;
    }
    .loader {
      color: var(--primary-60);
      font-size: 13px;
      position: relative;
      text-indent: -9999em;
      transform: translateZ(0);
      animation-delay: -0.16s;
    }
    .loader:before,
    .loader:after {
      content: "";
      position: absolute;
      top: 0;
    }
    .loader:before {
      left: -3.5em;
      animation-delay: -0.32s;
    }
    .loader:after {
      left: 3.5em;
    }

    @keyframes bblFadInOut {
      0%,
      80%,
      100% {
        box-shadow: 0 2.5em 0 -1.3em;
      }
      40% {
        box-shadow: 0 2.5em 0 0;
      }
    }

    vaadin-grid-cell-content {
      overflow: unset;
    }

    #cell-string-copy {
      comet-icon[name="copy"] {
        visibility: hidden;
      }

      &:hover {
        comet-icon[name="copy"] {
          visibility: visible;
        }
      }
    }

    .cell-image-string {
      display: flex;
      align-items: center;

      img {
        margin-right: var(--spacing-xxs);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-table": CometTable;
  }
}
