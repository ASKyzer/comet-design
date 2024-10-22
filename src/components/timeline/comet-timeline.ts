import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icon/comet-icon";

export interface TimelineItem {
  id: String | Number;
  date: String;
  title: String;
  date_modifier?: String;
  content: String;
  active: Boolean;
}

@customElement("comet-timeline")
export class CometTimeline extends LitElement {
  @property({ type: Object }) item: TimelineItem;
  @property() position: "left" | "right" = "left";
  @property() theme: "left" | "centered" = "left";
  @property({ type: Boolean }) isLastItem = false;

  handleClick() {
    this.dispatchEvent(
      new CustomEvent("timeline-click", {
        bubbles: true,
        composed: true,
        detail: this.item,
      })
    );
  }

  render() {
    return html`
      <div
        part="comet-timeline-wrapper"
        class="wrapper ${this.position}"
        theme=${this.theme}
      >
        ${this.position === "left"
          ? html`<div style="pointer-events: none; cursor: default;"></div>`
          : null}
        <div @click=${this.handleClick} style="display: flex; cursor: pointer">
          ${this.position === "left" ? this._renderBullet() : null}
          <div part="comet-timeline-content" class="content">
            <div part="comet-timeline-labels" class="labels">
              <div>${this._renderLabels()}</div>
            </div>
            <div class="content-slot">
              <slot></slot>
            </div>
          </div>
          ${this.position === "right" ? this._renderBullet() : null}
        </div>
        ${this.position === "right"
          ? html`<div style="pointer-events: none; cursor: default;"></div>`
          : null}
      </div>
    `;
  }

  private _renderBullet() {
    return html`
      <div
        class="bullet-container ${this.item?.active ? "active" : ""}"
        theme=${this.theme}
      >
        ${!this.isLastItem
          ? html`<div part="comet-step-line" class="line"></div>`
          : null}
      </div>
    `;
  }

  private _renderLabels() {
    return html`
      <div>
        ${this.item?.date
          ? html`<div part="comet-timeline-caption" class="date">
              ${this.item?.date}
            </div>`
          : ""}
        ${this.item?.title
          ? html` <div class="title">
              ${this.item?.title
                ? html` <div part="comet-timeline-title" class="title">
                      ${this.item?.title}
                    </div>
                    ${this.item?.date_modifier
                      ? html`<span
                          part="comet-timeline-date-modifier"
                          class="date-modifier"
                          ><i>${this.item?.date_modifier}</i></span
                        >`
                      : null}`
                : ""}
            </div>`
          : html`<slot name="comet-timeline-title"></slot>`}
      </div>
    `;
  }

  static styles = css`
    :host {
      color: var(--neutral-90);
      font-family: var(--lumo-font-family);
    }

    .bullet-container {
      margin-top: 8px;
      margin-right: 8px;
      display: flex;
      align-items: center;
      flex-direction: column;
      min-height: calc(100% - 10px);
    }

    .right .bullet-container {
      margin-right: -8px;
    }

    .left .bullet-container {
      margin-left: -8px;
    }

    .left .bullet-container[theme~="left"] {
      margin-left: 8px;
    }

    .bullet-container::before {
      content: "";
      border-radius: 50%;
      background: var(--neutral-80);
      display: inline-block;
      height: 16px;
      outline-style: solid;
      outline-width: 10px;
      outline-color: var(--neutral-20);
      width: 16px;
    }

    .bullet-container.active::before {
      animation: outlineAnimation 0.755s infinite alternate;
      background: var(--primary-80);
      outline-color: var(--primary-20);
    }

    .title {
      color: var(--neutral-100);
      display: flex;
      font-weight: var(--typo-font-weights-bold);
      margin-bottom: 8px;
    }

    .right .title {
      justify-content: flex-end;
    }

    .right .date {
      text-align: right;
    }

    .date-modifier {
      margin-left: 8px;
      border-left: 1px solid var(--neutral-60);
      padding-left: 8px;
    }

    .wrapper {
      font-family: var(--lumo-font-family);
      display: grid;
    }

    .wrapper[theme~="centered"] {
      grid-template-columns: 1fr 1fr;
    }

    .content-slot {
      line-height: 1.6;
      min-height: 48px;
      padding-bottom: 24px;
    }

    .right .content-slot {
      text-align: right;
      margin-right: 16px;
    }

    .content {
      margin-left: 16px;
      width: 100%;
    }

    .right .content {
      margin-left: 0;
      margin-right: 16px;
    }

    .right .labels {
      margin-right: 16px;
      text-align: right;
    }

    .line {
      height: calc(100% - 48px);
      border: 2px dashed var(--neutral-30);
      margin-top: 16px;
      margin-right: 2px;
    }

    .date {
      color: var(--primary-50);
      margin-bottom: 8px;
      margin-top: 8px;
      font-weight: var(--typo-font-weights-bold);
      font-size: 18px;
      line-height: 16px;
    }

    @keyframes outlineAnimation {
      from {
        outline-width: 0;
      }
      to {
        outline-width: 10px;
      }
    }
  `;
}
