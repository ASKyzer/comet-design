import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, property, queryAsync, state } from "lit/decorators.js";
import { filter, Subscription, tap } from "rxjs";
import { CometSearchBar } from "../../../../searchbar/comet-searchbar";
import { localized, msg } from "../../domain/localization/lit-localize";
import { FilterService } from "../../domain/services/filter.service";
import "../table-search-bar";

@customElement("filter-content")
@localized()
export class FilterContent extends LitElement {
  // Properties
  @property({ type: Object })
  filterConfig;

  @property({ type: Boolean })
  showFilterContainer: boolean;

  @property({ type: String })
  displayKey: string;

  @property({ type: String })
  headerLabel: string;

  @property({ type: Object })
  filterService: FilterService;

  // State properties
  @state()
  value: Array<string> | string;

  // Query properties
  @queryAsync("comet-searchbar")
  cometSearchBar: Promise<CometSearchBar>;

  @queryAsync("#all-check-box")
  allCheckBox: Promise<HTMLElement>;

  private _modifyFilterValuesSubscription: Subscription;
  private _searchbarEventsSubscription: Subscription;

  connectedCallback(): void {
    super.connectedCallback();

    this._initComponent();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this._modifyFilterValuesSubscription?.unsubscribe();
    this._searchbarEventsSubscription?.unsubscribe();
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.updated(_changedProperties);

    if (
      _changedProperties.has("showFilterContainer") &&
      this.showFilterContainer
    ) {
      this.cometSearchBar.then((cometSearchBar) => {
        cometSearchBar?.searchBarElement.focus();
      });
    }
  }

  private _initComponent(): void {
    this._modifyFilterValuesSubscription = this.filterService
      .getModifyFilterValuesListener$()
      .pipe(
        tap(({ clear }) => {
          if (clear) this._clearFilterValues();
        }),
        filter(({ displayKey }) => displayKey === this.displayKey)
      )
      .subscribe(() => {
        this._clearFilterValues();
        this._fetchNewData();
      });

    this._initValueProperty();
  }

  private _initValueProperty(): void {
    const filterTags = this.filterService
      .getFilterTags()
      .find((_) => _.displayKey === this.displayKey);

    switch (this.filterConfig?.type) {
      case "FILTER_MULTIPLE_OPTION":
        // If we have saved filters in filter service we apply them otherwise we will select all
        if (filterTags?.value === this.filterService.allWord()) {
          this.value =
            this.filterConfig.options?.map(({ value }) => value) ||
            new Array<string>();
          this.allCheckBox.then(
            (allCheck: HTMLInputElement) => (allCheck.checked = true)
          );
        } else {
          this.value = this.filterConfig.options
            ?.filter((filterOption) => {
              return filterTags.value.includes(filterOption.value);
            })
            .map(({ value }) => value);
          if (this.value.length === this.filterConfig.options.length) {
            this.allCheckBox.then(
              (allCheck: HTMLInputElement) => (allCheck.checked = true)
            );
          }
        }

        break;
      case "FILTER_SINGLE_OPTION":
        if (filterTags?.value === this.filterService.allWord()) {
          this.value = this.filterService.allWord();
        } else {
          this.value = filterTags.value;
        }

        break;
      case "FILTER_STRING":
        if (filterTags?.value === this.filterService.allWord()) {
          this.value = "";
        } else {
          this.value = filterTags.value;
        }

        break;
      default:
        this.value = "";
        break;
    }
  }

  private _clearFilterValues(): void {
    switch (this.filterConfig?.type) {
      case "FILTER_MULTIPLE_OPTION":
        this.allCheckBox.then(
          (allCheck: HTMLInputElement) => (allCheck.checked = true)
        );
        this.value =
          this.filterConfig.options?.map(({ value }) => value) ||
          new Array<string>();
        break;
      case "FILTER_SINGLE_OPTION":
        this.value = this.filterService.allWord();
        break;
      case "FILTER_STRING":
      default:
        this.value = "";
        break;
    }
  }

  render() {
    return html` ${this._renderContent()} `;
  }

  private _renderContent() {
    if (!this.filterConfig) return "";

    switch (this.filterConfig.type) {
      case "FILTER_STRING":
        return this._renderSearchBar();
        break;
      case "FILTER_SINGLE_OPTION":
        return this._renderRadioButtons();
        break;
      case "FILTER_MULTIPLE_OPTION":
        return this._renderCheckBox();
        break;
      default:
        return "";
        break;
    }
  }

