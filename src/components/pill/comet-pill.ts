import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("comet-pill")
export class CustomPill extends LitElement {
  @property({ type: String }) public label = "";
  @property({ type: String }) public theme = "primary light";
  @property() iconTheme:
    | "ui"
    | "flags"
    | "wecons-helix"
    | "wecons-circle"
    | "three-dimensional" = "ui";
  @property() public leadingIcon: string = "";
  @property() public trailingIcon: string = "";
  @property({ type: Boolean }) public selectable = false;
  @property() public size: "small" | "default" | "large" = "default";

  render() {
    return html`
      <button
        class="c-pill--container ${this.selectable ? "selectable" : ""} ${!this
          .label
          ? "-icon-only"
          : ""}"
        role=${this.selectable ? "button" : "presentation"}
        tabindex=${this.selectable ? "0" : ""}
        theme="${this.theme}"
        color="${this.theme}"
        size="${this.size}"
      >
        ${this._renderLeadingIcon(this.leadingIcon)}
        <span class="c-pill--label">${this.label}</span>
        ${this._renderTrailingIcon(this.trailingIcon)}
      </button>
    `;
  }

  private _renderLeadingIcon(icon: string) {
    return html`
      <slot name="c-pill--leading-icon"> ${this._renderIcon(icon)} </slot>
    `;
  }

  private _renderTrailingIcon(icon: string) {
    return html`
      <slot name="c-pill--trailing-icon"> ${this._renderIcon(icon)} </slot>
    `;
  }

  private _renderIcon(icon: string) {
    return html`${icon
      ? html`<comet-icon
          class="c-pill--icon"
          name="${icon}"
          type="${this.iconTheme}"
          size="${this.size === "small" ? "20" : "28"}"
          primaryColor="${this.theme?.includes("default")
            ? "primary-50"
            : "neutral-0"}"
          secondaryColor="${this.theme?.includes("default")
            ? "secondary-40"
            : "transparent"}"
        ></comet-icon>`
      : null} `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
      display: block;
      width: fit-content;
    }

    .c-pill--container {
      all: unset;
      display: inline-flex;
      padding: 8px 16px;
      justify-content: center;
      align-items: center;
      gap: 8px;
      border-radius: 100px;
      font-size: var(--typo-body-size);
      font-style: normal;
      font-weight: var(--typo-font-weights-semibold);
      height: auto;
      line-height: var(--typo-body-line-height);
      min-height: 30px;
      transition: background-color 0.3s;
      cursor: default;
    }

    .c-pill--label {
      word-break: break-word;
    }

    .c-pill--container[size~="small"] {
      min-height: 20px;
      padding: 6px 16px;
    }

    .c-pill--container[size~="large"] {
      min-height: 40px;
      padding: 8px 24px;
    }

    .c-pill--container.selectable {
      cursor: pointer;
    }

    .c-pill--container.-icon-only {
      align-content: center;
    }

    .c-pill--container[theme~="default"] {
      background-color: var(--neutral-0);
      color: var(--primary-50);
      box-shadow: 0 1px 3px rgba(51, 55, 66, 0.06),
        0 2px 6px rgba(51, 55, 66, 0.02);
      outline: 1px solid var(--primary-50);
    }

    .c-pill--container.selectable:focus-visible {
      outline: -webkit-focus-ring-color auto 1px !important;
    }

    .c-pill--container[theme~="default"].selectable:hover {
      background-color: var(--neutral-10);
    }

    .c-pill--container[color~="primary"][theme~="dark"] {
      outline: 1px solid var(--primary-50);
      background-color: var(--primary-50);
      color: var(--neutral-0);
    }

    .c-pill--container[color~="primary"][theme~="dark"].selectable:hover {
      background-color: var(--primary-70);
    }

    .c-pill--container[color~="primary"][theme~="light"] {
      outline: 1px solid #9086df;
      background-color: #9086df;
      color: var(--neutral-0);
    }

    .c-pill--container[color~="secondary"][theme~="dark"] {
      background-color: var(--secondary-70);
      outline: 1px solid var(--gradients-gred, var(--secondary-70));
      color: var(--neutral-0);
    }

    .c-pill--container[color~="secondary"][theme~="dark"].selectable:hover {
      background-color: var(--secondary-80);
    }

    .c-pill--container[color~="secondary"][theme~="light"] {
      outline: 1px solid var(--secondary-40);
      background-color: var(--secondary-40);
      color: var(--neutral-0);
    }

    .c-pill--container[color~="secondary"][theme~="light"].selectable:hover {
      background-color: var(--secondary-50);
    }

    .c-pill--icon {
      display: flex;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-pill": CustomPill;
  }
}
