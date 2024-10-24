import { css, html, LitElement, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getIconsMap } from "./icon-sets";

@customElement("comet-icon")
export class CometIcon extends LitElement {
  public wefoxIconCDNUrl =
    "https://cdn-web.wefox.com/public/pkg/@wefox/icons/1.7.6/";

  @state()
  protected _src = "";

  private iconsMap: Record<string, SVGElement> | null = null;

  @property({ type: String })
  public set name(value: string) {
    const oldValue = this._name;
    this._name = value;
    if (oldValue !== value) {
      this._updateSrc();
    }
  }
  public get name(): string {
    return this._name;
  }
  private _name = "";

  @property({ type: String })
  public primaryColor = "primary-50";

  @property({ type: String })
  secondaryColor = "secondary-40";

  @property({ type: String })
  type:
    | "ui"
    | "wecons-helix"
    | "wecons-circle"
    | "three-dimensional"
    | "url"
    | "flags"
    | "company-logos" = "ui";

  @property({ type: String })
  size = "32";

  @property({ type: String })
  src = "";

  @state()
  private iconsLoaded = false;

  async connectedCallback() {
    super.connectedCallback();
    await this.loadIcons();
    this._updateSrc();
  }

  async loadIcons() {
    this.iconsMap = await getIconsMap();
    this.iconsLoaded = true;
    this.requestUpdate();
  }

  private _updateSrc() {
    this._src = `${this.wefoxIconCDNUrl}svg/${this.type}/${this.name}.svg`;
  }

  getSvgSymbolId = () => {
    return (
      this.type +
      "-" +
      (this.type === "flags" ? this.name.toUpperCase() : this.name)
    );
  };

  getStyles() {
    return `--icon-primary-color: ${
      this._isCometColor(this.primaryColor)
        ? `var(--${this.primaryColor})`
        : this.primaryColor
    }; --icon-secondary-color: ${
      this._isCometColor(this.secondaryColor)
        ? `var(--${this.secondaryColor})`
        : this.secondaryColor
    }`;
  }

  private _isCometColor(color: string): boolean {
    const cometColorsBase = [
      "primary",
      "secondary",
      "neutral",
      "danger",
      "success",
      "info",
      "warning",
      "tertiary",
    ];

    if (cometColorsBase.find((c) => c === color.split("-")[0])) {
      return true;
    }
    return false;
  }

  render() {
    if (!this.iconsLoaded) {
      return;
    }

    if (this.type === "url" && this.src) {
      return html`
        <img
          part="comet-icon-img"
          src="${this.src}"
          height="${this.size}"
          width="${this.size}"
          alt="${this.name}"
        />
      `;
    } else if (this.name) {
      return html`
        ${this.type === "three-dimensional" ||
        this.type === "flags" ||
        this.type === "company-logos"
          ? html` <img
              part="comet-icon-img"
              src="${this._src}"
              height="${this.size}"
              width="${this.size}"
              alt="${this.name}"
            />`
          : html` <svg
              xmlns="http://www.w3.org/2000/svg"
              width="${this.size}px"
              height="${this.size}px"
              viewBox="0 0 ${this.size} ${this.size}"
              style="${this.getStyles()}"
            >
              ${this.renderDefs()}
              <use href="#${this.getSvgSymbolId()}"></use>
            </svg>`}
      `;
    } else {
      return "";
    }
  }

  renderDefs() {
    return html`<defs>
      ${svg`${(<any>this.iconsMap)[this.getSvgSymbolId()]?.cloneNode(true)}`}
    </defs>`;
  }

  static styles = css`
    :host {
      display: flex;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-icon": CometIcon;
  }
}
