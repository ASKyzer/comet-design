import { css, html, LitElement } from "lit";
import { customElement, property, queryAsync, state } from "lit/decorators.js";
import { CometOptions, FilterItem } from "../options/comet-options";

export interface SelectOptionsConfig {
  description?: string;
  maxHeight?: string;
  noResultsMessage?: string;
  radioButton?: boolean;
}

@customElement("comet-select")
export class CometSelect extends LitElement {
  @property({ type: Object }) public optionsConfig: SelectOptionsConfig = null;
  @property({ type: Boolean }) public canClear = true;
  @property({ type: Boolean }) public disabled = false;
  @property() public helperText: string = "";
  @property({ type: Boolean }) public invalid = false;
  @property({ type: Array }) public items: FilterItem[] = [];
  @property() public label: string = "";
  @property() public placeholder: string = "";
  @property({ type: Boolean }) public readonly = false;
  @property({ type: Boolean }) public required = false;
  @property({ type: Boolean }) public rounded = false;
  @property({ type: Boolean }) public searchBar = false;
  @property() public theme: string = "";
  @property() public type: "filter" | "sort" | "input" = "input";

  @state() public filteredItems: FilterItem[] = [];
  @state() public opened = false;

  // Query properties
  @queryAsync("comet-options")
  CometOptions: Promise<CometOptions>;

  private _selectedItem: FilterItem | undefined;

  constructor() {
    super();

    this._selectedItem = undefined;
  }

  public get properties() {
    return {
      selectedItem: { label: String, value: String },
    };
  }

  set selectedItem(val) {
    let oldVal = this._selectedItem;
    this._selectedItem = val;
    this.requestUpdate("selectedItem", oldVal);
  }

  get selectedItem() {
    return this._selectedItem;
  }

  firstUpdated() {
    this.setInitialItems();
  }

  updated(changedProperties: any) {
    if (changedProperties.get("items")) this.setInitialItems();
  }

  setInitialItems() {
    this.filteredItems = this.items;
    this.selectedItem = this.filteredItems.find((fi) => fi.selected);
  }

  handleToggleClick() {
    if (this.disabled || this.readonly) return;

    this.opened = !this.opened;

    if (this.opened) {
      if (this.searchBar)
        this.CometOptions.then((CometOptions) =>
          CometOptions.searchBarElement.focus()
        );

      document.addEventListener("click", (event) => {
        if (!event.composedPath().includes(this)) {
          this.opened = false;
          this.checkValidity();
        }
      });
    }
  }

  checkValidity() {
    this.invalid = !this.selectedItem && this.required;
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
    this.selectedItem = undefined;
    this.filteredItems = this.items.map((i) => {
      i.selected = false;
      return i;
    });
    this.dispatch();
  }

  handleChange({ detail }: CustomEvent) {
    if (detail) {
      this.selectedItem = detail;
      this.filteredItems = this.items.map((i) => {
        if (i.value === this.selectedItem.value) i.selected = true;
        return i;
      });
      this.opened = false;
      this.dispatch(this.selectedItem);
      this.checkValidity();
    }
  }

  getState = () => {
    let state = [];

    if (this.invalid) state.push("--invalid");
    if (this.disabled) state.push("--disabled");
    if (this.required) state.push("--required");
    if (this.rounded) state.push("--rounded");
    if (this.readonly) state.push("--readonly");
    if (this.selectedItem) state.push("selected");

    return state.join(" ");
  };

