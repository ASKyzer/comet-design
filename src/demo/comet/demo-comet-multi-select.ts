import "@vaadin/multi-select-combo-box";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/multi-select/comet-multi-select";
import { FilterItem } from "../../components/options/comet-options";
import { browsers, carriers } from "../constants/filter-items";

@customElement("demo-comet-multi-select")
export class DemoCometMultiSelect extends LitElement {
  @state() public browsers: FilterItem[] = [];
  @state() public carriers: FilterItem[] = [];
  @state() public chromeAndFirefoxPreSelected: FilterItem[] = [];

  firstUpdated() {
    this.browsers = this.parse(browsers);
    this.carriers = this.parse(carriers);
    this.chromeAndFirefoxPreSelected = this.parse(this.browsers).map((b) => {
      if (b.value === "chrome") b.selected = true;
      if (b.value === "firefox") b.selected = true;
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
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Multi Select</h1>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        The Comet Multi Select is a dropdown component used to select multiple items in the options menu.  Each selected item is then displayed as checked and listed in the input filed value area.
      </h3>

      
      <div style="display: flex; grid-gap: 24px;">
          <comet-multi-select
            id="selectBrowser"
            @select-change="${this.handleChange}"
            .items="${this.browsers}"
            label="Browser"
            helperText="Some features may not be support by Edge"
            placeholder="Please choose your default browser"
            .searchBar="${false}"
          ></comet-multi-select>
          <div id="secondContainer" style="width: 100%;">
          <comet-multi-select
            id="insuranceCarriers"
            .items="${this.carriers}"
            label="Insurance carriers"
            .searchBar="${true}"
            .required="${true}"
            @select-change="${this.handleChange}"
           
          >
            <div slot="error-message">Required</div>
          </comet-multi-select>
          </div>
      </div>

        <h3 style="color: var(--primary-50); margin-top: 48px">
        Types: default is 'input'
      </h3>
      <div style="display: flex; gap: 24px; margin-bottom: 24px">
          <comet-multi-select
            .items="${this.browsers}"
            label="Filter"
            type="filter"
            placeholder="Filter by browsers"
          ></comet-multi-select>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        With default selected item and no ability to clear the input value
      </h3>
      <div style="display: flex; gap: 24px; margin-bottom: 24px">
          <comet-multi-select
            id="preSelected"
            @select-change="${this.handleChange}"
            .items="${this.chromeAndFirefoxPreSelected}"
            .canClear=${false}
            label="Pre selected items"
          ></comet-multi-select>
          <comet-multi-select
            id="disabledState"
            @select-change="${this.handleChange}"
            label="Disabled state"
            .items="${this.browsers}"
            .disabled=${true}
            helperText="Disabled helper text"
          >
          </comet-multi-select>
      </div>
       <div style="display: flex; gap: 24px; margin-bottom: 48px">
          <comet-multi-select
            id="readonlyState"
            @select-change="${this.handleChange}"
            .items="${this.chromeAndFirefoxPreSelected}"
            .readonly=${true}
            helperText="Readonly helper text"
            label="Read-only"
          ></comet-multi-select>
          <comet-multi-select
            @select-change="${this.handleChange}"
            label="Invalid state"
            .items="${this.browsers}"
            .required=${true}
            .invalid=${true}
            .searchBar=${true}
          >
            <div slot="error-message">Required</div>f
          </comet-multi-select>
      </div>
      <div style="display: flex; gap: 24px; margin-bottom: 48px;">
          <comet-multi-select
            id="roundedState"
            .items="${this.carriers}"
            theme="helper-text-above"
            helperText="Helper text above"
            .rounded=${true}
            label="Rounded"
          ></comet-multi-select>
          <comet-multi-select
            id="roundedInvalidState"
            .items="${this.carriers}"
            label="Rounded invalid"
            helperText="Helper text above"
            .rounded=${true}
            .required=${true}
            .invalid=${true}
          >
            <div slot="error-message">Required</div>
          </comet-multi-select>
      </div>
    </div>
    <h3 style="color: var(--primary-50); margin-top: 48px">
      Comet Select vs. vaadin Combo-box
    </h3>
    <div style="display: flex; gap: 24px; margin-bottom: 124px">
      <comet-multi-select
        @select-change="${this.handleChange}"
        .items="${this.browsers}"
        label="Comet Multi Select"
        helperText="Helper text goes here"
        placeholder="Select sort type"
        .required=${true}
        .searchBar=${true}

      >
        <div slot="error-message">Required</div>
      </comet-multi-select>
      <vaadin-multi-select-combo-box
        required
        label="vaadin Multi Select Combo Box"
        helper-text="Helper text goes here"
        item-label-path="label"
        item-id-path="value"
        .items="${this.browsers}"
      >
        <div slot="error-message">Mandatory field</div>
      </vaadin-multi-select-combo-box>
    </div>
    `;
  }

  static styles = css`
    comet-multi-select,
    vaadin-multi-select-combo-box {
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-comet-multi-select": DemoCometMultiSelect;
  }
}
