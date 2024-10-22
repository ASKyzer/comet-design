import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../icon/comet-icon";
import { SidebarItem } from "./interfaces/sidebar-item.interface";

@customElement("comet-sidebar-menu-options")
export class CometSidebarMenuOptions extends LitElement {
  @state()
  protected _selectedOpt: SidebarItem | undefined;

  @state()
  protected actualRoute: string = "";

  @property({ type: Object })
  protected selectedItem: SidebarItem | undefined;

  selectItem(item: SidebarItem) {
    if (item.disabled) return;
    this._selectedOpt = { ...item };
    this.dispatchEvent(
      new CustomEvent("navigate", {
        bubbles: true,
        composed: true,
        detail: item,
      })
    );
  }

  getClasses(item: SidebarItem): string {
    const isActive = item.router_link
      ? this.actualRoute.includes(item?.router_link)
      : false;
    return item.disabled ? "disabled" : isActive ? "active" : "";
  }

  getIconColor(item: SidebarItem): string {
    const isActive = item.router_link
      ? this.actualRoute.includes(item?.router_link)
      : false;
    return item.disabled ? "neutral-60" : isActive ? "neutral-0" : "neutral-80";
  }

  render() {
    return this.selectedItem?.options?.map((opt) => {
      return html`
        <div class="container">
          <div
            @click="${() => this.selectItem(opt)}"
            data-testid="${opt.test_id}"
            class="menu-opt ${this.getClasses(opt)}"
          >
            <comet-icon
              name="${opt.icon}"
              size="30"
              primaryColor="${this.getIconColor(opt)}"
            ></comet-icon>
            <span>${opt.label}</span>
          </div>
        </div>
      `;
    });
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .container {
      padding-left: 1rem;
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
