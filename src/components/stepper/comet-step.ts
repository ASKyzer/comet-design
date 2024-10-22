import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icon/comet-icon";
import StepperStep from "./interfaces/stepper-step.interface";

@customElement("comet-step")
export class CometStep extends LitElement {
  @property({ type: Object })
  step: StepperStep | undefined;

  @property()
  theme: "horizontal" | "vertical" = "vertical";

  @property({ type: Boolean })
  isLastStep = false;

  getIconName() {
    if (this.step?.done) {
      return "step-done";
    }
    return "step-next";
  }

  getStyles() {
    if (this.theme === "horizontal") {
      return (
        "" +
        (this.step?.done ? "done" : "") +
        " " +
        (this.step?.current ? "current" : "")
      );
    }

    return "";
  }

  getIconColor() {
    if (this.step.done || this.step.current) {
      return "primary-50";
    }

    return "neutral-50";
  }

  render() {
    return html`
      ${this.theme === "horizontal"
        ? this._renderThemeHorizontal()
        : this._renderThemeVertical()}
    `;
  }

  private _renderThemeHorizontal() {
    return html`
      <div
        class="container ${this.theme} ${this.step.caption ? "" : "no-caption"}"
      >
        ${this._renderIcons()}

        <div
          class="horizontal-labels-container ${this.isLastStep
            ? "last"
            : ""} ${this.step.caption ? "" : "no-caption"}"
        >
          ${this._renderLabels()}
        </div>
      </div>
    `;
  }

  private _renderThemeVertical() {
    return html`
      <div class="${this.theme}">
        <div style="display: flex; position: relative;">
          ${this._renderIcons()}
          <div part="comet-step-content" class="content">
            <div part="comet-step-labels" class="labels">
              <div>${this._renderLabels()}</div>
              <div part="comet-step-helper-text" class="helper-text">
                ${this.step?.helperText}
              </div>
            </div>
            <div>
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderIcons() {
    return html`
      <div class="icon-container ${this.isLastStep ? "--last" : ""}">
        <slot name="comet-step-icon">
          <comet-icon
            type="ui"
            name="${this.getIconName()}"
            class="icon ${this.getStyles()}"
            part="comet-step-icon"
            size="34"
            primaryColor="${this.getIconColor()}"
          ></comet-icon>
        </slot>
        ${!this.isLastStep
          ? html`<div
              part="comet-step-line"
              class="line ${this.getStyles()}"
            ></div>`
          : null}
      </div>
    `;
  }

  private _renderLabels() {
    return html`
      ${this.step?.caption
        ? html`<div
            part="comet-step-caption"
            class="caption ${this.getStyles()}"
          >
            ${this.step?.caption}
          </div>`
        : ""}
      ${this.step?.description
        ? html` <div
            part="comet-step-description"
            class="description ${this.getStyles()}"
          >
            ${this.step?.description}
          </div>`
        : ""}
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .container.horizontal {
      width: 100%;
      position: relative;
      padding-bottom: 48px;
    }

    .container.horizontal.no-caption {
      padding-bottom: 24px;
    }

    .horizontal-labels-container {
      position: absolute;
      top: 20px;
      left: 0;
    }

    .horizontal-labels-container.no-caption {
      top: 24px;
    }

    .horizontal-labels-container.last {
      left: unset;
      right: 0;
      text-align: right;
    }

    .vertical comet-icon {
      margin-bottom: 4px;
    }

    .horizontal .icon-container.--last {
      justify-content: flex-end;
    }

    .vertical,
    .horizontal {
      font-family: var(--lumo-font-family);
      width: 100%;
    }

    .vertical .icon-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .vertical .content {
      margin-left: 16px;
      width: 100%;
    }

    .vertical .labels {
      display: flex;
      justify-content: space-between;
    }

    .vertical .line {
      width: 4px;
      height: 100%;
      border-radius: 8px;
      background-color: var(--primary-50);
    }

    .vertical .caption {
      color: var(--neutral-100);
      margin-top: 4px;
      font-weight: 600;
      line-height: 16px;
    }

    .vertical .helper-text {
      color: var(--primary-50);
      align-self: flex-end;
    }

    .vertical .description {
      margin-top: 8px;
      color: var(--primary-80);
      font-weight: 600;
    }

    .horizontal .icon-container {
      display: flex;
      align-items: center;
    }

    .horizontal .line {
      width: 100%;
      height: 8px;
      border-radius: 8px;
      margin-left: 16px;
      margin-right: 16px;
      background: var(--neutral-40);
    }

    .horizontal .line.done {
      background-color: var(--primary-50);
    }

    .horizontal .caption {
      margin-top: 16px;
      font-family: "Kyn";
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      text-transform: uppercase;
      font-feature-settings: "tnum" on, "lnum" on;
      color: var(--neutral-50);
    }

    .horizontal .caption.done,
    .horizontal .caption.current {
      color: var(--neutral-70);
    }

    .horizontal .description {
      margin-top: 8px;
      font-family: "Kyn";
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: var(--primary-80);
    }

    .horizontal .description.current {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-step": CometStep;
  }
}
