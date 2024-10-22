import { css, html, LitElement } from "lit";
import { customElement, property, queryAsync, state } from "lit/decorators.js";
import { CometOptions, FilterItem } from "../options/comet-options";

export interface MultiSelectOptionsConfig {
  description?: string;
  maxHeight?: string;
  noResultsMessage?: string;
}

@customElement("comet-multi-select")
export class CometMultiSelect extends LitElement {
  @property({ type: Object }) public optionsConfig: MultiSelectOptionsConfig =
    null;
  @property({ type: Boolean }) public disabled = false;
  @property() public helperText: string = "";
  @property({ type: Boolean }) public invalid = false;
  @property({ type: Array }) public items: FilterItem[] = [];
  @property() public label: string = "";
  @property() public placeholder: string = "";
  @property({ type: Boolean }) public readonly = false;
  @property({ type: Boolean }) public rounded = false;
  @property({ type: Boolean }) public required = false;
  @property({ type: Boolean }) public searchBar = false;
  @property() public theme: string = "";
  @property() public type: "filter" | "input" = "input";

  @state() public extraSelectedItems: number = 0;
  @state() public filteredItems: FilterItem[] = [];
  @state() public firstRender: boolean = true;
  @state() public opened: boolean = false;
  @state() public searchTerm: string = "";
  @state() public selectedItems: FilterItem[] = [];

  // Query properties
  @queryAsync("comet-options")
  CometOptions: Promise<CometOptions>;

