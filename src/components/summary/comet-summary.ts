import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { when } from "lit/directives/when.js";
import "../icon/comet-icon";
import { SummaryData } from "./interfaces/summary-data";
import "./ui/download-section";

@customElement("comet-summary")
export class CometSummary extends LitElement {
  @property()
  title = "";

  @property()
  iconType:
    | "ui"
    | "wecons-helix"
    | "wecons-circle"
    | "three-dimensional"
    | "url"
    | "flags" = "three-dimensional";

  @property()
  icon = "";

  @property()
  totalLabel = "";

  @property()
  total = "";

  @property({ type: Object })
  data: SummaryData = {
    lines: [],
    downloadData: undefined,
  };

  render() {
    return html`
      <vaadin-vertical-layout
        part="comet-summary-container"
        class="main"
        theme="spacing"
      >
        ${this.title
          ? html`
              <vaadin-horizontal-layout
                class="header"
                style="vertical-align: center;"
              >
                <comet-icon
                  type="${this.iconType}"
                  name="${this.icon}"
                  data-testid="summary-icon"
                ></comet-icon>
                <div class="title" data-testid="summary-title">
                  ${this.title}
                </div>
              </vaadin-horizontal-layout>
            `
          : ""}
        <vaadin-vertical-layout class="content">
          ${this.data.lines.map(
            (l, index) => html`
              <vaadin-horizontal-layout
                class="line ${l.startsGroup ? "startsGroup" : ""}"
              >
                <div class="label" data-testid=${`summary-label-${index}`}>
                  ${l.label}
                </div>
                <div class="value" data-testid=${`summary-value-${index}`}>
                  ${l.value ?? "-"}
                </div>
              </vaadin-horizontal-layout>
            `
          )}
        </vaadin-vertical-layout>
        ${when(
          this.total,
          () => html`
            <vaadin-horizontal-layout class="price">
              <div class="label" data-testid="summary-total-label">
                ${this.totalLabel}
              </div>
              <strong class="value" data-testid="summary-total"
                >${this.total}</strong
              >
            </vaadin-horizontal-layout>
          `
        )}
        ${when(
          this.data.downloadData,
          () =>
            html`<download-section
              .data="${this.data.downloadData}"
            ></download-section>`
        )}
      </vaadin-vertical-layout>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .content {
      border: 1px solid var(--neutral-20);
      border-radius: 4px;
      width: 100%;
      padding: 10px;
    }

    .main {
      background-color: var(--neutral-0);
      border: 1px solid var(--neutral-20);
      border-radius: 8px;
      box-shadow: 0px 2px 4px rgba(51, 55, 66, 0.04),
        0px 4px 8px rgba(51, 55, 66, 0.04), 0px 4px 12px rgba(51, 55, 66, 0.02);
      padding: 16px;
    }

    .header {
      display: flex;
      width: 100%;
      padding-bottom: 6px;
    }

    .title {
      flex-grow: 2;
      color: var(--neutral-100, #242424);
      font-size: 17px;
      margin: auto;
      font-weight: 700;
      margin-left: 8px;
    }

    .line,
    .total {
      width: 100%;
      padding-top: 4px;
      padding-bottom: 4px;
    }

    .label {
      /* Body/Small Semibold */
      font-size: 14px;
      font-family: Kyn;
      margin: auto;
      font-weight: 400;
    }

    .value {
      flex-grow: 2;
      text-align: right;
      font-weight: 400;
      font-size: 14px;
      margin: auto;
      color: var(--primary-50, #3d127a);
    }

    .price {
      width: 100%;

      color: var(--primary-50, #3d127a);
      font-size: 16px;
      font-weight: 600;
    }
  `;
}
