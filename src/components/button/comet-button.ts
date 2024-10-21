import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("comet-button")
export class CometButton extends LitElement {
  @property({ type: Boolean }) disabled = false;
  @property() theme: string = "";

  @property() iconTheme:
    | "ui"
    | "flags"
    | "wecons-helix"
    | "wecons-circle"
    | "three-dimensional" = "ui";

  @property() leadingIcon: string = "";

  @property() size: "normal" | "small" | "large" = "normal";

  @property() trailingIcon: string = "";

  @property() label: string = "";

  render() {
    return html`
      <button
        ?disabled="${this.disabled}"
        type="button"
        part="comet-button-container"
        class="c-button c-button--subtle c-button--size-${this.size}
      ${this.leadingIcon || this.trailingIcon ? "c-button--icon" : ""}  ${!this
          .label
          ? "-icon-only"
          : ""} ${this.theme === "flushed" ? "c-button--flushed" : ""}
      "
      >
        <div class="c-button__content ${!this.label ? "-icon-only" : ""}">
          ${this._renderLeadingIcon(this.leadingIcon)} ${this._renderLabel()}
          ${this._renderTrailingIcon(this.trailingIcon)}
          <slot name="comet-button-trailing-icon"></slot>
        </div>
      </button>
    `;
  }

  private getIconSize(size: string) {
    if (this.label) {
      return "24";
    }
    return size === "small" ? "26" : "40";
  }

  private _renderLeadingIcon(icon: string) {
    return html`
      <slot name="comet-button-leading-icon"> ${this._renderIcon(icon)} </slot>
    `;
  }

  private _renderTrailingIcon(icon: string) {
    return html`
      <slot name="comet-button-trailing-icon-">
        ${this._renderIcon(icon)}
      </slot>
    `;
  }

  private _renderIcon(icon: string) {
    return html`${icon
      ? html`<comet-icon
          name="${icon}"
          type="${this.iconTheme}"
          size="${this.getIconSize(this.size)}"
          primaryColor="${this.disabled ? "neutral-60" : "primary-50"}"
          secondaryColor="${this.disabled ? "neutral-40" : "secondary-40"}"
        ></comet-icon>`
      : null} `;
  }

  private _renderLabel() {
    if (!this.label) return null;

    return html`
      <div class="c-button__label ${this.disabled ? "-disabled" : ""}">
        ${this.label}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: fit-content;
    }

    .c-button {
      background-color: var(--neutral-0);
      border-radius: var(--spacing-xl);
      box-shadow: 0 1px 3px rgba(51, 55, 66, 0.06),
        0 2px 6px rgba(51, 55, 66, 0.02);
      box-sizing: border-box;
      color: var(--primary-50);
      cursor: pointer;
      display: flex;
      align-items: center;
      font-family: var(--lumo-font-family);
      font-weight: var(--typo-font-weights-semibold);
      font-size: var(--typo-body-size);
      height: 56px;
      padding: var(--spacing-md);
      margin: 4px 0;
      transition: 0.2s ease-in-out;
      width: 100%;
    }

    .c-button.c-button--size-small {
      height: 40px !important;
    }

    .c-button:disabled {
      border: 0 !important;
      box-shadow: none !important;
      color: var(--neutral-60) !important;
      pointer-events: none !important;
    }

    .c-button .c-button__content {
      display: flex;
      flex-direction: row;
      gap: var(--spacing-xs);
      justify-content: center;
      align-items: center;
      white-space: nowrap;
    }

    .c-button--subtle {
      background-color: transparent;
      box-shadow: none;
      border: 0;
      color: var(--neutral-70);
    }

    .c-button--subtle.-icon-only {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .c-button--subtle:hover {
      color: var(--neutral-100);
    }

    .c-button--subtle:active {
      color: var(--neutral-100);
    }
    .c-button--subtle:focus {
      color: var(--primary-50);
    }

    .c-button--subtle:disabled {
      color: var(--neutral-50) !important;
    }

    .c-button--subtle:not([disabled]) > .c-button__content::after {
      background-color: var(--secondary-50);
      bottom: -4px;
      content: "";
      height: 2px;
      left: 0;
      position: absolute;
      -webkit-transform-origin: bottom right;
      -ms-transform-origin: bottom right;
      transform-origin: bottom right;
      -webkit-transition: 0.2s ease-in-out;
      -o-transition: 0.2s ease-in-out;
      transition: 0.2s ease-in-out;
      width: 100%;
    }

    .c-button--subtle > .c-button__content {
      position: relative;
    }

    .c-button__content.-icon-only {
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
    }

    .c-button--subtle > .c-button__content.-icon-only::after {
      display: none !important;
    }

    .c-button--subtle > .c-button__content:hover::after {
      transform: scaleX(0);
      transform-origin: bottom right;
    }

    .c-button--subtle > .c-button__content:disabled {
      color: var(--comet-color-disabled);
    }

    .c-button--size-small {
      padding: var(--spacing-xs) var(--spacing-md);
    }

    .c-button--size-small.c-button--icon {
      padding: 0 var(--spacing-md);
    }

    .c-button--size-large {
      padding: var(--spacing-md) var(--spacing-xl);
    }

    .c-button--size-large.c-button--icon {
      padding: 0 var(--spacing-xl);
    }

    .c-button--size-default {
      padding: var(--spacing-md);
    }

    .c-button--size-default.c-button--icon {
      padding: 0 var(--spacing-md);
    }

    .c-button__label.-disabled {
      color: var(--neutral-60);
    }

    .c-button--flushed,
    .c-button--size-small.c-button--flushed,
    .c-button--size-large.c-button--flushed {
      padding-left: 0;
      padding-right: 0;
    }
  `;
}
