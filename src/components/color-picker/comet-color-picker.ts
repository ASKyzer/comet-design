import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { COMET_COLORS, MATERIAL_COLORS } from "../../demo/constants/colors";

interface ColorPalette {
  color: string;
  variations: { weight: number; hex: string }[];
}

export interface TextColorConfig {
  palette: "comet" | "material";
  theme: "small" | "default";
}

interface ColorIndex {
  color_index: number;
  variation_index: number;
}

@customElement("comet-color-picker")
export class CometColorPicker extends LitElement {
  @property({ type: Object }) public initialColor: ColorIndex = null;
  @property() public palette: TextColorConfig["palette"] = "comet";
  @property() public theme: TextColorConfig["theme"] = "default";

  @state() currentColor: string;
  @state() selectedColorGroup;
  @state() variationIndex;
  @state() middleColors = [];

  public defaultColor: string;
  public defaultTextColor: { color_index: number; variation_index: number };
  public textColors: ColorPalette[];

  constructor() {
    super();
  }

  firstUpdated(): void {
    const isComet = this.palette === "comet";

    this.textColors = isComet ? COMET_COLORS : MATERIAL_COLORS;
    this.defaultTextColor = this.initialColor
      ? this.initialColor
      : {
          color_index: isComet ? 0 : 17,
          variation_index: isComet ? 8 : 9,
        };
    this.selectedColorGroup = this.defaultTextColor.color_index;
    this.defaultColor =
      this.textColors[this.selectedColorGroup].variations[
        this.defaultTextColor.variation_index
      ].hex;
    this.currentColor = this.defaultColor;
    this.variationIndex = this.textColors[
      this.selectedColorGroup
    ].variations.findIndex((v) => v.hex === this.currentColor);

    this.emitChange();
  }

  emitChange(close = true) {
    this.dispatchEvent(
      new CustomEvent("color-change", {
        bubbles: true,
        composed: true,
        detail: {
          color: this.currentColor,
          color_index: this.selectedColorGroup,
          variation_index: this.variationIndex,
          close,
        },
      })
    );
  }

  public setColor(hex) {
    this.currentColor = hex;
    const group = this.textColors?.find((colorGroup, i) => {
      const variationIndex = colorGroup.variations.findIndex(
        (v) => v.hex === hex
      );
      this.variationIndex = variationIndex;
      return variationIndex !== -1;
    });
    this.selectedColorGroup = this.textColors?.findIndex(
      (c) => c.color === group?.color
    );
  }

  render() {
    return html`
      <div
        theme=${this.theme}
        palette=${this.palette}
        id="text-colors-container"
        class="text-colors-container"
      >
        <div>
          <div class="color-group-container">
            ${this.textColors?.map((h, i) => {
              const mid = h.variations[4];
              return html`
                <div
                  class="highlight-item"
                  @click="${() => {
                    this.currentColor = mid.hex;
                    this.variationIndex = 4;
                    this.selectedColorGroup = i;
                    this.emitChange(false);
                  }}"
                >
                  <div
                    class="color-group-item"
                    style="background-color: ${mid.hex}; outline-color: ${this
                      .selectedColorGroup === i
                      ? mid.hex
                      : "none"} "
                    selected=${this.selectedColorGroup === i}
                  ></div>
                </div>
              `;
            })}
            <div class="highlight-item">
              <div
                @click="${() => {
                  this.currentColor = this.defaultColor;
                  this.variationIndex = this.defaultTextColor.variation_index;
                  this.selectedColorGroup = this.defaultTextColor.color_index;
                  this.emitChange();
                }}"
                class="color-group-item clear"
                style="background-color: transparent; position: relative;"
              >
                <span class="text-color-slash">/</span>
              </div>
            </div>
          </div>
        </div>
        <div class="color-scale-container">
          ${this.textColors?.[this.selectedColorGroup]?.variations?.map(
            (c, idx) => {
              return html`<div
                class="color-scale-item"
                style="background-color: ${c.hex}"
                selected=${this.currentColor === c.hex}
                @click="${() => {
                  this.currentColor = c.hex;
                  this.variationIndex = idx;
                  this.emitChange();
                }}"
              ></div> `;
            }
          )}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .text-colors-container {
      background-color: var(--neutral-0);
      border: 1px solid var(--neutral-40);
      border-radius: 12px;
      box-shadow: var(--shadow-default);
      display: flex;
      width: fit-content;
    }

    .text-color {
      border: 1px solid var(--neutral-60);
      border-radius: 50%;
      height: 18px;
      margin-top: var(--spacing-xxs);
      padding-left: 0;
      width: 18px;
    }

    .color-group-container {
      display: grid;
      gap: 12px;
      padding: var(--spacing-md);
    }

    [palette~="material"] .color-group-container {
      grid-template-columns: repeat(2, 1fr);
    }

    [theme~="small"] .color-group-container {
      gap: 6px;
      padding: var(--spacing-s);
    }

    [palette~="comet"][theme~="small"] .color-group-container {
      grid-template-columns: repeat(2, 1fr);
    }

    [palette~="material"][theme~="small"] .color-group-container {
      grid-template-columns: repeat(3, 1fr);
    }

    .color-group-item {
      border-radius: 50%;
      cursor: pointer;
      height: var(--spacing-xl);
      outline-offset: -2px;
      transform: scale(1);
      transition: all 0.2s ease;
      width: var(--spacing-xl);
    }

    [theme~="small"] .color-group-item {
      width: 16px;
      height: 16px;
    }

    .color-group-item[selected~="true"] {
      border-radius: 50%;
      outline: var(--spacing-xxs) solid;
      outline-offset: 6px;
      transform: scale(0.8);
    }

    [theme~="small"] .color-group-item[selected~="true"] {
      outline-offset: 4px;
    }

    .color-group-item.clear {
      background-color: transparent;
      border: 1px solid var(--neutral-60);
      overflow: hidden;
      position: relative;
      transform: rotate(20deg);
    }

    .text-color-slash {
      color: var(--danger-50);
      font-size: 32px;
      left: var(--spacing-xxs);
      overflow: hidden;
      position: absolute;
      top: -7px;
    }

    [theme~="small"] .text-color-slash {
      font-size: 21px;
      left: 4px;
      top: -5px;
    }

    .color-scale-container {
      border-left: 3px solid var(--neutral-40);
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: var(--spacing-md) var(--spacing-xl);
    }

    [theme~="small"] .color-scale-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      padding: var(--spacing-s);
    }

    .color-scale-item {
      border: 1px solid var(--neutral-40);
      border-radius: var(--spacing-xs);
      cursor: pointer;
      height: var(--spacing-md);
      padding: var(--spacing-xs);
      width: 100px;
      transform: scale(1);
      transition: all 0.2s ease;
    }

    [theme~="small"] .color-scale-item {
      width: 14px;
      height: 14px;
    }

    .color-scale-item:hover,
    .color-scale-item[selected~="true"] {
      transform: scale(1.1);
    }

    [theme~="small"] .color-scale-item:hover,
    [theme~="small"] .color-scale-item[selected~="true"] {
      transform: scale(1.15);
    }
  `;
}
