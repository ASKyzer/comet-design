import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("comet-default-button")
export class CometDefaultButton extends LitElement {
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) disableIconColor = false;
  @property() iconSize: string = "";
  @property() iconTheme:
    | "ui"
    | "flags"
    | "wecons-helix"
    | "wecons-circle"
    | "three-dimensional" = "ui";
  @property() leadingIcon: string = "";
  @property() primaryColor: string = "primary-50";
  @property() secondaryColor: string = "secondary-40";
  @property() size: "small" | "large" | "" = "";
  @property() trailingIcon: string = "";

  @state() focused = false;
  @state() iconOnly = false;

  firstUpdated(): void {
    const button = this.shadowRoot.getElementById("trigger-btn");
    button?.addEventListener("focus", () => (this.focused = true));
    button?.addEventListener("blur", () => (this.focused = false));

    const slot = this.shadowRoot.querySelector("#label") as any;
    if (slot?.assignedNodes()?.length === 0) this.iconOnly = true;
  }

  render() {
    return html`
      <vaadin-button
        theme="default ${this.size} ${this.iconOnly ? "icon" : ""}"
        .disabled=${this.disabled}
        id="trigger-btn"
      >
        ${this._renderIcon(this.leadingIcon, "prefix")}
        <slot id="label"></slot> ${this._renderIcon(
          this.trailingIcon,
          "suffix"
        )}
      </vaadin-button>
    `;
  }

  private _getIconSize() {
    if (this.iconSize) return this.iconSize;

    switch (this.size) {
      case "small":
        return this.iconOnly ? 24 : 22;
        break;
      case "large":
        return this.iconOnly ? 34 : 32;
        break;
      default:
        return this.iconOnly ? 36 : 28;
    }
  }

  private _renderIcon(icon, position) {
    if (!icon) return null;

    return html`<comet-icon
      class="${this.disabled && this.disableIconColor ? "grayscale" : ""}"
      slot="${position}"
      name="${icon}"
      type="${this.iconTheme}"
      size="${this._getIconSize()}"
      primaryColor="${this._setColor(this.primaryColor, true)}"
      secondaryColor="${this._setColor(this.secondaryColor, false)}"
    ></comet-icon>`;
  }

  private _setColor(color: string, primary: boolean) {
    if (this.iconTheme === "wecons-circle") {
      if (this.disableIconColor) return primary ? "neutral-60" : "neutral-40";
      return this.focused ? (primary ? "neutral-0" : color) : color;
    }

    if (this.disabled) return "neutral-60";

    return this.focused ? "neutral-0" : color;
  }

  static styles = css`
    .grayscale::part(comet-icon-img) {
      filter: grayscale(1);
      opacity: 0.6;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-default-button": CometDefaultButton;
  }
}
