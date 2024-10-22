import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { debounceTime, fromEvent, map, Subscription } from "rxjs";

@customElement("table-search-bar")
export class TableSearchBar extends LitElement {
  // Properties
  @property({ type: String })
  placeholder: string = "";
  @property({ type: Object })
  customStyles: {} = {};
  @property({ type: Boolean })
  showIcon: boolean = true;
  @property({ type: String })
  value: string = "";

  // Query elements
  @query("#search-bar")
  searchBarElement: HTMLInputElement;

  // Subscriptions
  private _searchBarEventsSubscription: Subscription;

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    this._searchBarEventsSubscription = fromEvent<InputEvent>(
      this.searchBarElement,
      "input"
    )
      .pipe(
        debounceTime(500),
        map((_) => this.searchBarElement.value?.trim() || "")
      )
      .subscribe((searchBarValue: string) =>
        this._sendEvent("search-bar-input", { searchBarValue, currentPage: 0 })
      );
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._searchBarEventsSubscription?.unsubscribe();
  }

  render() {
    return html`
      <div style=${styleMap(this.customStyles)} class="search-bar-container">
        ${this.showIcon
          ? html`
              <comet-icon
                name="search"
                size="24"
                class="search-bar-icon"
                primaryColor="primary-50"
              ></comet-icon>
            `
          : ""}
        <input
          type="text"
          id="search-bar"
          class="${this.showIcon ? "" : "no-icon"}"
          .value=${this.value}
          .placeholder=${this.placeholder}
        />
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
    .search-bar-container {
      position: relative;
      margin-bottom: var(--spacing-l);
      height: 50px;
    }

    #search-bar:focus,
    #search-bar:focus-visible,
    #search-bar:focus-within {
      outline: 2px solid var(--primary-50);
    }

    .search-bar-icon {
      position: absolute;
      top: 13px;
      left: var(--spacing-l);
      cursor: pointer;
    }

    #search-bar {
      all: unset;
      width: 100%;
      height: 100%;
      color: var(--primary-60);
      border-radius: 100px;
      border: 1px solid var(--neutral-50, #c7c6c5);
      background: var(--neutral-0, #fff);
      cursor: text;
      padding-left: 60px;
      padding-right: var(--spacing-l);
      box-sizing: border-box;
    }

    .no-icon {
      padding-left: var(--spacing-l) !important;
    }

    #search-bar::placeholder {
      color: var(--neutral-50, #c7c6c5);
      font-variant-numeric: lining-nums tabular-nums;
      font-family: Kyn;
      font-size: 16px;
      font-style: normal;
      font-weight: var(--typo-font-weights-regular);
      line-height: 24px;
    }
  `;
}