  private _renderSearchBar() {
    return html`
      <comet-searchbar
        @search-bar-input=${({ detail }) => {
          this.value = detail;
          this._fetchNewData();
        }}
        border="light"
        class="filter-search-bar"
        .searchTerm=${this.value as string}
        .placeholder=${`${msg("Search by")} ${this.headerLabel}`}
        .showSearchIcon=${false}
        .value=${this.value as string}
        class="filter-search-bar"
        data-testid="filter-search-bar"
      ></comet-searchbar>
    `;
  }

  private _renderRadioButtons() {
    return html`
      <vaadin-radio-group theme="vertical" .value=${this.value as string}>
        <vaadin-radio-button
          @click=${() => {
            this.value = this.filterService.allWord();
            this._fetchNewData();
            this._closePopUp();
          }}
          value="${this.filterService.allWord()}"
          style="pointer-events: ${this.value === this.filterService.allWord()
            ? "none"
            : "auto"};"
          label="${msg("All")}"
          data-testid="filter-radio-${this.displayKey}-all"
        ></vaadin-radio-button>
        <hr class="separator" />
        ${this.filterConfig?.options.map(
          ({ label, value }) =>
            html`
              <vaadin-radio-button
                style="pointer-events: ${this.value === value
                  ? "none"
                  : "auto"};"
                @click=${() => {
                  this.value = value;
                  this._fetchNewData();
                  this._closePopUp();
                }}
                .value="${value}"
                .label="${label}"
                data-testid="filter-radio-${this.displayKey}-${value}"
              ></vaadin-radio-button>
            `
        )}
      </vaadin-radio-group>
    `;
  }

  private _renderCheckBox() {
    return html`
      <vaadin-checkbox
        id="all-check-box"
        value="${this.filterService.allWord()}"
        label="${msg("All")}"
        @click=${async () => {
          const value = !(await (this.allCheckBox as Promise<HTMLInputElement>))
            .checked;
          if (value && this.value.length !== this.filterConfig.options.length) {
            this.value = this.filterConfig.options.map(({ value }) => value);
          } else if (
            !value &&
            this.value.length === this.filterConfig.options.length
          ) {
            this.value = [];
          }
          this._fetchNewData();
        }}
        data-testid="filter-check-${this.displayKey}-all"
      ></vaadin-checkbox>
      <hr class="separator" />
      <vaadin-checkbox-group
        theme="vertical"
        .value=${this.value as Array<string>}
      >
        ${this.filterConfig?.options.map(
          ({ label, value }) =>
            html`
              <vaadin-checkbox
                @click=${async () => {
                  const valueIndex: number = (
                    this.value as Array<string>
                  ).findIndex((val) => val === value);
                  if (valueIndex !== -1)
                    (this.value as Array<string>).splice(valueIndex, 1);
                  else (this.value as Array<string>).push(value);

                  (
                    await (this.allCheckBox as Promise<HTMLInputElement>)
                  ).checked =
                    this.value.length === this.filterConfig.options.length;
                  this._fetchNewData();
                }}
                .value="${value}"
                .label="${label}"
                data-testid="filter-check-${this.displayKey}-${value}"
              ></vaadin-checkbox>
            `
        )}
      </vaadin-checkbox-group>
    `;
  }

  private _fetchNewData(): void {
    // Modify the filter tags
    let tagValue: string | Array<string>;
    if (this.filterConfig?.type === "FILTER_MULTIPLE_OPTION") {
      tagValue =
        this.value.length!! &&
        this.value.length !== this.filterConfig?.options?.length
          ? this.value
          : this.filterService.allWord();

      this.filterService.modifyTagsSection({
        displayKey: this.displayKey,
        value: tagValue,
        multi: true,
      });
    } else {
      tagValue = this.value as string;
      this.filterService.modifyTagsSection({
        displayKey: this.displayKey,
        value: tagValue,
      });
    }

    this._sendEvent("on-filter-content-changed", {
      filter: (this.filterConfig?.key.split(",") as Array<string>).reduce(
        (prev, curr) => {
          prev[curr] = this.value;
          return prev;
        },
        {}
      ),
      currentPage: 0,
    });
  }

  private _closePopUp(): void {
    this._sendEvent("close-pop-up");
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

  static styles = css`
    :host {
      font-weight: var(--typo-font-weights-regular);
    }
    .filter-search-bar {
      display: block;
      width: 250px;
    }
    .separator {
      width: 100%;
      height: 1px;
      margin: 1rem 0;
      color: #e9e6ed;
      background-color: currentColor;
      border: 0;
      opacity: 1;
      box-sizing: content-box;
      color: #e9e6ed;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "filter-content": FilterContent;
  }
}
