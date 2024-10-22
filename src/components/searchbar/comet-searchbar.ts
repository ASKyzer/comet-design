import { css, html, LitElement } from "lit";
import {
  customElement,
  property,
  query,
  queryAsync,
  state,
} from "lit/decorators.js";
import { debounceTime, fromEvent, map, Subscription } from "rxjs";

@customElement("comet-searchbar")
export class CometSearchBar extends LitElement {
  @property() public border: "light" | "medium" | "dark";
  @property() public debounceTime: number = 500;
  @property() public items: string[] = [];
  @property() public optionsHeight: number = 250;
  @property() public placeholder: string = "";
  @property() public predictive: boolean = false;
  @property() public shape: "square" | "round" = "round";
  @property() public size: "small" | "medium" | "large" = "medium";
  @property() public showSearchIcon: boolean = true;
  @property() public value: string = "";

  @state() filteredItems: any[];
  @state() opened: boolean = false;

  // Query elements
  @queryAsync("#search-bar")
  searchBarElementAsync: Promise<HTMLInputElement>;
  @query("#search-bar")
  searchBarElement: HTMLInputElement;

  // Subscriptions
  private _searchBarEventsSubscription: Subscription;

  connectedCallback(): void {
    super.connectedCallback();

    this.searchBarElementAsync.then((searchbarElement: HTMLInputElement) => {
      this._searchBarEventsSubscription = fromEvent<InputEvent>(
        searchbarElement,
        "input"
      )
        .pipe(
          debounceTime(this.debounceTime),
          map((_) => searchbarElement.value?.trim() || "")
        )
        .subscribe((searchBarValue: string) => {
          this.value = searchBarValue;
          this.predictiveSearch(searchBarValue);
          this._dispatch(searchBarValue);
        });
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._searchBarEventsSubscription?.unsubscribe();
  }

  public predictiveSearch(searchBarValue) {
    if (!this.predictive) return;

    this.filteredItems = searchBarValue
      ? this.items.filter((i) =>
          i.toLowerCase().includes(searchBarValue.toLowerCase())
        )
      : [];
    this.opened = !!this.filteredItems.length;
    document.addEventListener("click", (event) => {
      if (!event.composedPath().includes(this)) {
        this.opened = false;
      }
    });
  }

  public handleClearClick() {
    this.value = "";
    if (this.predictive) {
      this.filteredItems = [];
      this.opened = false;
    }
    this._dispatch("");
    this.searchBarElement.focus();
  }

  private _dispatch(value: string): void {
    this.dispatchEvent(
      new CustomEvent("search-bar-input", {
        composed: true,
        bubbles: true,
        detail: value,
      })
    );
  }

  public handleSearchItemClick(item) {
    this.value = item;
    this.opened = false;
    this._dispatch(item);
  }

  render() {
    return html`
      <div style="position: relative;">
        <div
          data-testid="search-container"
          part="comet-searchbar-container"
          class="c-searchbar-container"
          size=${this.size}
          border=${this.border}
          shape=${this.shape}
        >
          ${
            this.showSearchIcon
              ? html` <comet-icon
                  data-testid="search-icon"
                  class="c-searchbar-search-icon"
                  size="${this.size === "small" ? "20" : "24"}"
                  primaryColor="primary-80"
                  name="search"
                ></comet-icon>`
              : null
          }
          <input
            data-testid="input"
            id="search-bar"
            part="comet-searchbar-input"
            class="c-searchbar-input"
            type="text"
            placeholder=${this.placeholder}
            .value=${this.value}
          />
          ${this._renderClearIcon()}
        </div>
        ${
          this.opened && this.predictive
            ? html`
                <ul
                  class="search-result"
                  size=${this.size}
                  border=${this.border}
                  style=${`max-height: ${this.optionsHeight}px;`}
                >
                  ${this.filteredItems.map(
                    (i) =>
                      html`<li
                        @click=${() => this.handleSearchItemClick(i)}
                        .innerHTML="${this._replacePreservingOriginalCase(
                          i,
                          this.value,
                          this.value
                        )}"
                      ></li>`
                  )}
                </ul>
              `
            : null
        }
          </ul>
      </div>
    `;
  }

  private _replacePreservingOriginalCase = (
    originalString,
    searchValue,
    replacementValue
  ) =>
    originalString.replace(new RegExp(searchValue, "gi"), (match) =>
      match
        .split("")
        .map((char, i) =>
          i < replacementValue.length
            ? `<span class="search-term-highlight">${
                char === char.toUpperCase()
                  ? replacementValue[i].toUpperCase()
                  : replacementValue[i].toLowerCase()
              }</span>`
            : ""
        )
        .join("")
    );

  private _renderClearIcon() {
    if (!this.value) {
      return null;
    }

    return html` <comet-icon
      @click="${this.handleClearClick}"
      class="c-searchbar-clear-icon"
      size="${this.size === "small" ? "20" : "24"}"
      primaryColor="primary-80"
      name="x"
      data-testid="clear-button"
    ></comet-icon>`;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .search-result {
      background-color: var(--neutral-0);
      border-radius: var(--border-s);
      box-shadow: var(--shadow-default);
      padding: 8px 0;
      position: absolute;
      top: 44px;
      margin: 0;
      overflow-y: scroll;
      z-index: 10;
      width: 100%;
    }

    .search-result[size~="small"] {
      top: 36px;
    }

    .search-result[size~="large"] {
      top: 56px;
    }

    .search-result > li {
      cursor: pointer;
      list-style: none;
      padding: 8px 20px;
    }

    .search-result li:hover {
      background-color: var(--comet-color-hover);
    }

    .search-term-highlight {
      color: var(--primary-50);
      font-weight: bold;
    }

    .c-searchbar-container {
      align-items: center;
      background-color: var(--neutral-0);
      display: flex;
      height: 40px;
      outline: none;
      padding: 0 16px;
    }

    .c-searchbar-container .c-searchbar-clear-icon,
    .c-searchbar-container .c-searchbar-search-icon {
      height: 24px;
    }

    .c-searchbar-input {
      background-color: transparent;
      border: none;
      border-radius: none;
      color: var(--comet-color-font-dark);
      flex-grow: 1;
      font-family: var(--lumo-font-family);
      outline: none;
      padding: 0 8px;
      width: -webkit-fill-available;
    }

    .c-searchbar-container:focus-within {
      outline: 1px solid var(--primary-50);
    }

    .c-searchbar-clear-icon {
      cursor: pointer;
    }

    .c-searchbar-container[border~="light"],
    .search-result[border~="light"] {
      border: 1px solid var(--neutral-40);
    }

    .c-searchbar-container[border~="medium"],
    .search-result[border~="medium"] {
      border: 1px solid var(--neutral-60);
    }

    .c-searchbar-container[border~="dark"],
    .search-result[border~="dark"] {
      border: 1px solid var(--neutral-80);
    }

    .c-searchbar-container[shape~="square"] {
      border-radius: var(--spacing-xxs);
    }

    .c-searchbar-container[shape~="round"] {
      border-radius: 100px;
    }

    .c-searchbar-container[size~="small"] {
      height: 32px;
      padding: 0 8px;
    }

    .c-searchbar-container[size~="small"] .c-searchbar-input {
      padding: 0 4px;
    }

    .c-searchbar-container[size~="small"] .c-searchbar-search-icon,
    .c-searchbar-container[size~="small"] .c-searchbar-clear-icon {
      height: 20px;
    }

    .c-searchbar-container[size~="large"] {
      height: 52px;
    }
  `;
}
