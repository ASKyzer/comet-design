import "@vaadin/checkbox";
import "@vaadin/checkbox-group";
import "@vaadin/radio-group";
import "@vaadin/tabs";

import { css, html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

export interface FilterItem {
  description?: string;
  image_source?: string;
  label: string;
  selected?: boolean;
  value: string;
}

interface OptionCategory {
  label: string;
  selected?: boolean;
  value: string;
}

export interface categorizedItem {
  category: OptionCategory;
  items: FilterItem[];
}
@customElement("comet-options")
export class CometOptions extends LitElement {
  @property() public buttonLabel: string = "";
  @property() public categorizedItems: categorizedItem[] = [];
  @property() public clearAfterClose: boolean = false;
  @property() public description: string = "";
  @property() public fixedHeight: number = null; // fixed heigh the tabsheet when categorized
  @property() public items: FilterItem[] = [];
  @property() public label: string = "";
  @property() public maxHeight: string = ""; // maximun height of the main container
  @property() public multiSelect: boolean = false;
  @property() public noResultsMessage: string = "No Results";
  @property() public searchBar: boolean = false;
  @property() public radioButton: boolean = false;
  @property() public title: string = "";
  @property() public toggleButtonVisibility: boolean = false;

  @state() public categories: OptionCategory[] = [];
  @state() public categoryItems: FilterItem[][] = [];
  @state() public currentIndex: number = 0;
  @state() public currentTabIndex: number = 0;
  @state() public filteredItems: FilterItem[] = [];
  @state() public hasCategories = false;
  @state() public multiSelecionItems: categorizedItem[] = [];
  @state() public noResults: boolean = false;
  @state() public searchTerm: string = "";
  @state() public selectedItems: FilterItem[] = [];
  @state() public selectedTabIndex: number = null;

  @query("vaadin-tabs")
  private tabs!: HTMLElement;
  @query("vaadin-tabsheet")
  private tabsheet!: HTMLElement;
  @query("#search-bar")
  public searchBarElement: HTMLInputElement;

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.clearAfterClose) {
      this.selectedItems = null;
      this.multiSelecionItems = [];
      this.selectedItems = [];
    }
  }

  firstUpdated() {
    this.hasCategories = this.categorizedItems?.length > 0;
    if (this.hasCategories) {
      setTimeout(() => {
        this._initCategorizedList();
      }, 0);

      return;
    }

    setTimeout(() => {
      this.filteredItems = this.items;
      this.selectedItems = this.items?.filter((i) => i.selected);
    }, 0);
  }

  private setSelectedItemsCategorized() {
    this.selectedItems = this.categoryItems[this.currentTabIndex]?.filter(
      (i) => i.selected
    );
  }

  private setFilteredItemsCategorized() {
    this.filteredItems = this.multiSelecionItems[this.currentTabIndex]?.items;
  }

  private _initCategorizedList() {
    this.categories = this.categorizedItems.map((c) => c.category);
    this.categoryItems = this.categorizedItems.map((c) => c.items);

    this.multiSelecionItems = this.categorizedItems;
    this.currentTabIndex = this.categories.indexOf(
      this.categories.find((i) => i.selected)
    );
    this.selectedTabIndex = this.categories.indexOf(
      this.categories.find((i) => i.selected)
    );
    this.currentTabIndex =
      this.currentTabIndex === -1 ? 0 : this.currentTabIndex;
    this.setSelectedItemsCategorized();
    this.setFilteredItemsCategorized();
    this.clickCurrentTab();

    return;
  }

  clickCurrentTab() {
    setTimeout(() => {
      if (this.tabs) (this.tabs as any).selected = this.currentTabIndex;
    }, 0);
  }

  updated(changedProperties: any) {
    if (this.fixedHeight) {
      this.tabsheet?.setAttribute(
        "style",
        `min-height: ${this.fixedHeight}px;`
      );
    }

    if (this.hasCategories) {
      if (changedProperties.get("categorizedItems")) {
        this.multiSelecionItems = [];
        this.selectedItems = [];
        this._initCategorizedList();
      }
      return;
    }

    if (changedProperties.get("items")) {
      this.filteredItems = this.items;
      this.selectedItems = this.filteredItems.filter((fi) => fi.selected);
    }
  }

  dispatch(detail?: any) {
    this.dispatchEvent(
      new CustomEvent("option-change", {
        bubbles: true,
        composed: true,
        detail: detail,
      })
    );
  }

  handleChangeNoCategories(item) {
    const selectedItem = item;

    if (this.multiSelect) {
      const itemAlreadySelected = this.selectedItems?.find(
        (i) => i?.value === selectedItem?.value
      );

      this.selectedItems = itemAlreadySelected
        ? this.selectedItems?.filter((i) => i?.value !== selectedItem?.value)
        : ([...this.selectedItems, selectedItem] as FilterItem[]);

      this.filteredItems = this.items.map((fi) => {
        fi.selected = this.selectedItems.some((si) => si.value === fi.value)
          ? true
          : false;
        return fi;
      });
      this.selectedItems = this.filteredItems.filter((fi) => fi.selected);
      this.dispatch(this.selectedItems);
    } else {
      this.filteredItems = this.items.map((fi) => {
        fi.selected = fi.value === item.value ? true : false;
        return fi;
      });
      if (this.selectedItems[0]?.value !== item.value)
        this.dispatch(selectedItem);
      this.selectedItems = this.filteredItems.filter((fi) => fi.selected);
    }
  }

  handleSearchChange(e?: any) {
    this.searchTerm = this.searchBarElement?.value;
    if (this.searchBar) {
      if (this.hasCategories) {
        this.clickCurrentTab();
        const listItems = this.categoryItems[this.currentTabIndex].filter((i) =>
          i.label.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.noResults = !listItems.length ? true : false;

        return;
      }
      const listToSearch = this.items;
      const listItems = listToSearch.filter((i) =>
        i.label.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.noResults = !listItems.length ? true : false;
    }
  }

  handleClearSearchTerm() {
    this.noResults = false;
    this.filteredItems = this.hasCategories
      ? this.categoryItems[this.currentTabIndex]
      : this.items;
    if (this.hasCategories) this.clickCurrentTab();
    this.searchTerm = "";
    this.searchBarElement.value = "";
    this.searchBarElement.focus();
  }

  handleActionButtonClick() {
    if (this.hasCategories) {
      this._sendEventMultiSelecionItems(true);
    }

    this.dispatchEvent(
      new CustomEvent("action-button-click", {
        bubbles: true,
        composed: true,
        detail: this.multiSelect ? this.selectedItems : this.selectedItems[0],
      })
    );
  }

  handleListKeyDown(e) {
    if (this.multiSelect) {
      switch (e?.key) {
        case "Escape":
          e.preventDefault();
          this.handleChangeNoCategories(this.selectedItems.pop());
          break;
        case "Enter":
          e.preventDefault();
          this.handleChangeNoCategories(this.selectedItems.pop());
          break;
        default:
          break;
      }
    } else {
      const options = this.shadowRoot.querySelectorAll("li");
      if (e.key === "Escape") {
        e.preventDefault();
        this.dispatch(this.selectedItems[0]);
      } else if (e.key === "ArrowUp" || (e.shiftKey && e.key === "Tab")) {
        e.preventDefault();
        this.currentIndex =
          this.currentIndex > 0 ? this.currentIndex - 1 : options.length - 1;
        options[this.currentIndex]?.focus();
      } else if (e.key === "ArrowDown" || e.key === "Tab") {
        e.preventDefault();
        this.currentIndex =
          this.currentIndex < options.length - 1 ? this.currentIndex + 1 : 0;
        options[this.currentIndex]?.focus();
      } else if (e.key === "Enter") {
        e.preventDefault();
        this.handleChangeNoCategories(this.filteredItems[this.currentIndex]);
      }
    }
  }

  handleTabClick(index) {
    this.currentTabIndex = index;
    this.setFilteredItemsCategorized();
    if (this.multiSelect) {
      this.selectedItems = this.multiSelecionItems[index]?.items.filter(
        (i) => i.selected
      );
    }
  }

  handleCategoryItemlick(item) {
    if (this.multiSelect) {
      const selectedItem = item;
      const itemAlreadySelected = !!this.selectedItems?.find(
        (asi) => asi?.value === selectedItem?.value
      );

      this.selectedItems = itemAlreadySelected
        ? this.selectedItems?.filter((si) => si?.value !== selectedItem?.value)
        : ([...this.selectedItems, selectedItem] as FilterItem[]);
      this.multiSelecionItems = JSON.parse(
        JSON.stringify(this.multiSelecionItems)
      ).map((mselectedi, i) => {
        if (i === this.currentTabIndex) {
          mselectedi.items = mselectedi.items.map((li) => {
            li.selected = this.selectedItems.find(
              (item) => item.value === li.value
            )
              ? true
              : false;
            return li;
          });
          mselectedi.category.selected = mselectedi.items.find(
            (item) => item.selected
          )
            ? true
            : false;
        }
        return mselectedi;
      });
      this._sendEventMultiSelecionItems();
    } else {
      item.selected = true;
      this.multiSelecionItems = JSON.parse(
        JSON.stringify(this.multiSelecionItems)
      ).map((mselectedi, i) => {
        mselectedi.items = mselectedi.items.map((li) => {
          li.selected =
            li.value === item.value && i === this.currentTabIndex
              ? true
              : false;
          return li;
        });
        mselectedi.category.selected =
          i === this.currentTabIndex ? true : false;
        return mselectedi;
      });

      if (
        this.selectedItems[0]?.value === item.value &&
        this.selectedTabIndex === this.currentTabIndex
      ) {
        this._updateSelected(item);
        return;
      }
      this._sendEventMultiSelecionItems();
      this._updateSelected(item);
    }
  }

  private _updateSelected(item) {
    this.selectedItems = [item];
    this.selectedTabIndex = this.currentTabIndex;
  }

  private _sendEventMultiSelecionItems(actionButton?: boolean) {
    const selected = JSON.parse(JSON.stringify(this.multiSelecionItems)).filter(
      (mis) => {
        if (mis.category.selected)
          mis.items = mis.items.filter((x) => x.selected);
        return mis.category.selected;
      }
    );
    if (actionButton) {
      this.dispatchEvent(
        new CustomEvent("action-button-click", {
          bubbles: true,
          composed: true,
          detail: this.multiSelect ? selected : selected[0],
        })
      );
      return;
    }
    this.dispatch(this.multiSelect ? selected : selected[0]);
  }

  render() {
    return html`
      <div
        class="c-options__container ${this.maxHeight ? "--max-height" : ""}"
        style="${`max-height: ` + this.maxHeight}"
        part="main-container"
      >
        ${this.hasCategories
          ? this.renderCategorizedItems()
          : this.multiSelect
          ? this._renderMultiSelect()
          : this._renderSingleSelect()}
      </div>
    `;
  }

  private renderCategorizedItems() {
    return html`<div
      id="dropdown"
      part="options-container"
      class="c-options__options-container"
      role="listbox"
      .aria-activedescendant="${this.selectedItems?.[0]}"
      tabindex="-1"
    >
      ${this._renderTitle()} ${this._renderSearchBar()}
      ${this._renderDescription()} ${this._renderLabel()}
      ${this._renderNoResults()}
      ${this.noResults
        ? null
        : this.multiSelect
        ? this._renderCategorizedMultiSelect()
        : this._renderCategorizedSingleSelect()}
      ${this._renderFooter()}
    </div>`;
  }

  getFilteredItems(index?: number) {
    if (index && index !== this.currentTabIndex) return [];

    const searchTerm = this.searchBarElement?.value;
    const currentList = this.hasCategories
      ? this.multiSelecionItems[this.currentTabIndex].items
      : this.filteredItems;

    if (!searchTerm) return currentList;

    return currentList.filter((l) =>
      l.label.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  }

  private _renderCategorizedSingleSelect() {
    return html`
      <vaadin-tabsheet
        class="${this.label || this.description || this.searchBar
          ? "--pt-0"
          : ""}"
      >
        <vaadin-tabs slot="tabs" @selected-changed="${this._handleTabChange}">
          ${this.categories.map((c, i) => {
            return html`<vaadin-tab id="${c.value}-tab">
              ${c.label}
              ${this.multiSelecionItems[i].category.selected
                ? html`<span
                    style="color: var(--primary-50); position: absolute; right: 4px;"
                    >&nbsp;*</span
                  >`
                : null}
            </vaadin-tab>`;
          })}
        </vaadin-tabs>

        <div>
          ${this.categories.map(
            (c, index) => html`
              <div ?hidden="${this.currentTabIndex !== index}">
                <ul
                  id="dropdown"
                  part="options-container-tab"
                  class="c-options__options-container--tab"
                  role="listbox"
                  tabindex="-1"
                >
                  ${this.getFilteredItems(index).map((i) => {
                    return html`
                      <li
                        part="list-item-tab"
                        @click="${() => this.handleCategoryItemlick(i)}"
                        value="${i.value}"
                        id=${i.value}
                        role="option"
                        aria-selected=${i.selected}
                        tabindex="0"
                        @keydown=${this.handleListKeyDown}
                        class="c-options__options-item--tab ${this.radioButton
                          ? "--radio"
                          : ""} ${i.selected ? "--selected" : ""}"
                      >
                        <span
                          style="display: flex; align-items: center"
                          value="${i.value}"
                        >
                          ${this.radioButton
                            ? html`<vaadin-radio-button
                                .checked=${i.selected}
                              ></vaadin-radio-button>`
                            : null}
                          ${this._renderOptionImage(i)}
                          <span value="${i.value}">${i.label}</span>
                        </span>
                      </li>
                    `;
                  })}
                </ul>
              </div>
            `
          )}
        </div>
      </vaadin-tabsheet>
    `;
  }

  private _handleTabChange(e: CustomEvent) {
    this.currentTabIndex = e.detail.value;
    this.handleTabClick(this.currentTabIndex);
  }

  private _renderCategorizedMultiSelect() {
    return html`
      <vaadin-tabsheet
        class="${this.label || this.description || this.searchBar
          ? "--pt-0"
          : ""}"
      >
        <vaadin-tabs slot="tabs" @selected-changed="${this._handleTabChange}">
          ${this.categories.map((c, i) => {
            return html`<vaadin-tab id="${c.value}-tab">
              ${c.label}
              ${this.multiSelecionItems[i].category.selected
                ? html`<span
                    style="color: var(--primary-50); position: absolute; right: 4px;"
                    >&nbsp;*</span
                  >`
                : null}
            </vaadin-tab>`;
          })}
        </vaadin-tabs>

        <div>
          ${this.categories.map(
            (c, index) => html`
              <div ?hidden="${this.currentTabIndex !== index}">
                <ul
                  id="dropdown"
                  part="options-container-tab"
                  class="c-options__options-container--tab"
                  role="listbox"
                  tabindex="-1"
                >
                  ${this.getFilteredItems(index).map((i) => {
                    return html`
                      <li
                        part="list-item"
                        @click="${() => this.handleCategoryItemlick(i)}"
                        value="${i.value}"
                        id=${i.value}
                        role="option"
                        class="c-options__options-item--tab"
                        selected=${i.selected}
                      >
                        <span
                          style="display: flex; width: 100%;"
                          value="${i.value}"
                        >
                          ${this._renderCheckbox(i)}
                          <span
                            style="display: flex; margin-top: 4px"
                            value="${i.value}"
                          >
                            ${this._renderOptionImage(i)}
                            <span
                              value="${i.value}"
                              class="multi-select-option-item__label ${i.selected
                                ? "--selected"
                                : ""}"
                              >${i.label}</span
                            >
                          </span>
                        </span>
                      </li>
                    `;
                  })}
                </ul>
              </div>
            `
          )}
        </div>
      </vaadin-tabsheet>
    `;
  }

  private _renderSingleSelect() {
    return html`<ul
      id="dropdown"
      part="options-container"
      class="c-options__options-container"
      role="listbox"
      .aria-activedescendant="${this.selectedItems[0]}"
      tabindex="-1"
    >
      ${this._renderTitle()} ${this._renderSearchBar()}
      ${this._renderDescription()} ${this._renderLabel()}
      ${this._renderNoResults()}
      ${this.getFilteredItems().map((i) => {
        return html`
          <li
            part="list-item"
            @click="${() => this.handleChangeNoCategories(i)}"
            value="${i.value}"
            id=${i.value}
            role="option"
            aria-selected=${i.selected}
            tabindex="0"
            @keydown=${this.handleListKeyDown}
            class="c-options__options-item ${i.selected
              ? "--selected"
              : ""} ${this.radioButton ? "--radio" : ""}"
          >
            <span style="display: flex; align-items: center" value="${i.value}">
              ${this.radioButton
                ? html`<vaadin-radio-button
                    .checked=${i.selected}
                    style=${`${!i.image_source ? "margin-right: 8px;" : ""}`}
                  ></vaadin-radio-button>`
                : null}
              ${this._renderOptionImage(i)}
              <span value="${i.value}">${i.label}</span></span
            >
          </li>
        `;
      })}
      ${this._renderFooter()}
    </ul>`;
  }

  private _renderNoResults() {
    return this.noResults && this.searchBar
      ? html`<div
          part="no-results-container"
          class="c-options_no-results-container"
          style="${`min-height: ${this.fixedHeight - 32}px`}"
        >
          <comet-icon name="info" type="wecons-circle" size="28"></comet-icon>
          <div>${this.noResultsMessage}</div>
        </div>`
      : null;
  }

  private _renderMultiSelect() {
    return html`
      <ul
        id="dropdown"
        part="options-container"
        class="c-options__options-container"
        role="listbox"
        tabindex="-1"
      >
        ${this._renderTitle()} ${this._renderSearchBar()}
        ${this._renderDescription()} ${this._renderLabel()}
        ${this._renderNoResults()}
        ${this.getFilteredItems().map((i, index) => {
          return html`
            <li
              part="list-item"
              @click="${() => this.handleChangeNoCategories(i)}"
              value="${i.value}"
              id=${i.value}
              role="option"
              @keydown=${this.handleListKeyDown}
              class="c-options__options-item"
              selected=${i.selected}
            >
              <span style="display: flex; width: 100%;" value="${i.value}">
                ${this._renderCheckbox(i)}
                <span style="display: flex; margin-top: 4px" value="${i.value}">
                  ${this._renderOptionImage(i)}
                  <span
                    value="${i.value}"
                    class="multi-select-option-item__label ${i.selected
                      ? "--selected"
                      : ""}"
                    >${i.label}</span
                  >
                </span>
              </span>
            </li>
          `;
        })}
        ${this._renderFooter()}
      </ul>
    `;
  }

  private _renderTitle() {
    return html`
      <slot name="title"
        >${this.title
          ? html`<div
              class="c-options__title ${!this.searchBar
                ? "--no-searchbar"
                : ""}"
            >
              ${this.title}
            </div>`
          : null}</slot
      >
    `;
  }

  private _renderDescription() {
    if (!this.description || (this.noResults && !this.fixedHeight)) return null;
    return html`
      <div
        class="c-options__description ${this.searchBar || !this.title
          ? "--pad-top"
          : ""}"
      >
        <span>${this.description}</span>
      </div>
    `;
  }

  private _renderLabel() {
    if (!this.label || (this.noResults && !this.fixedHeight)) return null;
    return html`<div
      class="c-options__label ${this.hasCategories ? "--tab" : ""} ${!this
        .description
        ? "--pad-top"
        : ""}"
    >
      ${this.label}
    </div>`;
  }

  private _renderFooter() {
    if (this.toggleButtonVisibility) {
      return html`<slot name="footer">
        ${this.buttonLabel &&
        (this.selectedItems?.length ||
          this.multiSelecionItems.find((msi) => msi.category.selected))
          ? this.renderButton()
          : null}
      </slot>`;
    } else {
      return html`<slot name="footer">
        ${this.buttonLabel ? this.renderButton() : null}
      </slot>`;
    }
  }

  renderButton() {
    return html`
      <div class="c-options-footer__container">
        <comet-button
          @click=${this.handleActionButtonClick}
          theme="flushed"
          size="small"
          label="${this.buttonLabel}"
          trailingIcon="arrow-right"
        ></comet-button>
      </div>
    `;
  }

  private _renderSearchBar() {
    if (!this.searchBar) {
      return null;
    }

    return html`
      <div class="c-options__searchbar-container">
        <div
          style="position: relative; width: 100%; display: flex; align-items: center;"
        >
          <input
            id="search-bar"
            class="c-options__searchbar-input ${this.title
              ? "--border-top"
              : ""}"
            @keyup="${this.handleSearchChange}"
            value="${this.searchTerm ? this.searchTerm : ""}"
          />
          <comet-icon
            class="c-options__icon --search"
            name="search"
            size="20"
          ></comet-icon>
          ${this.searchTerm
            ? html` <comet-icon
                class="c-options__icon --remove"
                name="x"
                size="20"
                @click="${this.handleClearSearchTerm}"
              ></comet-icon>`
            : null}
        </div>
      </div>
    `;
  }

  private _renderOptionImage(i: FilterItem) {
    if (!i.image_source) {
      return null;
    }
    return html`
      <img
        src="${i.image_source}"
        alt="${i.label}"
        value="${i.value}"
        height="20px"
        style="${this._getImageMargins()}"
      />
    `;
  }

  private _getImageMargins() {
    return this.multiSelect ? "margin: 0 0 0 8px" : "margin: 0 8px";
  }

  private _renderCheckbox(item: FilterItem) {
    const checked = !!this.selectedItems?.find((s) => s?.value === item?.value);

    return html`<vaadin-checkbox
      class="checkbox"
      tabindex="0"
      ?checked="${checked}"
      value="${item.value}"
    ></vaadin-checkbox>`;
  }

  static styles = css`
    :host {
      align-self: flex-start;
      font-family: var(--lumo-font-family);
    }

    comet-icon {
      display: flex;
    }

    .c-options__title {
      color: var(--comet-color-font-light);
      font-size: 1.275rem;
      padding: 16px 12px;
    }

    .c-options__title.--no-searchbar {
      border-bottom: 1px solid var(--neutral-40);
      margin-bottom: 8px;
    }

    .c-options__description {
      color: var(--comet-color-font-dark);
      font-size: 12px;
      line-height: 1rem;
      margin-top: 0;
      margin-bottom: 8px;
      padding: 0 12px;
    }

    .c-options__description.--pad-top {
      margin-top: 16px;
    }

    .c-options-footer__container {
      background-color: var(--neutral-0);
      border-top: 1px solid var(--neutral-40);
      display: flex;
      flex-direction: row-reverse;
      margin-top: 10px;
      padding: 4px 12px 20px;
      position: sticky;
      bottom: 0;
      z-index: 2;
    }

    .c-options-footer__container comet-button {
      align-self: flex-end;
    }

    .c-options__label {
      color: var(--comet-color-font-dark);
      font-weight: var(--typo-font-weights-semibold);
      padding: 8px 12px 0;
    }

    .c-options__label.--tab {
      padding: 8px 12px;
    }

    .c-options__label.--pad-top {
      margin-top: 12px;
    }

    .multi-select-option-item__label {
      padding-left: 8px;
    }

    .multi-select-option-item__label.--selected {
      color: var(--primary-50);
    }

    .c-options__searchbar-container {
      background-color: var(--neutral-0);
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      z-index: 2;
    }

    .c-options__searchbar-container:focus-within {
      padding: 0 1px;
      outline: var(--primary-50) auto 1px;
      top: 1px;
    }

    .c-options__searchbar-input {
      border: none;
      border-bottom: 1px solid var(--neutral-40);
      border-radius: 4px;
      color: var(--comet-color-font-dark);
      font-family: var(--lumo-font-family);
      font-size: var(--typo-body-size);
      height: 48px;
      line-height: var(--typo-body-line-height);
      outline: none;
      padding-left: 36px;
      width: 100%;
    }

    .c-options__searchbar-input.--border-top {
      border-top: 1px solid var(--neutral-40);
    }

    .c-options__searchbar-input:focus {
      outline: none;
    }

    .c-options__icon.--search {
      position: absolute;
      left: 8px;
    }

    .c-options__icon.--remove {
      cursor: pointer;
      position: absolute;
      right: 12px;
    }

    .c-options__container {
      display: flex;
      flex-direction: column;
      width: auto;
    }

    .c-options__options-container,
    .c-options__options-container--tab {
      display: block;
      line-height: var(--typo-body-line-height);
      margin: 0;
      min-width: -webkit-fill-available;
      overflow: auto;
      padding: 0;
      width: 100%;
    }

    .c-options__options-container {
      background-color: var(--neutral-0);
      border-radius: 4px;
      box-shadow: var(--shadow-large);
    }

    .c-options__options-item,
    .c-options__options-item--tab {
      background-color: var(--neutral-0);
      color: var(--comet-color-font-dark);
      cursor: pointer;
      display: flex;
      min-height: 24px;
      list-style: none;
      margin: 0;
      padding: 8px 24px;
    }

    .c-options__options-item--tab {
      padding: 8px 20px;
    }

    .c-options__options-item:focus-visible,
    .c-options__options-item--tab:focus-visible {
      outline: var(--primary-50) auto 1px;
    }

    .c-options__options-item:hover,
    .c-options__options-item--tab:hover {
      background-color: var(--comet-color-hover);
    }

    .c-options__options-item:first-of-type {
      margin-top: 12px;
    }

    .c-options__options-item:last-of-type {
      margin-bottom: 12px;
    }

    .c-options__options-item--tab:last-child {
      margin-bottom: 12px;
    }

    .c-options__options-item.--selected {
      background-color: var(--comet-color-selected-light);
      color: var(--comet-color-font-light);
      font-weight: var(--typo-font-weights-semibold);
      cursor: default;
    }

    .c-options__options-item--tab.--selected {
      background-color: var(--comet-color-selected-light);
      color: var(--comet-color-font-light);
      font-weight: var(--typo-font-weights-semibold);
      cursor: default;
    }

    .c-options__options-item.--selected.--radio,
    .c-options__options-item--tab.--selected.--radio {
      background-color: transparent;
    }

    .c-options__options-item.--selected.--radio vaadin-radio-button,
    .c-options__options-item--tab.--selected.--radio vaadin-radio-button {
      pointer-events: none;
    }

    .c-options__options-item-description {
      color: var(--neutral-70);
      font-weight: var(--typo-font-weights-regular);
      font-size: var(--typo-body-small-size);
    }

    .c-options_no-results-container {
      color: var(--primary-50);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: var(--spacing-md);
    }

    vaadin-tabsheet::part(content) {
      padding: 0;
    }

    vaadin-tabsheet::part(tabs-container) {
      box-shadow: unset;
    }

    vaadin-tabsheet {
      padding-top: 16px;
    }

    vaadin-tabs {
      margin-bottom: 4px;
    }

    vaadin-tab {
      cursor: pointer;
    }

    vaadin-tab[aria-selected~="true"] {
      pointer-events: none;
    }

    vaadin-tabsheet.--pt-0 {
      padding-top: 0;
    }
  `;
}