  firstUpdated() {
    this.setInitialItems();

    setTimeout(() => {
      window.addEventListener("resize", (event) => {
        this._renderInputValue();
      });
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }

  updated(changedProperties: any) {
    if (changedProperties.get("items")) {
      this.setInitialItems();
    }
  }

  setInitialItems() {
    this.filteredItems = this.items;
    this.selectedItems = this.filteredItems.filter((fi) => fi.selected);
    this.extraSelectedItems = this.selectedItems.length;
  }

  handleToggleClick(event) {
    if (
      this.disabled ||
      this.readonly ||
      event.target.classList.value.includes("selected-item-display")
    ) {
      return;
    }

    this.opened = !this.opened;

    if (this.opened) {
      if (this.searchBar) {
        this.CometOptions.then((CometOptions) => {
          CometOptions.searchBarElement.focus();
        });
      }

      document.addEventListener("click", (event) => {
        if (!event.composedPath().includes(this)) {
          this.opened = false;
          this.checkValidity();
        }
      });
    }
  }

  checkValidity() {
    this.invalid = this.selectedItems?.length === 0 && this.required;
  }

  dispatch(detail?: any) {
    this.dispatchEvent(
      new CustomEvent("select-change", {
        bubbles: true,
        composed: true,
        detail: detail,
      })
    );
  }

  handleClearClick() {
    this.selectedItems = [];
    this.filteredItems = this.items.map((i) => {
      i.selected = false;
      return i;
    });
    this.searchTerm = "";
    this.extraSelectedItems = 0;
    this.dispatch();
  }

  handleChange() {
    this.selectedItems = this.filteredItems.filter((fi) => fi.selected);
    this.dispatchEvent(
      new CustomEvent("select-change", {
        bubbles: true,
        composed: true,
        detail: this.selectedItems,
      })
    );
  }

  handleSearchChange(e: any) {
    this.searchTerm = e.target?.value;
    this.filteredItems = this.items.filter((i) =>
      i.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getState = () => {
    let state = [];

    if (this.invalid) {
      state.push("--invalid");
    }
    if (this.disabled) {
      state.push("--disabled");
    }
    if (this.required) {
      state.push("--required");
    }
    if (this.rounded) {
      state.push("--rounded");
    }
    if (this.readonly) {
      state.push("--readonly");
    }
    if (this.selectedItems?.length) {
      state.push("selected");
    }

    return state.join(" ");
  };

  removeSelectedItem(item) {
    this.selectedItems = this.selectedItems.filter(
      (i) => i.value !== item.value
    );
    this.filteredItems = this.filteredItems.map((fi) => {
      if (fi.value === item.value) fi.selected = false;
      return fi;
    });
    this.dispatch(this.selectedItems);
  }

  render() {
    return html`
      <div part="comet-multi-select-overlay" class="c-multi-select__overlay">
        <div
          class="c-multi-select__container ${this.getState()}"
          part="comet-multi-select-container"
        >
          ${this._renderLabel()}
          ${this.theme === "helper-text-above"
            ? this._renderHelperText()
            : null}
          <div style="position: relative">
            ${this._renderContentContainer()}
            ${this.theme !== "helper-text-above"
              ? this._renderHelperText()
              : null}
            ${this._renderErrorMessage()} ${this._renderOptions()}
          </div>
        </div>
      </div>
    `;
  }

  private _renderLabel() {
    if (!this.label) {
      return null;
    }

    return html` <label
      class="c-multi-select__label ${this.getState()} ${this.theme ===
      "helper-text-above"
        ? "--helper-below"
        : ""}"
      part="comet-multi-select-label"
      >${this.label}
      <span class="c-multi-select__label--astrick ${this.getState()}"
        >${this.required ? "•" : ""}
      </span></label
    >`;
  }

  private _renderHelperText() {
    if (!this.helperText) {
      return null;
    }

    return html` <div
      part="comet-multi-select-helper-text"
      class="c-multi-select__helper-text ${this.getState()} ${this.theme ===
      "helper-text-above"
        ? "--above"
        : ""}"
    >
      ${this.helperText}
    </div>`;
  }

  private _renderContentContainer() {
    return html` <button
      part="comet-multi-select-container"
      class="c-multi-select__content-container ${this.getState()}"
      type="button"
      aria-haspopup="listbox"
      aria-expanded="${this.opened}"
      @click="${this.handleToggleClick}"
    >
      <div
        id="multi-select-input-container"
        style="display: flex; padding-right:58px"
        .value="${this.selectedItems.map((i) => i.value)}"
      >
        ${this._renderInputValue()}
        <span
          part="comet-filter-selected-number-indicator"
          class="selected-number-indicator"
          >${this.extraSelectedItems > 0
            ? "+" + this.extraSelectedItems
            : ""}</span
        >
      </div>
      <div class="c-multi-select__content-suffix-items">
        ${this._renderClearIcon()} ${this._renderSuffix()}
        ${this._renderToggleIcon()}
      </div>
    </button>`;
  }

  private _renderErrorMessage() {
    if (!this.invalid) {
      return null;
    }

    return html`
      <div
        class="c-multi-select__error-message ${this.rounded ? "--rounded" : ""}"
      >
        <slot name="error-message"></slot>
      </div>
    `;
  }

  private _renderInputValue() {
    return html`
      <div
        part="comet-multi-select-content-value"
        class="c-multi-select__content-container--value"
        .value="${this.selectedItems.map((i) => i.value)}"
      >
        ${this._renderPrefix()}
        ${this.selectedItems.length > 0
          ? html`${this._renderSelectedItems()}`
          : html`<span
              part="comet-multi-select-placeholder"
              class="c-multi-select__content-container--placeholder"
              >${this.placeholder}</span
            >`}
      </div>
    `;
  }

  private _renderSelectedItems() {
    let itemsToRender = 0;
    let additionalSelected = 0;

    const contentContainer = this.shadowRoot.querySelector(
      ".c-multi-select__content-container"
    );
    const containerWidth = parseInt(
      getComputedStyle(contentContainer)
        .getPropertyValue("width")
        .split("px")[0]
    );
    const rightSide = 175 / containerWidth;
    const fillableWidth = 1 - rightSide;

    this.selectedItems.forEach((i, index) => {
      if (index <= this.selectedItems.length) {
        const selectedElements = this.shadowRoot.querySelectorAll(
          ".selected-item-display"
        );
        let addedWidth = 0;
        let additionalItems = 0;
        let render = 0;

        selectedElements.forEach((a) => {
          addedWidth = addedWidth + a.clientWidth + 20;
          if (addedWidth / containerWidth < fillableWidth) {
            render = render + 1;
          } else {
            additionalItems = additionalItems + 1;
          }
          itemsToRender = render;
          additionalSelected = additionalItems;
        });
      }
    });

    if (this.firstRender) {
      itemsToRender = this.selectedItems.length;
      this.firstRender = false;
    }

    const selectedItemsToReneder = this.selectedItems?.filter(
      (s, n) => n <= itemsToRender
    );

    this.extraSelectedItems =
      this.selectedItems?.length - selectedItemsToReneder?.length;

    return selectedItemsToReneder?.map((i, idx) => {
      return html`<div
        @click="${() => this.removeSelectedItem(i)}"
        class="selected-item-display ${this.disabled ? "--disabled" : ""}"
        value=${i.value}
      >
        ${i.label}
        ${this.disabled || this.readonly
          ? ""
          : html` <span
              id="${"remove-pill-" + i.value}"
              class="selected-item-display-clear-button"
              style="margin-left: 4px;"
              value=${i.value}
              >X</span
            >`}
      </div>`;
    });
  }

  private _renderPrefix() {
    return html` <slot name="prefix"> </slot>`;
  }

  private _renderSuffix() {
    return html` <slot name="suffix"> </slot>`;
  }

  private _renderClearIcon() {
    if (!this.selectedItems?.length || this.disabled || this.readonly) {
      return null;
    }

    return html`
      <slot name="comet-multi-select-clear-icon">
        <comet-icon
          @click="${this.handleClearClick}"
          name="x"
          size="20"
          primaryColor="neutral-60"
          class="remove-icon"
        ></comet-icon
      ></slot>
    `;
  }

  private _renderToggleIcon() {
    return html`<slot name="comet-multi-select-toggle-icon"
      ><comet-icon
        name="${this._getIcon()}"
        size="16"
        primaryColor="neutral-70"
        style="margin-left: 8px;"
      ></comet-icon
    ></slot> `;
  }

  private _getIcon() {
    switch (this.type) {
      case "filter":
        return this.selectedItems?.length ? "Filtered" : "filters";
      case "input":
        return this.opened ? "chevron-up" : "chevron-down";
    }
  }

  private _renderOptions() {
    return html`
      <div
        part="comet-multi-select-options-container"
        class="c-multi-select__options-container ${this.opened ? "--show" : ""}"
      >
        <comet-options
          @option-change="${this.handleChange}"
          .items="${this.filteredItems}"
          .multiSelect=${true}
          .searchBar=${this.searchBar}
          .description=${this.optionsConfig?.description}
          .maxHeight=${this.optionsConfig?.maxHeight}
          .noResultsMessage=${this.optionsConfig?.noResultsMessage}
        ></comet-options>
      </div>
    `;
  }

  static styles = css`
    :host {
      align-self: flex-start;
      font-family: var(--lumo-font-family);
    }

    .selected-item-display {
      background: var(--primary-50);
      border-radius: 6px;
      color: var(--neutral-0);
      font-size: var(--typo-caption-size);
      margin-right: 8px;
      padding: 2px 8px;
      overflow: hidden;
      white-space: nowrap;
    }

    .selected-item-display.--disabled {
      background-color: var(--neutral-50);
    }

    input:focus {
      outline: 1px solid var(--primary-50);
    }

    comet-icon {
      display: flex;
    }

    .c-multi-select__overlay {
      position: relative;
      width: auto;
    }

    .c-multi-select__searchbar-container {
      background-color: var(--neutral-0);
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      z-index: 2;
    }

    .c-multi-select__searchbar-input {
      border: none;
      border-bottom: 1px solid var(--comet-color-border);
      color: var(--comet-color-font-dark);
      font-family: var(--lumo-font-family);
      font-size: var(--typo-body-size);
      height: 48px;
      line-height: var(--typo-body-line-height);
      outline: none;
      padding-left: 36px;
      width: 100%;
    }

    .c-multi-select__searchbar-input:focus {
      outline: none;
    }

    .c-multi-select__icon.--search {
      position: absolute;
      left: 8px;
    }

    .c-multi-select__icon.--remove {
      cursor: pointer;
      position: absolute;
      right: 12px;
    }

    .c-multi-select__container {
      display: flex;
      flex-direction: column;
      padding: 16px 0 4px;
      width: auto;
    }

    .c-multi-select__label {
      color: var(--comet-color-font-dark);
      font-weight: var(--typo-font-weights-semibold);
      line-height: 1;
      overflow: hidden;
      padding: 0 16px 8px 0;
      text-overflow: ellipsis;
      text-shadow: 0 0 var(--comet-color-font-dark);
      white-space: nowrap;
    }

    .c-multi-select__label.--helper-below {
      padding: 0 16px 6.4px 0;
    }

    .c-multi-select__label.--disabled {
      color: var(--comet-color-disabled-label);
    }

    .c-multi-select__label--astrick.--invalid {
      color: var(--comet-color-invalid);
    }

    .c-multi-select__label--astrick.--disabled {
      color: var(--comet-color-disabled-label);
    }

    .c-multi-select__content-container {
      align-items: center;
      background-color: var(--neutral-0);
      border: 1px solid var(--neutral-60);
      border-radius: 4px;
      color: var(--primary-90);
      cursor: pointer;
      display: inline-flex;
      font-family: var(--lumo-font-family);
      font-size: var(--typo-body-size);
      height: 50px;
      justify-content: space-between;
      min-width: 150px;
      padding: 0px 16px;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
    }

    .c-multi-select__content-container:hover {
      background-color: var(--comet-color-hover);
    }

    .c-multi-select__content-container:focus-visible {
      outline-color: var(--primary-50) !important;
    }

    .c-multi-select__content-container:active {
      background-color: var(--neutral-30);
    }

    .c-multi-select__content-container.--readonly {
      border: 1px solid var(--comet-color-border);
      pointer-events: none;
    }

    .c-multi-select__content-container.--invalid {
      background-color: var(--comet-color-invalid-bg);
      border: 1px solid var(--comet-color-invalid);
    }

    .c-multi-select__content-container.--rounded {
      border-radius: 100px;
    }

    .c-multi-select__helper-text.--rounded {
      margin-left: 20px;
    }

    .c-multi-select__error-message.--rounded {
      margin-left: 20px;
    }

    .c-multi-select__content-container.--invalid:hover {
      background-color: var(--comet-color-invalid-hover);
    }

    .c-multi-select__content-container.--invalid:active {
      background-color: var(--danger-20);
    }

    .c-multi-select__content-container.--disabled {
      background-color: var(--comet-color-disabled-bg);
      color: var(--comet-color-disabled-label);
      pointer-events: none;
    }

    .c-multi-select__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--comet-color-font-dark);
      width: 100%;
    }

    .c-multi-select__content-suffix-items {
      align-items: center;
      display: flex;
      flex-direction: columns;
      justify-content: space-between;
      margin-left: 8px;
      position: absolute;
      right: 16px;
    }

    .c-multi-select__content-container.--disabled .c-multi-select__content {
      color: var(--comet-color-disabled-label);
    }

    .c-multi-select__helper-text {
      color: var(--comet-color-font-dark);
      font-size: var(--typo-caption-size);
    }

    .c-multi-select__helper-text::before {
      content: "";
      display: block;
      height: 0.4em;
    }

    .c-multi-select__helper-text.--above::before {
      content: "";
      display: block;
      height: 0;
    }

    .c-multi-select__helper-text.--above::after {
      content: "";
      display: block;
      height: 0.5em;
    }

    .c-multi-select__helper-text.--disabled {
      color: var(--comet-color-disabled-label);
    }

    .c-multi-select__error-message {
      color: var(--comet-color-invalid);
      font-size: var(--typo-caption-size);
    }

    .c-multi-select__error-message::before {
      content: "";
      display: block;
      height: 0.4em;
    }

    .c-multi-select__content-container--value {
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
    }

    .c-multi-select__content-container--placeholder {
      color: var(--comet-color-disabled-label) !important;
    }

    .remove-icon {
      margin: 4px 6px;
      cursor: pointer;
    }

    .c-multi-select__options-container {
      border-radius: 4px;
      position: absolute;
      top: 50px;
      left: 0px;
      border: 1px solid var(--neutral-40);
      display: none;
      line-height: var(--typo-body-line-height);
      margin: 0;
      max-height: 356px;
      padding: 0;
      width: 100%;
      z-index: 2;
    }

    .c-multi-select__options-container.--show {
      display: block;
    }
  `;
}
