import "@vaadin/checkbox";
import "@vaadin/checkbox-group";
import type { CheckboxGroupValueChangedEvent } from "@vaadin/checkbox-group";
import "@vaadin/horizontal-layout";
import "@vaadin/vertical-layout";
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
@customElement("demo-checkbox")
export class DemoCheckbox extends LitElement {
  @state()
  private value = ["1", "3"];
  private invalid = false;
  singleLabel =
    "Duis non mauris erat. Vestibulum vitae pretium lorem. Integer commodo placerat ante nec imperdiet. Proin eu ex sapien. Sed eget tempus est, nec pellentesque ex. Sed eget eros sit amet libero posuere faucibus. Donec et magna arcu. Nam ullamcorper ac turpis sit amet fermentum. Nulla auctor turpis sed egestas ullamcorper. Quisque vel augue a velit tincidunt iaculis. Morbi non luctus lacus, tristique dictum est. Curabitur ultrices diam nec ligula facilisis rutrum.";

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">vaadin Checkbox</h1>

      <vaadin-vertical-layout theme="spacing">
        <div class="section-title">Single checkbox without a group</div>
        <vaadin-checkbox label="${this.singleLabel}"></vaadin-checkbox>

        <div class="section-title">Invalid checkbox</div>
        <vaadin-checkbox-group
          theme="vertical helper-above-field"
          label="Invalid/Required"
          required
          helper-text="Un-check all the checkboxes to trigger the error"
          ?invalid="${this.invalid}"
          .value="${this.value}"
          @value-changed="${(event: CheckboxGroupValueChangedEvent) => {
            this.value = event.detail.value;
            this.invalid = this.value.length === 0;
          }}"
          theme="vertical"
        >
          <vaadin-checkbox
            ?invalid="${this.invalid}"
            value="0"
            label="Order ID"
          ></vaadin-checkbox>
          <vaadin-checkbox
            ?invalid="${this.invalid}"
            value="1"
            label="Product name"
          ></vaadin-checkbox>
          <vaadin-checkbox
            ?invalid="${this.invalid}"
            value="2"
            label="Customer"
          ></vaadin-checkbox>
          <vaadin-checkbox
            ?invalid="${this.invalid}"
            value="3"
            label="Status"
          ></vaadin-checkbox>
          <div slot="error-message">Invalid error message</div>
        </vaadin-checkbox-group>

        <div class="section-title">Group checkboxes - Vertical</div>
        <vaadin-checkbox-group
          label="Export data"
          .value="${this.value}"
          @value-changed="${(event: CheckboxGroupValueChangedEvent) => {
            this.value = event.detail.value;
          }}"
          theme="vertical"
        >
          <vaadin-checkbox value="0" label="Order ID"></vaadin-checkbox>
          <vaadin-checkbox value="1" label="Product name"></vaadin-checkbox>
          <vaadin-checkbox value="2" label="Customer"></vaadin-checkbox>
          <vaadin-checkbox value="3" label="Status"></vaadin-checkbox>
        </vaadin-checkbox-group>

        <div class="section-title">Disabled state</div>
        <vaadin-checkbox-group
          label="Departments"
          theme="vertical"
          disabled
          helper-text="Disabled helper text"
        >
          <vaadin-checkbox
            disabled
            value="engineering"
            label="Engineering"
          ></vaadin-checkbox>
          <vaadin-checkbox
            disabled
            value="human-resources"
            label="Human Resources"
          ></vaadin-checkbox>
          <vaadin-checkbox
            disabled
            value="marketing"
            label="Marketing"
          ></vaadin-checkbox>
          <vaadin-checkbox
            disabled
            value="operations"
            label="Operations"
          ></vaadin-checkbox>
          <vaadin-checkbox
            disabled
            value="sales"
            label="Sales"
          ></vaadin-checkbox>
        </vaadin-checkbox-group>

        <div class="section-title">Group checkboxes - Horizontal (default)</div>
        <vaadin-checkbox-group label="Permissions">
          <vaadin-checkbox value="read" label="Read"></vaadin-checkbox>
          <vaadin-checkbox value="edit" label="Edit"></vaadin-checkbox>
          <vaadin-checkbox value="delete" label="Delete"></vaadin-checkbox>
        </vaadin-checkbox-group>

        <vaadin-checkbox-group
          label="Helper text below"
          helper-text="Helper text"
        >
          <vaadin-tooltip slot="tooltip" text="Tooltip text"></vaadin-tooltip>
          <vaadin-checkbox value="1" label="Item 1"></vaadin-checkbox>
          <vaadin-checkbox value="2" label="Item 2"></vaadin-checkbox>
          <vaadin-checkbox value="3" label="Item 3"></vaadin-checkbox>
        </vaadin-checkbox-group>

        <vaadin-checkbox-group
          theme="helper-above-field"
          label="Helper text above"
          helper-text="Helper text"
        >
          <vaadin-checkbox value="1" label="Item 1"></vaadin-checkbox>
          <vaadin-checkbox value="2" label="Item 2"></vaadin-checkbox>
          <vaadin-checkbox value="3" label="Item 3"></vaadin-checkbox>
        </vaadin-checkbox-group>
      </vaadin-vertical-layout>
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
    "demo-checkbox": DemoCheckbox;
  }
}
