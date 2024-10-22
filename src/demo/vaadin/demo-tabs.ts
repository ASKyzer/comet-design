import "@vaadin/tabs";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("demo-tabs")
export class DemoTabs extends LitElement {
  private NAVIGATION = [
    { label: "Dashboard", id: "dashboard-tab" },
    { label: "Payment", id: "payment-tab" },
    { label: "Shipping", id: "shipping-tab" },
  ];

  private NAV_VERTICAL = [
    "Analytics",
    "Customers",
    "Dashboard",
    "Documents",
    "Orders",
    "Products",
    "Tasks",
  ];

  protected override render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">vaadin Tabs</h1>
      <div>
        <div style=" margin-bottom: 48px;">
          <div class="section-title">Simple example of tabs with labels</div>
          <vaadin-horizontal-layout theme="spacing;">
            <vaadin-tabs style="flex-grow: 1;">
              ${this.NAVIGATION.map(
                (nav) => html`<vaadin-tab>${nav.label}</vaadin-tab>`
              )}
            </vaadin-tabs>
          </vaadin-horizontal-layout>
        </div>
        <div style=" margin-bottom: 48px;">
          <div class="section-title">Tab Sheet</div>
          <vaadin-tabsheet>
            <vaadin-tabs slot="tabs">
              ${this.NAVIGATION.map(
                (nav) =>
                  html`<vaadin-tab id="${nav.id}">${nav.label}</vaadin-tab> `
              )}
            </vaadin-tabs>
            ${this.NAVIGATION.map(
              (nav) =>
                html`
                  <div tab="${nav.id}">
                    This is the ${nav.label} tab content
                  </div>
                `
            )}
          </vaadin-tabsheet>
        </div>
        <div style=" margin-bottom: 48px;">
          <div class="section-title">States</div>
          <vaadin-tabs>
            <vaadin-tab>Selected</vaadin-tab>
            <vaadin-tab>Unselected</vaadin-tab>
            <vaadin-tab disabled>Disabled</vaadin-tab>
          </vaadin-tabs>
        </div>
        <div style=" margin-bottom: 48px;">
          <div class="section-title">Horizontal tabs</div>
          <vaadin-tabs style="max-width: 100%; width: 400px;">
            ${this.NAV_VERTICAL.map(
              (nav) => html`<vaadin-tab>${nav}</vaadin-tab>`
            )}
          </vaadin-tabs>
        </div>

        <div style=" margin-bottom: 48px;">
          <div class="section-title">
            Horizontal tabs with disabled scroll buttons
          </div>
          <vaadin-tabs
            theme="hide-scroll-buttons"
            style="max-width: 100%; width: 400px;"
          >
            ${this.NAV_VERTICAL.map(
              (nav) => html`<vaadin-tab>${nav}</vaadin-tab>`
            )}
          </vaadin-tabs>
        </div>

        <div style=" margin-bottom: 48px;">
          <div class="section-title">Vertical tabs</div>
          <vaadin-tabs
            orientation="vertical"
            style="height: 260px; width: 240px;"
          >
            ${this.NAV_VERTICAL.map(
              (nav) => html`<vaadin-tab>${nav}</vaadin-tab>`
            )}
          </vaadin-tabs>
        </div>

        <div style=" margin-bottom: 48px;">
          <div class="section-title">Centered</div>
          <vaadin-tabs theme="centered">
            ${this.NAVIGATION.map(
              (nav) => html`<vaadin-tab>${nav.label}</vaadin-tab>`
            )}
          </vaadin-tabs>
        </div>

        <div style=" margin-bottom: 48px;">
          <div class="section-title" style="width: 800px;">
            Equal-Width Tabs
          </div>
          <vaadin-tabs theme="equal-width-tabs">
            ${this.NAVIGATION.map(
              (nav) => html`<vaadin-tab>${nav.label}</vaadin-tab>`
            )}
          </vaadin-tabs>
        </div>

        <div style=" margin-bottom: 48px;">
          <div class="section-title">Small</div>
          <vaadin-tabs theme="small">
            ${this.NAVIGATION.map(
              (nav) => html`<vaadin-tab>${nav.label}</vaadin-tab>`
            )}
          </vaadin-tabs>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .section-title {
      color: var(--primary-50);
      font-weight: var(--typo-font-weights-bold);
      font-size: 1.35rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-tabs": DemoTabs;
  }
}