  render() {
    return html`
      <div part="comet-select-overlay" class="c-select__overlay">
        <div
          class="c-select__container ${this.getState()}"
          part="comet-select-container"
        >
          ${this._renderLabel()}
          ${this.theme === "helper-text-above"
            ? this._renderHelperText()
            : null}
          <div style="position: relative;">
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
    if (!this.label) return null;

    return html` <label
      class="c-select__label ${this.getState()} ${this.theme ===
      "helper-text-above"
        ? "--helper-below"
        : ""}"
      part="comet-select-label"
      >${this.label}
      <span class="c-select__label--astrick ${this.getState()}"
        >${this.required ? "•" : ""}
      </span></label
    >`;
  }

  private _renderHelperText() {
    if (!this.helperText) return null;

    return html` <div
      part="comet-select-helper-text"
      class="c-select__helper-text ${this.getState()} ${this.theme ===
      "helper-text-above"
        ? "--above"
        : ""}"
    >
      ${this.helperText}
    </div>`;
  }

  private _renderContentContainer() {
    return html` <button
      part="comet-select-container"
      class="c-select__content-container ${this.getState()}"
      type="button"
      aria-haspopup="listbox"
      aria-expanded="${this.opened}"
      @click="${this.handleToggleClick}"
    >
      ${this._renderInputValue()}
      <div class="c-select__content-suffix-items">
        ${this._renderClearIcon()} ${this._renderSuffix()}
        ${this._renderToggleIcon()}
      </div>
    </button>`;
  }

  private _renderErrorMessage() {
    if (!this.invalid) return null;

    return html`
      <div class="c-select__error-message ${this.rounded ? "--rounded" : ""}">
        <slot name="error-message"></slot>
      </div>
    `;
  }

  private _renderInputValue() {
    return html`
      <div
        part="comet-select-content-value"
        class="c-select__content-container--value"
        value="${this.selectedItem?.value}"
      >
        ${this._renderPrefix()}
        ${this.selectedItem?.label
          ? this.selectedItem.label
          : html`<span
              part="comet-select-placeholder"
              class="c-select__content-container--placeholder"
              value="${this.selectedItem?.value}"
              >${this.placeholder}</span
            >`}
      </div>
    `;
  }

  private _renderPrefix() {
    return html` <slot name="prefix">
      ${this.selectedItem?.image_source
        ? html` <img
            src="${this.selectedItem?.image_source}"
            height="20px"
            style="margin: 0 8px 0 4px;"
          />`
        : null}
    </slot>`;
  }

  private _renderSuffix() {
    return html` <slot name="suffix"> </slot>`;
  }

  private _renderClearIcon() {
    if (!this.selectedItem || !this.canClear || this.disabled || this.readonly)
      return null;

    return html`
      <slot name="comet-select-clear-icon">
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
    return html`<slot name="comet-select-toggle-icon"
      ><comet-icon
        name="${this._getIcon()}"
        size="16"
        primaryColor="${this._getColor()}"
        style="margin-left: 8px;"
      ></comet-icon
    ></slot> `;
  }

  private _getIcon() {
    switch (this.type) {
      case "filter":
        return this.selectedItem ? "Filtered" : "filters";
      case "sort":
        return "Sort";
      case "input":
        return this.opened ? "chevron-up" : "chevron-down";
    }
  }

  private _getColor() {
    switch (this.type) {
      case "sort":
        return this.selectedItem ? "neutral-70" : "neutral-50";
      default:
        return "neutral-70";
    }
  }

  private _renderOptions() {
    return html`
      <div
        part="comet-select-options-container"
        class="c-select__options-container ${this.opened ? "--show" : ""}"
      >
        <comet-options
          @option-change="${this.handleChange}"
          .items="${this.filteredItems}"
          .searchBar=${this.searchBar}
          .description=${this.optionsConfig?.description}
          .radioButton=${this.optionsConfig?.radioButton}
          .maxHeight=${this.optionsConfig?.maxHeight}
          .noResultsMessage=${this.optionsConfig?.noResultsMessage}
        >
        </comet-options>
      </div>
    `;
  }

  static styles = css`
    :host {
      align-self: flex-start;
      font-family: var(--lumo-font-family);
    }

    comet-icon {
      display: flex;
    }

    .c-select__overlay {
      position: relative;
      width: auto;
    }

    .c-select__icon.--remove {
      cursor: pointer;
      position: absolute;
      right: 12px;
    }

    .c-select__container {
      display: flex;
      flex-direction: column;
      padding: 16px 0 4px;
      width: auto;
    }

    .c-select__label {
      color: var(--comet-color-font-dark);
      font-weight: var(--typo-font-weights-semibold);
      line-height: 1;
      overflow: hidden;
      padding: 0 16px 8px 0;
      text-overflow: ellipsis;
      text-shadow: 0 0 var(--primary-70);
      white-space: nowrap;
    }

    .c-select__label.--helper-below {
      padding: 0 16px 6.4px 0;
    }

    .c-select__label.--disabled {
      color: var(--comet-color-disabled-label);
    }

    .c-select__label--astrick.--invalid {
      color: var(--comet-color-invalid);
    }

    .c-select__label--astrick.--disabled {
      color: var(--comet-color-disabled-label);
    }

    .c-select__content-container {
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
      width: 100%;
    }

    .c-select__content-container:hover {
      background-color: var(--comet-color-hover);
    }

    .c-select__content-container:focus-visible {
      outline-color: var(--primary-50) !important;
    }

    .c-select__content-container:active {
      background-color: var(--neutral-30);
    }

    .c-select__content-container.--readonly {
      border: 1px solid var(--comet-color-border);
      pointer-events: none;
    }

    .c-select__content-container.--rounded {
      border-radius: 100px;
    }

    .c-select__helper-text.--rounded {
      margin-left: 20px;
    }

    .c-select__error-message.--rounded {
      margin-left: 20px;
    }

    .c-select__content-container.--invalid {
      background-color: var(--comet-color-invalid-bg);
      border: 1px solid var(--comet-color-invalid);
    }

    .c-select__content-container.--invalid:hover {
      background-color: var(--comet-color-invalid-hover);
    }

    .c-select__content-container.--invalid:active {
      background-color: var(--danger-20);
    }

    .c-select__content-container.--disabled {
      background-color: var(--comet-color-disabled-bg);
      color: var(--comet-color-disabled-label);
      pointer-events: none;
    }

    .c-select__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--comet-color-font-dark);
      width: 100%;
    }

    .c-select__content-suffix-items {
      align-items: center;
      display: flex;
      flex-direction: columns;
      justify-content: space-between;
      margin-left: 8px;
      position: absolute;
      right: 16px;
    }

    .c-select__content-container.--disabled .c-select__content {
      color: var(--comet-color-disabled-label);
    }

    .c-select__helper-text {
      color: var(--comet-color-font-dark);
      font-size: var(--typo-caption-size);
    }

    .c-select__helper-text::before {
      content: "";
      display: block;
      height: 0.4em;
    }

    .c-select__helper-text.--above::before {
      content: "";
      display: block;
      height: 0;
    }

    .c-select__helper-text.--above::after {
      content: "";
      display: block;
      height: 0.5em;
    }

    .c-select__helper-text.--disabled {
      color: var(--comet-color-disabled-label);
    }

    .c-select__error-message {
      color: var(--comet-color-invalid);
      font-size: var(--typo-caption-size);
    }

    .c-select__error-message::before {
      content: "";
      display: block;
      height: 0.4em;
    }

    .c-select__content-container--value {
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
    }

    .c-select__content-container--placeholder {
      color: var(--comet-color-disabled-label) !important;
    }

    .remove-icon {
      margin: 4px 6px;
      cursor: pointer;
    }

    .c-select__options-container {
      border: 1px solid var(--neutral-40);
      border-radius: 4px;
      position: absolute;
      top: 0px;
      left: 0px;
      display: none;
      line-height: var(--typo-body-line-height);
      width: 100%;
      z-index: 2;
    }

    .c-select__options-container.--show {
      display: block;
    }
  `;
}
