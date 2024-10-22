import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Subscription } from "rxjs";
import { FilterTag } from "../../domain/interfaces/filter-tag.interface";
import { localized, msg } from "../../domain/localization/lit-localize";
import { FilterService } from "../../domain/services/filter.service";
import "./filter-content";

@customElement("filter-tags")
@localized()
export class FilterTags extends LitElement {
  // Properties
  @property()
  filterService: FilterService;
  @property({ type: Array })
  filterTags: Array<FilterTag>;
  @property({ type: Boolean })
  showClearButton: boolean;

  private _modifyFilterTagsSubscription: Subscription;

  connectedCallback(): void {
    super.connectedCallback();

    this._initComponent();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    this._modifyFilterTagsSubscription?.unsubscribe();
  }

  private _initComponent(): void {
    this._modifyFilterTagsSubscription = this.filterService
      .getModifyTagsSectionListener$()
      .subscribe(({ displayKey, tagValue, value }: FilterTag) =>
        this._modifyTagByDisplayKey(displayKey, tagValue, value)
      );
  }

  private _modifyTagByDisplayKey(displayKey, newValue, value): void {
    const tag = this.filterTags.find(
      ({ displayKey: key }) => key === displayKey
    );
    if (tag) {
      tag.tagValue = newValue;
      tag.value = value;
    }
    this.requestUpdate();
  }

  render() {
    return html`
      <div data-testid="filter-tags-container" class="filter-tags-container">
        <div class="filter-tags-grid">
          ${this.filterTags
            .filter((_) => _.showColumn)
            .map(({ headerLabel, tagValue: value, displayKey, filterType }) => {
              const multiSelect = filterType === "FILTER_MULTIPLE_OPTION";
              const hasValues = value !== this.filterService.allWord();

              return html`
                <div
                  class="filter-tag ${value !== this.filterService.allWord()
                    ? "filter-tag-selected"
                    : ""}"
                >
                  <span>${headerLabel}: </span>
                  ${multiSelect && hasValues
                    ? html` <span class="filter-tag-selected-text"
                          >${value[0]}</span
                        >
                        ${value.length > 1
                          ? html`<span class="filter-tag-selected-count"
                              >+${value.length - 1}</span
                            >`
                          : null}`
                    : html` <span class="filter-tag-selected-text"
                        >${value === this.filterService.allWord()
                          ? msg("All")
                          : value}</span
                      >`}
                  ${hasValues
                    ? html`
                        <vaadin-button
                          class="remove-button"
                          theme="link icon small"
                          data-testid="clear-${displayKey}-filter-button"
                          @click=${() => {
                            this.filterService.modifyFilterValues({
                              displayKey,
                            });
                          }}
                        >
                          <comet-icon
                            slot="prefix"
                            name="x"
                            type="ui"
                            size="16"
                            primaryColor="primary-90"
                          ></comet-icon>
                        </vaadin-button>
                      `
                    : ""}
                </div>
              `;
            })}
        </div>

        ${this.filterTags
          .filter(({ value }) => value !== "")
          .some(
            ({ value }) =>
              value !== this.filterService.allWord() || this.showClearButton
          )
          ? html`
              <vaadin-button
                id="clear-filters-button"
                data-testid="clear-filters-button"
                theme="link small"
                @click=${() => {
                  this._sendEvent("clear-all-filters", {
                    currentPage: 0,
                    filter: {},
                  });
                  this.filterService.modifyFilterValues({ clear: true });
                }}
              >
                ${msg("Clear filters")}
                <comet-icon
                  slot="prefix"
                  name="trash"
                  type="ui"
                  size="26"
                ></comet-icon>
              </vaadin-button>
            `
          : ""}
      </div>
    `;
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
      flex-grow: 1;
    }
    .filter-tags-container {
      display: flex;
      gap: var(--spacing-s);
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding-right: var(--spacing-s);
    }

    .filter-tags-grid {
      display: flex;
      gap: var(--spacing-s);
      align-items: center;
      flex-wrap: wrap;
    }

    .filter-tag {
      padding: var(--spacing-s) var(--spacing-s) var(--spacing-s)
        var(--spacing-l);
      color: var(--primary-60);
      border-radius: 100px;
      border: 1px solid var(--neutral-50, #c7c6c5);
      background: var(--neutral-0, #fff);
      cursor: default;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: background-color 0.3s;
      max-height: 44px;
    }

    .filter-tag-selected {
      background-color: var(--primary-10);
      border: 1px solid var(--primary-50);
      color: var(--primary-90);
    }

    .filter-tag > span {
      margin-right: var(--spacing-s);
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .filter-tag-selected .filter-tag-selected-count {
      background-color: var(--primary-50);
      border-radius: 8px;
      color: var(--neutral-0);
      padding: 4px 8px;
    }

    .filter-tag-selected .filter-tag-selected-text {
      color: var(--primary-50);
    }

    .remove-button {
      height: 14px;
      margin: 0px;
    }

    #clear-filters-button {
      margin: 0px;
    }
  `;
}
