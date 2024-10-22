import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../icon/comet-icon";
import "./comet-sidebar-menu-options";
import { MenuIndex } from "./interfaces/sidebar-index.interface";
import { SidebarItem } from "./interfaces/sidebar-item.interface";

@customElement("comet-sidebar-menu")
export class CometSidebarMenu extends LitElement {
  @state()
  protected _selectedItem: SidebarItem | undefined;

  @state()
  protected _isVisible: boolean = true;

  protected _clickEventListener: EventListener;

  @property({ type: Object })
  protected selectedItem: SidebarItem | undefined;

  @property({ type: String })
  protected actualRoute: string = "";

  @property({ type: Object })
  protected menuIndex: MenuIndex = { index: undefined, child: undefined };

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.handleClick);
    super.disconnectedCallback();
  }

  handleClick = (event: any) => {
    this._isVisible = false;

    if (
      event.composedPath().includes(this.previousElementSibling) ||
      event.composedPath().includes(this)
    ) {
      this._isVisible = true;
    }
  };

  selectItem(item: SidebarItem, index: number) {
    if (item.disabled) return;
    if (this.menuIndex.index === index && this._selectedItem) {
      // unselect item
      this._selectedItem = undefined;
      this.menuIndex.index = undefined;
      return;
    }
    if (this.menuIndex.index !== index) {
      this.menuIndex.child = { index: undefined, child: undefined };
    }
    this._selectedItem = { ...item };
    this.menuIndex.index = index;
    if (!this._selectedItem.options) {
      this.dispatchEvent(
        new CustomEvent("navigate", {
          bubbles: true,
          composed: true,
          detail: item,
        })
      );
    }
  }

  getClasses(item: SidebarItem): string {
    return item.disabled ? "disabled" : this.isActive(item) ? "active" : "";
  }

  getIconColor(item: SidebarItem): string {
    return item.disabled
      ? "neutral-60"
      : this.isActive(item)
      ? "neutral-0"
      : "neutral-80";
  }

  isActive(item: SidebarItem): boolean {
    if (!item.options || item.options.length === 0) {
      return item.router_link
        ? this.actualRoute.includes(item.router_link)
        : false;
    } else {
      return item.options.some((o) => this.isActive(o));
    }
  }

  render() {
    return html`
      <div
        id="menu"
        class="menu ${this.selectedItem?.options && this._isVisible
          ? "visible"
          : ""}"
      >
        <div class="header">
          <h3>${this.selectedItem?.label}</h3>
        </div>
        ${this.selectedItem?.options?.map((opt, index) => {
          const isActive = index === this.menuIndex.index;
          return html`
            <div
              @click="${() => this.selectItem(opt, index)}"
              data-testid="${opt.test_id}"
              class="menu-opt ${this.getClasses(opt)}"
            >
              ${!!opt.icon && opt.icon !== ""
                ? html` <comet-icon
                    name="${opt.icon}"
                    size="30"
                    primaryColor="${this.getIconColor(opt)}"
                  ></comet-icon>`
                : null}
              <span>${opt.label}</span>
              ${opt.options && isActive
                ? html`<comet-icon
                    name="arrow-drop-up"
                    primaryColor="${this.getIconColor(opt)}"
                    size="24"
                  ></comet-icon>`
                : ""}
              ${opt.options && !isActive
                ? html`<comet-icon
                    name="arrow-drop-down"
                    primaryColor="${this.getIconColor(opt)}"
                    size="24"
                  ></comet-icon>`
                : ""}
            </div>
            ${isActive
              ? html` <comet-sidebar-menu-options
                  .selectedItem="${this._selectedItem}"
                  .actualRoute="${this.actualRoute}"
                ></comet-sidebar-menu-options>`
              : ""}
          `;
        })}
        <hr class="divider" />
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .header {
      display: flex;
      min-width: 200px;
      transition: min-width 0.2s;
    }

    h3 {
      color: var(--primary-80);
    }

    .divider {
      border-color: var(--neutral-20);
      border-style: solid;
    }

    .menu {
      height: 100%;
      overflow: auto;
      width: 0;
      min-width: 0;
      opacity: 0;
      padding-top: 1rem;
      transition: min-width 0.2s;
      background-color: var(--neutral-0);
      height: 100%;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      border-radius: 0 0.75rem 0.75rem 0;
    }

    .menu.visible {
      opacity: 1;
      padding: 0.4rem 1rem;
      min-width: 200px;
    }

    .menu-opt {
      display: flex;
      margin-bottom: 5px;
      min-height: 32px;
      color: var(--neutral-80);
      align-items: center;
      padding: 0.5rem;
      border-radius: 0.5rem;
      user-select: none;
    }

    .menu-opt.disabled {
      color: var(--neutral-60);
    }

    .menu-opt:hover {
      cursor: pointer;
      font-weight: bold;
      background-color: var(--secondary-20);
    }

    .menu-opt.disabled:hover {
      cursor: not-allowed;
      background-color: var(--neutral-0);
    }

    .menu-opt.active {
      color: var(--neutral-0);
      font-weight: bold;
      background-color: var(--secondary-60);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-sidebar-menu": CometSidebarMenu;
  }
}
