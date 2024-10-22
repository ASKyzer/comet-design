import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("table-sorter")
export class TableSorter extends LitElement {
  // Properties
  @property({ type: String })
  sortKey: string = "";
  @property({ type: String })
  sortValue: string = "";
  @property({ type: Object })
  column: any;

  render() {
    const sortColumn: boolean = this.sortKey === this.column.sortKey;
    return html`
      <div class="sorter-container">
        <comet-icon
          name="arrow-drop-up"
          size="18"
          class="sorter-icon-up"
          primaryColor="${sortColumn && this.sortValue === "asc"
            ? "primary-50"
            : "neutral-50"}"
          data-testid="${this.column.cell?.displayKey}-ascend-sorting-button"
          @click="${() => this._setSort(this.column.sortKey, "asc")}"
        ></comet-icon>

        <comet-icon
          name="arrow-drop-down"
          size="18"
          class="sorter-icon-down"
          primaryColor="${sortColumn && this.sortValue === "desc"
            ? "primary-50"
            : "neutral-50"}"
          data-testid="${this.column.cell?.displayKey}-descend-sorting-button"
          @click="${() => this._setSort(this.column.sortKey, "desc")}"
        ></comet-icon>
      </div>
    `;
  }

  private _setSort(sortKey: string, sortValue: string): void {
    if (this.sortKey === sortKey && this.sortValue === sortValue) {
      this.sortValue = "";
      this.sortKey = "";
    } else {
      this.sortValue = sortValue;
      this.sortKey = sortKey;
    }

    this._fetchNewData();
  }

  private _fetchNewData(): void {
    this._sendEvent("change-order", {
      sortKey: this.sortKey,
      sortValue: this.sortValue,
      sort: this.sortKey.split(","),
    });
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
    .sorter-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .sorter-container > comet-icon {
      display: flex;
      height: 10px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      overflow: hidden;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "table-sorter": TableSorter;
  }
}
