import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("table-expandable-content")
export class TableExpandableContent extends LitElement {
  // Properties
  @property({ type: String })
  expandableType: string;
  @property()
  expandableConfig: any;

  render() {
    return this._renderExpandableContent();
  }

  private _renderExpandableContent() {
    switch (this.expandableType) {
      case "EXPANDABLE_ADDITIONAL_COLUMNS":
        return this._additionalColumnsTemplate();
        break;
      case "EXPANDABLE_INFO_BANNER":
        return this._bannerRowTemplate();
        break;
      default:
        return "";
        break;
    }
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);

    if (this.expandableType === "EXPANDABLE_INFO_BANNER") {
      setTimeout(() => {
        const aElement = this.shadowRoot.querySelector(
          `#${this.expandableConfig.linkId}`
        );
        aElement?.addEventListener("click", this.expandableConfig.linkAction);
      });
    }
  }

  private _additionalColumnsTemplate() {
    return html`
      <div class="expandable-row">
        ${this.expandableConfig.map(({ value, header }) => {
          return html`
            <div class="expandable-column">
              <span class="header-cell">${header}</span>
              <span>${value}</span>
            </div>
          `;
        })}
      </div>
    `;
  }

  private _bannerRowTemplate() {
    return html`
      <comet-banner
        id="firstCometBanner"
        .hasCloseButton=${false}
        .hasIcon="${true}"
        .theme=${this.expandableConfig.type}
      >
        <div .innerHTML=${this.expandableConfig.content}></div>
      </comet-banner>
    `;
  }

  static styles = css`
    .header-cell {
      color: var(--primary-60, #3d127a);
      font-variant-numeric: lining-nums tabular-nums;
      font-family: Kyn;
      font-size: 16px;
      font-style: normal;
      font-weight: var(--typo-font-weights-semibold);
      line-height: 24px;
      align-items: center;
    }

    .expandable-row {
      display: flex;
      gap: var(--spacing-xxjumbo);
    }

    .expandable-column {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-s);
    }

    comet-banner a {
      cursor: pointer;
      font-weight: bold;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "table-expandable-content": TableExpandableContent;
  }
}
