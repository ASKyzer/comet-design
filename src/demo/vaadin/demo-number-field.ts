import "@vaadin/horizontal-layout";
import "@vaadin/number-field";
import "@vaadin/split-layout";
import "@vaadin/text-field";
import "@vaadin/vertical-layout";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-number-field")
export class DemoNumberField extends LitElement {
  disable = true;
  readOnly = true;
  required = true;
  invalid = true;

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Number Field
      </h1>

      <vaadin-vertical-layout theme="spacing">
        <vaadin-horizontal-layout theme="spacing">
          <vaadin-number-field label="Default" value="200">
            <div slot="suffix">€</div>
          </vaadin-number-field>

          <vaadin-number-field
            label="Disabled"
            helper-text="Disabled helper text"
            value="200"
            ?disabled="${this.disable}"
          >
            <div slot="suffix">€</div>
          </vaadin-number-field>

          <vaadin-number-field label="Placeholder" placeholder="Placeholder">
            <div slot="suffix">€</div>
          </vaadin-number-field>

          <vaadin-number-field
            label="Read-only"
            value="200"
            ?readonly="${this.readOnly}"
          >
            <div slot="suffix">€</div>
          </vaadin-number-field>
        </vaadin-horizontal-layout>

        <vaadin-horizontal-layout theme="spacing">
          <vaadin-number-field
            theme="align-right"
            label="Align right"
            value="123.45"
          >
            <div slot="suffix">€</div>
          </vaadin-number-field>

          <vaadin-number-field
            theme="align-center"
            label="Align center"
            value="123.45"
          >
          </vaadin-number-field>

          <vaadin-number-field
            label="Small variant"
            placeholder="Placeholder"
            theme="small"
          >
            <div slot="prefix">$</div>
          </vaadin-number-field>

          <vaadin-number-field
            label="With steps"
            step="0.5"
            value="12.5"
            step-buttons-visible
            helper-text="Duration in hours"
          ></vaadin-number-field>
        </vaadin-horizontal-layout>

        <vaadin-horizontal-layout theme="spacing">
          <vaadin-number-field
            label="Helper text"
            helper-text="Sample helper text"
          >
            <div slot="suffix">€</div>
          </vaadin-number-field>

          <vaadin-number-field
            label="Required"
            helper-text="Focus in and out to trigger the error"
            ?required="${this.required}"
          >
            <div slot="suffix">€</div>
            <div slot="error-message">Required field</div>
          </vaadin-number-field>

          <vaadin-number-field
            label="With clear button"
            placeholder="Placeholder"
            clear-button-visible
          >
            <div slot="suffix">€</div>
          </vaadin-number-field>

          <vaadin-number-field
            theme="helper-above-field"
            label="Helper text above"
            value="123.45"
            helper-text="Helper text above input"
          >
            <div slot="prefix">CHF</div>
          </vaadin-number-field>
        </vaadin-horizontal-layout>

        <vaadin-horizontal-layout theme="spacing">
          <vaadin-number-field
            label="Invalid"
            ?required="${this.required}"
            invalid
          >
            <div slot="suffix">€</div>
            <div slot="error-message">The error message goes here</div>
          </vaadin-number-field>

          <vaadin-number-field
            label="With clear button"
            placeholder="Placeholder"
            clear-button-visible
          >
            <div slot="suffix">€</div>
          </vaadin-number-field>

          <vaadin-number-field label="With icon suffix" value="123.45">
            <comet-icon
              slot="suffix"
              name="category-liability"
              size="24"
              primaryColor="neutral-80"
            ></comet-icon>
          </vaadin-number-field>

          <vaadin-number-field label="With icon prefix" value="123.45">
            <comet-icon
              slot="prefix"
              name="chat"
              size="24"
              primaryColor="secondary-80"
            ></comet-icon>
          </vaadin-number-field>
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>

      <h3 style="color: var(--comet-color-font-light">Input field width</h3>
      <h5 style="color: var(--comet-color-font-light">
        To make inputs full width, add style of { flex-grow: 1; } on the element
        within the vaadin horizontal layout. Please note that the flex-grow does
        not work if it is wrapped within the vaadin vertical layout. This
        however, is not responsive. For a responsive design use
        <a href="/form-layout">Form Layout</a>.
      </h5>

      <vaadin-horizontal-layout theme="spacing">
        <vaadin-number-field
          style="flex-grow: 1"
          label="With icon prefix"
          value="123.45"
        >
          <comet-icon
            slot="prefix"
            name="chat"
            size="24"
            primaryColor="secondary-80"
          ></comet-icon>
        </vaadin-number-field>
      </vaadin-horizontal-layout>

      <vaadin-horizontal-layout theme="spacing">
        <vaadin-number-field style="flex-grow: 1" label="Default" value="200">
          <div slot="suffix">€</div>
        </vaadin-number-field>

        <vaadin-number-field
          style="flex-grow: 1"
          label="Disabled"
          value="200"
          disabled
        >
          <div slot="suffix">€</div>
        </vaadin-number-field>
      </vaadin-horizontal-layout>

      <vaadin-horizontal-layout theme="spacing">
        <vaadin-number-field style="flex-grow: 1" label="Default" value="200">
          <div slot="suffix">€</div>
        </vaadin-number-field>

        <vaadin-number-field
          style="flex-grow: 1"
          label="Disabled"
          value="200"
          disabled
        >
          <div slot="suffix">€</div>
        </vaadin-number-field>
        <vaadin-number-field
          style="flex-grow: 1"
          label="With icon prefix"
          value="123.45"
        >
          <comet-icon
            slot="prefix"
            name="chat"
            size="24"
            primaryColor="secondary-80"
          ></comet-icon>
        </vaadin-number-field>
      </vaadin-horizontal-layout>

      <vaadin-horizontal-layout theme="spacing">
        <vaadin-number-field style="flex-grow: 1" label="Default" value="200">
          <div slot="suffix">€</div>
        </vaadin-number-field>

        <vaadin-number-field label="With icon prefix" value="123.45">
          <comet-icon
            slot="prefix"
            name="chat"
            size="24"
            primaryColor="secondary-80"
          ></comet-icon>
        </vaadin-number-field>
      </vaadin-horizontal-layout>

      <vaadin-horizontal-layout theme="spacing">
        <vaadin-number-field label="Default" value="200">
          <div slot="suffix">€</div>
        </vaadin-number-field>

        <vaadin-number-field
          style="flex-grow: 1"
          label="With icon prefix"
          value="123.45"
        >
          <comet-icon
            slot="prefix"
            name="chat"
            size="24"
            primaryColor="secondary-80"
          ></comet-icon>
        </vaadin-number-field>
      </vaadin-horizontal-layout>
    `;
  }

  static styles = css``;
}
