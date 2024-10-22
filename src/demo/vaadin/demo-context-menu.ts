import "@vaadin/context-menu";
import type {
  ContextMenuItem,
  ContextMenuItemSelectedEvent,
  ContextMenuOpenedChangedEvent,
} from "@vaadin/context-menu";
import "@vaadin/grid";
import type { Grid } from "@vaadin/grid";
import "@vaadin/horizontal-layout";
import "@vaadin/vertical-layout";
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

interface FileItem {
  name: string;
  size: string;
}

@customElement("demo-context-menu")
export class DemoContextMenu extends LitElement {
  @state()
  private items = [{ text: "View" }, { text: "Edit" }, { text: "Delete" }];

  @state()
  private itemsClickable: ContextMenuItem[] = [
    { text: "Abigail Lewis", checked: true },
    { text: "Allison Torres" },
    { text: "Anna Myers" },
    { text: "Lauren Wright" },
    { text: "Tamaki Ryushi" },
  ];

  @state()
  private itemsHierarchical = [
    { text: "Preview" },
    { text: "Edit" },
    { component: "hr" },
    {
      text: "Export",
      children: [
        { text: "Portable Document Format (.pdf)" },
        { text: "Rich Text Format (.rtf)" },
        { text: "Plain text (.txt)" },
      ],
    },
    { text: "Share", children: [{ text: "Copy link" }, { text: "Email" }] },
    { component: "hr" },
    { text: "Delete" },
  ];

  @state()
  private gridItemsHierarchical: FileItem[] = [
    { name: "Annual Report.docx", size: "24 MB" },
    { name: "Financials.xlsx", size: "42 MB" },
  ];

  @state()
  private gridItems: any[] = [
    {
      firstName: "firstName",
      lastName: "lastName",
      email: "email@email.com",
      address: {
        phone: "(202)5692557",
      },
    },
    {
      firstName: "firstName",
      lastName: "lastName",
      email: "email@email.com",
      address: {
        phone: "(202)5692557",
      },
    },
    {
      firstName: "firstName",
      lastName: "lastName",
      email: "email@email.com",
      address: {
        phone: "(202)5692557",
      },
    },
    {
      firstName: "firstName",
      lastName: "lastName",
      email: "email@email.com",
      address: {
        phone: "(202)5692557",
      },
    },
    {
      firstName: "firstName",
      lastName: "lastName",
      email: "email@email.com",
      address: {
        phone: "(202)5692557",
      },
    },
    {
      firstName: "firstName",
      lastName: "lastName",
      email: "email@email.com",
      address: {
        phone: "(202)5692557",
      },
    },
    {
      firstName: "firstName",
      lastName: "lastName",
      email: "email@email.com",
      address: {
        phone: "(202)5692557",
      },
    },
    {
      firstName: "firstName",
      lastName: "lastName",
      email: "email@email.com",
      address: {
        phone: "(202)5692557",
      },
    },
    {
      firstName: "firstName",
      lastName: "lastName",
      email: "email@email.com",
      address: {
        phone: "(202)5692557",
      },
    },
    {
      firstName: "firstName",
      lastName: "lastName",
      email: "email@email.com",
      address: {
        phone: "(202)5692557",
      },
    },
  ];

  @state()
  private itemsDisabled = [
    { text: "Preview" },
    { text: "Edit" },
    { component: "hr" },
    {
      text: "Export",
      children: [
        { text: "Portable Document Format (.pdf)", disabled: true },
        { text: "Rich Text Format (.rtf)" },
        { text: "Plain text (.txt)" },
      ],
    },
    { text: "Share", children: [{ text: "Copy link" }, { text: "Email" }] },
    { component: "hr" },
    { text: "Delete", disabled: true },
  ];

  @state()
  private gridItemsDisabled: FileItem[] = [
    { name: "Annual Report.pdf", size: "24 MB" },
    { name: "Financials.pdf", size: "42 MB" },
  ];

  @state()
  private itemsLeftClick = [
    { text: "View" },
    { text: "Edit" },
    { text: "Delete" },
  ];

  @state()
  private gridItemsLeftClick: any[] = this.gridItems.filter((item, idx) => {
    if (idx < 5) {
      return item;
    }
  });

  private contextMenuOpened?: boolean;

  private onClick = (e: MouseEvent) => {
    // Prevent opening context menu on header row click.
    const target = e.currentTarget as Grid<any>;
    if (
      !this.contextMenuOpened &&
      target.getEventContext(e).section !== "body"
    ) {
      e.stopPropagation();
    }
  };

