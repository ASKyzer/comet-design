import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/icon/comet-icon";
import {
  COMPANY_LOGOS_ICONS,
  FLAGS_ICONS,
  THREE_DIMENSIONAL_ICONS,
  UI_ICONS,
  WECONS_CIRCLE_ICONS,
  WECONS_HELIX_ICONS,
} from "../../demo/constants/icons";

const ALL_FILTERS = [
  "ui",
  "wecons-helix",
  "wecons-circle",
  "three-dimensional",
  "company-logos",
  "flags",
];

// Add this constant to map icon types to their arrays
const ICON_MAPPING = {
  ui: { title: "UI icons", icons: UI_ICONS, type: "ui" },
  "wecons-helix": {
    title: "Wecons Helix icons",
    icons: WECONS_HELIX_ICONS,
    type: "wecons-helix",
  },
  "wecons-circle": {
    title: "Wecons Circle icons",
    icons: WECONS_CIRCLE_ICONS,
    type: "wecons-circle",
  },
  "three-dimensional": {
    title: "Three-dimensional icons",
    icons: THREE_DIMENSIONAL_ICONS,
    type: "three-dimensional",
  },
  "company-logos": {
    title: "Company logos icons",
    icons: COMPANY_LOGOS_ICONS,
    type: "company-logos",
  },
  flags: { title: "Flags icons", icons: FLAGS_ICONS, type: "flags" },
};

const ICON_TYPES_FILTER_ITEMS = Object.entries(ICON_MAPPING).map(
  ([key, { title }]) => ({
    value: key,
    label: title,
  })
);

@customElement("demo-icon")
export class DemoIcon extends LitElement {
  private _primaryColor: string;
  private _secondaryColor: string;
  private _cardBackgroundColor: string;
  private _selectedFilters: string[] = [];

  constructor() {
    super();

    this._primaryColor = "#501e96";
    this._secondaryColor = "#28d7dc";
    this._cardBackgroundColor = "#ffffff";
    this._selectedFilters = ALL_FILTERS;
  }

  public get properties() {
    return {
      primaryColor: { type: String },
      secondaryColor: { type: String },
      selectedFilters: { type: Array },
    };
  }

  get primaryColor() {
    return this._primaryColor;
  }

  set primaryColor(color: string) {
    let oldVal = this._primaryColor;
    this._primaryColor = color;
    this.requestUpdate("primaryColor", oldVal);
  }

  get secondaryColor() {
    return this._secondaryColor;
  }

  set secondaryColor(color: string) {
    let oldVal = this._secondaryColor;
    this._secondaryColor = color;
    this.requestUpdate("secondaryColor", oldVal);
  }

  get selectedFilters() {
    return this._selectedFilters;
  }

  set selectedFilters(filters: string[]) {
    let oldVal = this._selectedFilters;
    this._selectedFilters = filters;
    this.requestUpdate("selectedFilters", oldVal);
  }

  get cardBackgroundColor() {
    return this._cardBackgroundColor;
  }

  set cardBackgroundColor(color: string) {
    let oldVal = this._cardBackgroundColor;
    this._cardBackgroundColor = color;
    this.requestUpdate("cardBackgroundColor", oldVal);
  }

  handlePrimaryColorChange(event: CustomEvent) {
    this.primaryColor = event.detail.color;
  }

  handleSecondaryColorChange(event: CustomEvent) {
    this.secondaryColor = event.detail.color;
  }

  handleCardBackgroundColorChange(event: CustomEvent) {
    this.cardBackgroundColor = event.detail.color;
  }

  handleFilterChange(event: CustomEvent) {
    const selected = event.detail?.map((item) => item.value);

    if (!selected?.length) {
      this.selectedFilters = ALL_FILTERS;
    } else {
      this.selectedFilters = selected;
    }
  }

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Icon</h1>

      <div class="icons-container">
        <div>
          <p>Primary color</p>
          <comet-color-picker
            theme="small"
            .initialColor=${{
              color_index: 0,
              variation_index: 4,
            }}
            @color-change="${this.handlePrimaryColorChange}"
          ></comet-color-picker>
        </div>

        <div>
          <p>Secondary color</p>
          <comet-color-picker
            theme="small"
            .initialColor=${{
              color_index: 1,
              variation_index: 4,
            }}
            @color-change="${this.handleSecondaryColorChange}"
          ></comet-color-picker>
        </div>

        <div>
          <p>Card background color</p>
          <comet-color-picker
            theme="small"
            .initialColor=${{
              color_index: 7,
              variation_index: 0,
            }}
            @color-change="${this.handleCardBackgroundColorChange}"
          ></comet-color-picker>
        </div>
      </div>

      <div style="width: 626px; margin-bottom: 48px;">
        <comet-multi-select
          style="width: 100%"
          @select-change="${this.handleFilterChange}"
          .items="${ICON_TYPES_FILTER_ITEMS}"
          label="Select Icons to display"
        ></comet-multi-select>
      </div>

      ${Object.entries(ICON_MAPPING).map(([key, { title, icons, type }]) =>
        this.selectedFilters.includes(key)
          ? html`
              <div style="margin-bottom: 56px;">
                <h2>${title}</h2>
                <div
                  style="display: flex; align-items: center; gap: 12px; width: 100%; flex-wrap: wrap"
                >
                  ${icons.map(
                    (icon) => html`
                      <div
                        style="display: flex; flex-direction: column; gap: 12px"
                      >
                        <div
                          style="
                    background-color: ${this.cardBackgroundColor};
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    padding: 16px;
                  "
                        >
                          <div
                            style="display: flex; flex-direction: column; align-items: center; gap: 12px"
                          >
                            <div style="margin-top: 12px;">
                              <comet-icon
                                name="${icon}"
                                size="48"
                                type="${type}"
                                .primaryColor=${this.primaryColor}
                                .secondaryColor=${this.secondaryColor}
                              ></comet-icon>
                            </div>
                            <span
                              style="background: white; padding: 4px 8px; border-radius: 4px; margin-top: 8px"
                              >${icon}</span
                            >
                          </div>
                        </div>
                      </div>
                    `
                  )}
                </div>
              </div>
            `
          : ""
      )}
    `;
  }

  static styles = css`
    .icons-container {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-icon": DemoIcon;
  }
}
