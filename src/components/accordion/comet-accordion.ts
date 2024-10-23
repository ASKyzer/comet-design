import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icon/comet-icon";
import { CometIconProps } from "../icon/icon.interface";

@customElement("comet-accordion")
export class CometAccordion extends LitElement {
  @property()
  buttonLabel: string = "";

  @property()
  content: string = "";

  @property({ type: Boolean })
  expanded = false;

  @property({ type: Object })
  icon: CometIconProps = {} as CometIconProps;

  private _iconDefault = {
    name: "",
    type: "ui",
    size: "32",
    primaryColor: "primary-50",
    secondaryColor: "secondary-20",
    src: "",
  };

  @property()
  theme: string = "";

  @property()
  title: string = "";

  @property()
  toggleType: "chevron" | "arrow" = "chevron";

  protected firstUpdated(): void {
    this.icon = { ...this._iconDefault, ...this.icon } as CometIconProps;
  }

  onToggle(): void {
    this.expanded = !this.expanded;
  }

  handleActionButtonClick() {
    this.dispatchEvent(
      new CustomEvent("on-click", {
        bubbles: true,
        composed: true,
        detail: "something",
      })
    );
  }

  render() {
    return html`
      <div
        class="c-accordion__container ${this.expanded
          ? "--expanded"
          : ""} ${this.theme} ${this.toggleType}"
        part="comet-accordion-container"
      >
        ${this._renderHeader()} ${this._renderContent()}
      </div>
    `;
  }

  private _renderHeader() {
    return html`<div
      @click=${this.onToggle}
      class="c-accordion__header flex ${this.expanded ? "--expanded" : ""}"
      part="comet-accordion-header"
    >
      <div class="c-accordion__header--left-content flex">
        ${this._renderIcon()}
        <div
          class="c-accordion__header-title"
          part="comet-accordion-header-title"
        >
          ${this.title}
        </div>
      </div>
      <div class="c-accordion__header--right-content">
        <div class="c-accordion__header-toggle-icon">
          <comet-icon
            name=${this._getToggleType()}
            primaryColor="neutral-70"
            size="24"
          ></comet-icon>
        </div>
      </div>
    </div>`;
  }

  private _getToggleType() {
    switch (this.toggleType) {
      case "chevron":
        return this.expanded ? "chevron-up" : "chevron-down";
      case "arrow":
        return this.expanded ? "arrow-drop-down" : "arrow-drop-right";
    }
  }

  private _renderIcon() {
    return html` <slot name="comet-accordion-header-icon">
      <div class="c-accordion__header-icon ${this.icon.name ? "--icon" : ""}">
        <comet-icon
          .name="${this.icon?.name}"
          primaryColor=${this.icon.primaryColor}
          secondaryColor=${this.icon.secondaryColor}
          size="${this.icon.size}"
          type="${this.icon.type}"
          src="${this.icon.src}"
        ></comet-icon>
      </div>
    </slot>`;
  }

  private _renderContent() {
    return this.expanded
      ? html`
          <slot class="c-accordion__content" name="comet-accordion-content">
            <span part="comet-accordion-content"> ${this.content} </span>
          </slot>

          ${this._renderFooter()}
        `
      : null;
  }

  private _renderFooter() {
    return this.buttonLabel
      ? html` <div class="c-accordion__footer" part="comet-accordion-footer">
          <div
            class="c-accordion__footer-content"
            @click=${this.handleActionButtonClick}
          >
            <comet-button
              label="${this.buttonLabel}"
              class="c-accordion__footer-button"
            ></comet-button>
          </div>
        </div>`
      : null;
  }

  static styles = css`
    :host {
      color: var(--neutral-80);
      font-family: var(--lumo-font-family);
    }

    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .c-accordion__container {
      max-height: 38px;
      height: 100%;
      overflow: hidden;
    }

    .c-accordion__container.--expanded {
      max-height: 1500px;
      height: 100%;
      overflow: auto;
      transition: max-height 0.5s ease-in;
    }

    .c-accordion__container.card {
      background-color: var(--neutral-0);
      border-radius: var(--spacing-md);
      box-shadow: var(--shadow-large);
      padding: var(--spacing-md);
    }

    .c-accordion__container.card.arrow {
      border-radius: var(--spacing-sm);
    }

    .c-accordion__container .c-accordion__header.--expanded {
      padding-bottom: var(--spacing-md);
    }

    .c-accordion__header {
      cursor: pointer;
    }

    .c-accordion__header-title {
      font-size: 18px;
      font-weight: var(--typo-font-weights-semibold);
    }

    .c-accordion__content {
      padding: var(--spacing-md) 0;
    }

    .c-accordion__container.card .c-accordion__content {
      padding-bottom: var(--spacing-lg);
    }

    .c-accordion__header-toggle-icon {
      cursor: pointer;
    }

    .c-accordion__header-toggle-icon comet-icon {
      display: flex;
    }

    .c-accordion__header-icon.--icon {
      margin-right: var(--spacing-md);
    }

    .c-accordion__header-icon.--icon comet-icon {
      display: flex;
    }

    .c-accordion__container.card .c-accordion__footer {
      border-top: 1px solid var(--neutral-40);
      margin-top: var(--spacing-md);
      padding-top: var(--spacing-sm);
    }

    .c-accordion__footer-button {
      margin-left: -16px;
    }
  `;
}
declare global {
  interface HTMLElementTagNameMap {
    "comet-accordion": CometAccordion;
  }
}
