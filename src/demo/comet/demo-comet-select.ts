import "@vaadin/combo-box";
import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, state } from "lit/decorators.js";
import { FilterItem } from "../../components/options/comet-options";
import "../../components/select/comet-select";
import {
  browsers,
  browsersWithDescription,
  carriers,
} from "../constants/filter-items";

@customElement("demo-comet-select")
export class DemoCometSelect extends LitElement {
  @state() public browsers: FilterItem[] = [];
  @state() public browsersWithDescription: FilterItem[] = [];
  @state() public carriers: FilterItem[] = [];
  @state() public firefoxSelectedBrowsers: FilterItem[] = [];
  @state() public manufakturSelectedCarriers: FilterItem[] = [];

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    this.browsers = this.parse(browsers);
    this.browsersWithDescription = this.parse(browsersWithDescription);
    this.carriers = this.parse(carriers);
    this.firefoxSelectedBrowsers = this.parse(browsers).map((b) => {
      if (b.value === "firefox") b.selected = true;
      return b;
    });
    this.manufakturSelectedCarriers = this.parse(carriers).map((b) => {
      if (b.value === "manufaktur") b.selected = true;
      return b;
    });
  }

  parse(items) {
    return JSON.parse(JSON.stringify(items));
  }

  handleChange(event: CustomEvent) {
    const selected = event.detail;
    if (selected) {
      // Do something
    }
  }

  render() {
    return html`
      <div style="background: white;margin: -32px; padding: 32px;">
        <h1 style="color: var(--primary-50); margin-top: 0">Comet Select</h1>

        <h3 style="color: var(--primary-50); margin-top: 24px">
          The comet select is a dropdown component that can be used both as a
          select or as a combo-box. To use as a combo-box, simply set the
          attribute searchBar to true. The select options also have the ability
          to show an image to the left of the option label.
        </h3>
        <div style="display: flex; gap: 24px; width: 100%; margin-top: 24px;">
          <comet-select
            id="selectBrowserContainer"
            @select-change="${this.handleChange}"
            .items="${this.browsers}"
            label="Browser"
            .required=${true}
          >
            <div slot="error-message">Required</div>
          </comet-select>
          <comet-select
            id="placeholderSelect"
            @select-change="${this.handleChange}"
            .items="${this.browsers}"
            label="Placeholder"
            placeholder="Choose your default browser"
          >
          </comet-select>
        </div>

        <h3 style="color: var(--primary-50); margin-top: 24px">Type</h3>
        <div style="display: flex; gap: 24px; width: 100%; margin-top: 24px;">
          <comet-select
            .items="${[
              { label: "Morning", value: "morning" },
              { label: "Afternoon", value: "afternoon" },
              { label: "Evening", value: "evening" },
            ]}"
            label="Filter"
            helperText="default type is input"
            .rounded=${true}
            type="filter"
            placeholder="Filter by time of day"
          >
          </comet-select>
          <comet-select
            .items="${[
              { label: "Name ascending", value: "asc" },
              { label: "Name descending", value: "desc" },
            ]}"
            label="Sort"
            helperText="default type is input"
            .rounded=${true}
            type="sort"
            placeholder="Sort by customer name"
          >
            <div slot="error-message">Required</div>
          </comet-select>
        </div>

        <div style="display: flex; gap: 24px; width: 100%; margin-top: 24px;">
          <comet-select
            id="roundedBrowserContainer"
            @select-change="${this.handleChange}"
            .items="${this.browsers}"
            label="Rounded"
            helperText="Helper text above"
            .rounded=${true}
          >
            <div slot="error-message">Required</div>
          </comet-select>
          <comet-select
            id="roundedInvalidSelect"
            @select-change="${this.handleChange}"
            .items="${this.browsers}"
            label="Rounded required"
            theme="helper-text-above"
            helperText="Helper text above"
            .rounded=${true}
            .required=${true}
            .invalid=${true}
          >
            <div slot="error-message">Required</div>
          </comet-select>
        </div>

        <div style="display: flex; gap: 24px; width: 100%; margin-top: 24px;">
          <comet-select
            id="requiredElement"
            @select-change="${this.handleChange}"
            .items="${this.browsers}"
            label="Required"
            .required=${true}
          >
            <div slot="error-message">Required</div>
          </comet-select>
          <comet-select
            id="invalidSelect"
            @select-change="${this.handleChange}"
            .items="${this.browsers}"
            label="Invalid state"
            .required=${true}
            .invalid="${true}"
          >
            <div slot="error-message">Required</div>
          </comet-select>
        </div>

        <div style="display: flex; gap: 24px; width: 100%; margin-top: 24px;">
          <comet-select
            id="helperTextAboveSelect"
            @select-change="${this.handleChange}"
            .items="${this.carriers}"
            helperText="Helper text above"
            theme="helper-text-above"
          ></comet-select>
          <comet-select
            id="insuranceCarriersSelectContainer"
            @select-change="${this.handleChange}"
            .items="${this.manufakturSelectedCarriers}"
            helperText="Helper text below"
            label="Insurance carriers"
          >
            <comet-badge
              label="New"
              theme="info small"
              slot="suffix"
            ></comet-badge>
          </comet-select>
        </div>

        <div style="display: flex; gap: 24px; width: 100%; margin-top: 24px;">
          <comet-select
            id="disabledSelect"
            @select-change="${this.handleChange}"
            .items="${this.carriers}"
            label="Disabled"
            helperText="Helper text below"
            placeholder="Disabled placeholder text"
            .disabled=${true}
          ></comet-select>
          <comet-select
            id="readonlySelect"
            label="Read-only"
            .items="${this.firefoxSelectedBrowsers}"
            .readonly=${true}
          ></comet-select>
        </div>

        <h3 style="color: var(--primary-50); margin-top: 24px">
          Usage as Combo-box
        </h3>

        <div style="display: flex; grid-gap: 24px;">
          <comet-select
            @select-change="${this.handleChange}"
            .items="${this.browsers}"
            label="Browser"
            helperText="Some features may not be supported by Edge"
            placeholder="Please choose your default browser"
            .searchBar="${true}"
          ></comet-select>
          <comet-select
            id="comboBoxInsuranceCarriersContainer"
            .items="${this.carriers}"
            label="Insurance carriers"
            .searchBar="${true}"
            @select-change="${this.handleChange}"
          >
          </comet-select>
        </div>

        <h3 style="color: var(--primary-50); margin-top: 24px">
          With default selected item and no ability to clear the input value
        </h3>

        <div style="display: flex; gap: 24px; margin-bottom: 24px">
          <comet-select
            id="initialValueNoClear"
            @select-change="${this.handleChange}"
            .items="${this.firefoxSelectedBrowsers}"
            .canClear=${false}
            label="Default browser"
            placeholder="Select sort type"
            .searchBar="${true}"
          ></comet-select>
          <comet-select
            @select-change="${this.handleChange}"
            label="Disabled state"
            .items="${this.firefoxSelectedBrowsers}"
            .disabled=${true}
          ></comet-select>
        </div>

        <h3 style="color: var(--primary-50); margin-top: 24px">
          Comet Select vs. vaadin Combo-box
        </h3>

        <div style="display: flex; gap: 24px; margin-bottom: 24px">
          <comet-select
            @select-change="${this.handleChange}"
            .items="${this.firefoxSelectedBrowsers}"
            label="Comet select"
            helperText="Helper text goes here"
            placeholder="Select sort type"
            .searchBar="${true}"
            required
          >
            <div slot="error-message">Required</div>
          </comet-select>
          <vaadin-combo-box
            required
            label="vaadin Combo-box"
            placeholder="Placeholder"
            helper-text="Helper text goes here"
            item-label-path="label"
            item-value-path="value"
            .items="${this.browsers}"
          >
            <div slot="error-message">Required</div>
          </vaadin-combo-box>
        </div>

        <div
          style="display: flex; gap: 24px; width: 50%; margin-bottom: 124px;"
        >
          <comet-select
            id="selectBrowserContainerWithDescription"
            @select-change="${this.handleChange}"
            .items="${this.browsersWithDescription}"
            label="BrowserWithDescription"
            .required=${true}
          >
            <div slot="error-message">Required</div>
          </comet-select>
        </div>
      </div>
    `;
  }

  static styles = css`
    comet-select,
    vaadin-combo-box {
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-comet-select": DemoCometSelect;
  }
}
