import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/sidebar/comet-sidebar";
import { SidebarItem } from "../../components/sidebar/interfaces/sidebar-item.interface";

@customElement("demo-sidebar")
export class DemoSidebar extends LitElement {
  sidebarItems: SidebarItem[] = [
    {
      test_id: "home_test",
      icon: "home",
      label: "Home",
      options: [],
      router_link: "dashboard",
      bottom_divider: true,
    },
    {
      test_id: "sales_test",
      icon: "sales",
      label: "Sales",
      options: [],
    },
    {
      test_id: "archive_test",
      icon: "archive-box",
      label: "Sales",
      options: [
        {
          test_id: "sales_test",
          icon: "sales",
          label: "_NAV_offers_list",
          router_link: "offers",
        },
      ],
      disabled: false,
    },
    {
      test_id: "user_test",
      icon: "user",
      label: "Customers",
      options: [
        {
          test_id: "user_test",
          icon: "user",
          label: "Customers",
          router_link: "customers",
          options: [
            {
              test_id: "user_test",
              icon: "user",
              label: "Customers wefox",
              router_link: "customers",
            },
            {
              test_id: "sales_test",
              icon: "sales",
              label: "Customers fks",
              router_link: "contracts",
            },
            {
              test_id: "sales_test",
              icon: "sales",
              label: "Customers fks",
              router_link: "contracts",
              disabled: true,
            },
          ],
        },
        {
          test_id: "sales_test",
          icon: "sales",
          label: "Contracts",
          router_link: "contracts",
        },
        {
          test_id: "sales_test",
          icon: "sales",
          label: "Disabled",
          router_link: "contracts",
          disabled: true,
        },
      ],
      disabled: false,
    },
    {
      test_id: "flow_test",
      icon: "flow",
      label: "Roles",
      options: [],
      router_link: "broker-roles",
      disabled: false,
    },
    {
      test_id: "support_test",
      icon: "support",
      label: "Help",
      options: [
        {
          test_id: "support_test",
          icon: "support",
          label: "Support",
          router_link: "support",
        },
        {
          test_id: "support_test",
          icon: "support",
          label: "FAQ",
          router_link: "faq",
        },
      ],
      disabled: true,
    },
    {
      top_divider: true,
      test_id: "support_test",
      icon: "support",
      label: "Leads",
      router_link: "leads",
      disabled: false,
    },
  ];

  closeButtonClick = function onCloseButtonClick() {
    alert("Closing the sidebar");
  };

  actionButtonClick = function secondaryButtonAction() {
    alert("Action button clicked now do something!!");
  };

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet sidebar</h1>
      <div class="comet-sidebar">
        <comet-sidebar
          .sidebarItems="${this.sidebarItems}"
          actionButtonClick="${this.actionButtonClick}"
          @navigate="${(event: { detail: string }) =>
            console.log(event.detail)}"
        >
        </comet-sidebar>
      </div>
      <p style="margin-left: 50px;">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    `;
  }

  static styles = css`
    .demo-banner-content {
      margin: 8px 0;
    }

    .comet-sidebar {
      position: absolute;
      left: 0;
    }
  `;
}
