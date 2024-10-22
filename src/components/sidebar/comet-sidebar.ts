import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "../icon/comet-icon";
import "./comet-sidebar-menu";
import { MenuIndex } from "./interfaces/sidebar-index.interface";
import { SidebarItem } from "./interfaces/sidebar-item.interface";

@customElement("comet-sidebar")
export class CometSideBar extends LitElement {
  @state()
  protected _selectedItem: SidebarItem | undefined;

  @state()
  protected menuIndex: MenuIndex = { index: undefined, child: undefined };

  @state()
  protected actualRoute: string = "";

  @property({ type: Array }) sidebarItems: SidebarItem[] | undefined;

  getClasses(item: SidebarItem): string {
    return item.disabled ? "disabled" : this.isActive(item) ? "active" : "";
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

  getIconColor(item: SidebarItem): string {
    return item.disabled ? "neutral-60" : "neutral-0";
  }

  connectedCallback() {
    super.connectedCallback();
    if (window.location.pathname) {
      this.actualRoute = window.location.pathname;
    }

    document.body.addEventListener(
      "click",
      () => {
        setTimeout(() => {
          if (this.actualRoute !== location.pathname) {
            this.actualRoute = location.pathname;
          }
        }, 500);
      },
      true
    );
  }

  onNavigate(event: { detail: { router_link: string } }): void {
    this._selectedItem = undefined;
    this.actualRoute = event?.detail?.router_link;
  }

  selectItem(item: SidebarItem, index: number) {
    if (item.disabled) return;
    if (this.menuIndex.index === index && this._selectedItem) {
      // unselect item
      this._selectedItem = undefined;
      return;
    }
    if (this.menuIndex.index !== index) {
      this.menuIndex.child = { index: undefined, child: undefined };
    }
    this._selectedItem = { ...item };
    this.menuIndex.index = index;
    if (!this._selectedItem.options && item.router_link) {
      this.dispatchEvent(
        new CustomEvent("navigate", {
          bubbles: true,
          composed: true,
          detail: item,
        })
      );
      this.actualRoute = item.router_link;
    }
  }

  render() {
    return html`
      <div class="container">
        <div class="sidebar">
          <ul>
            ${this.sidebarItems?.map((item, index) => {
              return html`
                ${item.top_divider && html`<hr class="divider" />`}
                <li
                  @click="${() => this.selectItem(item, index)}"
                  data-testid="${item.test_id}"
                  class="${this.getClasses(item)}"
                >
                  <comet-icon
                    name="${item.icon}"
                    primaryColor="${this.getIconColor(item)}"
                  ></comet-icon>
                  <span class="tooltip"> ${item.label} </span>
                </li>
                ${item.bottom_divider && html`<hr class="divider" />`}
              `;
            })}
          </ul>
        </div>
        <comet-sidebar-menu
          data-testid="sidebar-menu"
          .selectedItem="${this._selectedItem}"
          .actualRoute="${this.actualRoute}"
          .menuIndex="${this.menuIndex.child}"
          @navigate="${(event: { detail: { router_link: string } }) =>
            this.onNavigate(event)}"
        ></comet-sidebar-menu>
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .container {
      position: relative;
      display: flex;
      height: 100vh;
      top: 0;
      left: 0;
    }

    .divider {
      width: 80%;
    }

    .sidebar {
      height: 100%;
      width: 4rem;
      background-color: var(--primary-90);
      padding: 8px 12px;
    }

    .sidebar ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0;
    }

    .sidebar ul .active {
      background-color: var(--secondary-60);
    }

    .sidebar ul li {
      display: flex;
      margin: 0.1rem;
      text-decoration: none;
      padding: 0.4rem 0.5rem;
      border-radius: 0.75rem;
    }

    .sidebar ul li comet-icon {
      border-bottom: 3px solid transparent;
      width: 2rem;
      height: 2rem;
    }

    .sidebar ul li comet-icon:hover {
      border-bottom: 0.2rem solid var(--secondary-60);
      cursor: pointer;
    }

    .sidebar ul li.disabled comet-icon:hover {
      border-bottom: 0.2rem solid transparent;
      cursor: not-allowed;
    }

    .sidebar ul li .tooltip {
      visibility: hidden;
      background-color: var(--secondary-20);
      text-align: center;
      margin-left: 3rem;
      padding: 0.5rem;
      border-radius: 0.75rem;
      position: absolute;
      width: max-content;
      z-index: 1;
    }

    .sidebar ul li:hover .tooltip {
      visibility: visible;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-sidebar": CometSideBar;
  }
}