  render() {
    const selectedItem = this.itemsClickable.find((item) => item.checked);

    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Context Menu
      </h1>

      <div class="section-title">
        Context Menu is a component that you can attach to any component to
        display a context menu. The menu appears on right (default) or left
        click. On a touch device, a long press opens the context menu.
      </div>

      <vaadin-horizontal-layout theme="spacing">
        <vaadin-context-menu opened .items=${this.items}>
          <vaadin-grid
            style="width: 700px;"
            all-rows-visible
            .items=${this.gridItems.filter((item, idx) => {
              if (idx < 5) {
                return item;
              }
            })}
            @vaadin-contextmenu=${this.onContextMenu}
          >
            <vaadin-grid-column path="firstName"></vaadin-grid-column>
            <vaadin-grid-column path="lastName"></vaadin-grid-column>
            <vaadin-grid-column path="email"></vaadin-grid-column>
            <vaadin-grid-column
              header="Phone number"
              path="address.phone"
            ></vaadin-grid-column>
          </vaadin-grid>
        </vaadin-context-menu>
      </vaadin-horizontal-layout>

      <div class="section-title">
        <b>Dividers: </b>You can use dividers to separate and group related
        content. Use dividers sparingly to avoid creating unnecessary visual
        clutter.
      </div>

      <vaadin-horizontal-layout theme="spacing">
        <vaadin-context-menu
          .items=${[
            { text: "View" },
            { component: "hr" },
            { text: "Edit" },
            { text: "Delete" },
            { component: "hr" },
            { text: "Email" },
            { text: "Call" },
          ]}
        >
          <vaadin-grid
            style="width: 700px;"
            all-rows-visible
            .items=${this.gridItems}
            @vaadin-contextmenu=${this.onContextMenu}
          >
            <vaadin-grid-column path="firstName"></vaadin-grid-column>
            <vaadin-grid-column path="lastName"></vaadin-grid-column>
            <vaadin-grid-column path="email"></vaadin-grid-column>
            <vaadin-grid-column
              header="Phone number"
              path="address.phone"
            ></vaadin-grid-column>
          </vaadin-grid>
        </vaadin-context-menu>
      </vaadin-horizontal-layout>

      <div class="section-title">
        <b>Checkable Menu Items: </b>Checkable Menu Items can be used to toggle
        a setting on and off.
      </div>

      <vaadin-horizontal-layout theme="spacing">
        <vaadin-context-menu
          .items="${this.itemsClickable}"
          @item-selected="${this.itemSelected}"
        >
          <span class="checkable">Assignee: <b>${selectedItem?.text}</b></span>
        </vaadin-context-menu>
      </vaadin-horizontal-layout>

      <div class="section-title">
        <b>Hierarchical Menu: </b>Context Menu, like Menu Bar, supports
        multi-level sub-menus. You can use a hierarchical menu to organize a
        large set of options and group related items.
      </div>

      <vaadin-horizontal-layout theme="spacing">
        <vaadin-context-menu .items=${this.itemsHierarchical}>
          <vaadin-grid
            style="width: 500px;"
            all-rows-visible
            .items=${this.gridItemsHierarchical}
            @vaadin-contextmenu=${this.onContextMenu}
          >
            <vaadin-grid-column path="name"></vaadin-grid-column>
            <vaadin-grid-column path="size"></vaadin-grid-column>
          </vaadin-grid>
        </vaadin-context-menu>
      </vaadin-horizontal-layout>

      <div class="section-title">
        <b>Disabled Menu Items : </b>You can disable menu items to show that
        they are unavailable.
      </div>

      <vaadin-horizontal-layout theme="spacing">
        <vaadin-context-menu .items=${this.itemsDisabled}>
          <vaadin-grid
            style="width: 500px;"
            all-rows-visible
            .items=${this.gridItemsDisabled}
            @vaadin-contextmenu=${this.onContextMenu}
          >
            <vaadin-grid-column path="name"></vaadin-grid-column>
            <vaadin-grid-column path="size"></vaadin-grid-column>
          </vaadin-grid>
        </vaadin-context-menu>
      </vaadin-horizontal-layout>

      <div class="section-title">
        <b>Left-Click : </b>You can use left-click to open Context Menu in
        situations where left-click doesn’t have any other function, for example
        a Grid without selection support.
      </div>

      <vaadin-horizontal-layout theme="spacing">
        <vaadin-context-menu
          open-on="click"
          .items=${this.itemsLeftClick}
          @opened-changed="${(event: ContextMenuOpenedChangedEvent) => {
            this.contextMenuOpened = event.detail.value;
          }}"
        >
          <vaadin-grid
            style="width: 700px;"
            all-rows-visible
            .items=${this.gridItemsLeftClick}
            @click=${this.onClick}
          >
            <vaadin-grid-column path="firstName"></vaadin-grid-column>
            <vaadin-grid-column path="lastName"></vaadin-grid-column>
            <vaadin-grid-column path="email"></vaadin-grid-column>
            <vaadin-grid-column
              header="Phone number"
              path="address.phone"
            ></vaadin-grid-column>
          </vaadin-grid>
        </vaadin-context-menu>
      </vaadin-horizontal-layout>
    `;
  }

  onContextMenu(e: MouseEvent) {
    // Prevent opening context menu on header row.
    const target = e.currentTarget as Grid<any>;
    if (target.getEventContext(e).section !== "body") {
      e.stopPropagation();
    }
  }

  itemSelected(e: ContextMenuItemSelectedEvent) {
    this.itemsClickable.forEach((item) => {
      item.checked = item === e.detail.value;
    });
    this.itemsClickable = [...this.itemsClickable];
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .section-title {
      color: var(--primary-50);
      font-weight: var(--typo-font-weights-bold);
      font-size: 1.35rem;
      margin: 24px 0;
    }

    .checkable {
      font-size: 20px;
      color: var(--danger-90);
    }

    b {
      color: var(--info-80);
    }
  `;
}
