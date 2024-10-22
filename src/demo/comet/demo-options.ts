import "@vaadin/combo-box";
import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/options/comet-options";
import { FilterItem } from "../../components/options/comet-options";
import {
  additionalCarriers,
  browsers,
  browsersWithDescription,
  carriers,
  chooseTopicsOptions,
} from "../constants/filter-items";

@customElement("demo-options")
export class DemoOptions extends LitElement {
  @state() browsers: FilterItem[] = [];
  @state() browsersWithDescription: FilterItem[] = [];
  @state() carriers: FilterItem[] = [];
  @state() carriersLong: FilterItem[] = [];
  @state() moreOptionsVisible = false;
  @state() multiSelectedCarriers: FilterItem[];
  @state() promptVisible = false;
  @state() singleSelectedCarriers: FilterItem[];

  public chooseTopicsOptions: FilterItem[] = chooseTopicsOptions;
  public singleSelectedBrowsers: FilterItem[] = this.parse(browsers).map(
    (b) => {
      if (b.value === "firefox") b.selected = true;
      return b;
    }
  );
  public multiSelectedBrowsers: FilterItem[] = this.parse(browsers).map((b) => {
    if (b.value === "chrome") b.selected = true;
    if (b.value === "firefox") b.selected = true;
    return b;
  });

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    this.browsers = this.parse(browsers);
    this.carriers = this.parse(carriers);
    this.browsersWithDescription = this.parse(browsersWithDescription);
    this.carriersLong = [
      ...this.parse(carriers),
      ...this.parse(additionalCarriers),
    ];

    this.singleSelectedCarriers = this.parse(this.carriers).map((b) => {
      if (b.value === "manufaktur") b.selected = true;
      return b;
    });

    this.multiSelectedCarriers = this.parse(this.carriers).map((b) => {
      if (b.value === "bkk-gildemeister") b.selected = true;
      if (b.value === "swiss-life") b.selected = true;
      return b;
    });
  }

  parse(items) {
    return JSON.parse(JSON.stringify(items));
  }

  handleChange({ detail }: CustomEvent) {
    if (detail) {
      // Do something
    }
  }

  handleActionButtonClick({ detail }: CustomEvent) {
    this.promptVisible = false;
    setTimeout(() => {
      const items = detail?.map((s) => s.label);
      alert(`You have selected the following items: ${items}`);
    }, 200);
  }

  handleReportMessage() {
    this.moreOptionsVisible = false;
    setTimeout(() => {
      alert("Open report message form modal.");
    }, 200);
  }

  togglePrompVisibility() {
    this.promptVisible = !this.promptVisible;
    document.addEventListener("click", (event) => {
      if (!event.composedPath().includes(this)) {
        this.promptVisible = false;
      }
    });
  }

  toggleMoreOptionsVisibility() {
    this.moreOptionsVisible = !this.moreOptionsVisible;
    document.addEventListener("click", (event) => {
      if (!event.composedPath().includes(this)) {
        this.moreOptionsVisible = false;
      }
    });
  }

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Options</h1>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        The Comet Options component is a pop-up component a UI element that
        provides a list of choices to the user, similar to how the options menu
        works within a select component. This component is crucial for creating
        interactive and user-friendly interfaces, allowing users to make
        selections from a predefined set of options.
      </h3>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        Single select option
      </h3>
      <div
        id="firstOptionContainer"
        style="display: flex; gap: 24px; width: 100%; margin-top: 24px;"
      >
        <comet-options
          id="firstCometOptionsComponent"
          @option-change="${this.handleChange}"
          .items="${this.browsers}"
        >
        </comet-options>
        <comet-options
          @option-change="${this.handleChange}"
          .items="${this.carriers}"
        ></comet-options>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        With pre-selected value
      </h3>
      <div
        id="preSelectedSingleContainer"
        style="display: flex; gap: 24px; width: 100%; margin-top: 24px;"
      >
        <comet-options
          @option-change="${this.handleChange}"
          .items="${this.singleSelectedBrowsers}"
          .radioButton=${true}
        ></comet-options>
        <comet-options
          @option-change="${this.handleChange}"
          .items="${this.singleSelectedCarriers}"
          .radioButton=${true}
        >
        </comet-options>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        With search option
      </h3>

      <div style="display: flex; grid-gap: 24px;">
        <comet-options
          @option-change="${this.handleChange}"
          .items="${this.browsers}"
          .searchBar="${true}"
        ></comet-options>
        <comet-options
          .items="${this.carriers}"
          .searchBar="${true}"
          @option-change="${this.handleChange}"
        >
        </comet-options>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        Multi-Select option
      </h3>

      <div id="multiSelectContainer" style="display: flex; grid-gap: 24px;">
        <comet-options
          @option-change="${this.handleChange}"
          .items="${this.browsers}"
          .multiSelect=${true}
        ></comet-options>
        <comet-options
          .items="${this.carriersLong.sort((a, b) =>
            a.label.localeCompare(b.label)
          )}"
          @option-change="${this.handleChange}"
          @action-button-click=${this.handleActionButtonClick}
          .multiSelect=${true}
          buttonLabel="Submit selections"
        >
        </comet-options>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        Multi-Select with search option
      </h3>

      <div
        id="multiSelectContainerWithSearch"
        style="display: flex; grid-gap: 24px;"
      >
        <comet-options
          @option-change="${this.handleChange}"
          .searchBar="${true}"
          .items="${this.browsers}"
          .multiSelect=${true}
        ></comet-options>
        <comet-options
          .items="${this.carriersLong.sort((a, b) =>
            a.label.localeCompare(b.label)
          )}"
          .searchBar="${true}"
          @option-change="${this.handleChange}"
          @action-button-click=${this.handleActionButtonClick}
          .multiSelect=${true}
          .toggleButtonVisibility=${true}
          maxHeight="500px"
          title="Title"
          label="LABEL"
          description="description: Lorem ipsum dolor sit amet consectetur adipiscing elit commodo lacinia, feugiat hendrerit eros morbi dignissim dis non arcu, dui donec et erat magna ligula dictum sociosqu. Nec morbi leo rutrum a placerat ultricies quisque eu commodo cras arcu,."
          buttonLabel="Sumbit selections"
        >
        </comet-options>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        Multi-Select with pre-selected items
      </h3>

      <div
        id="preSelectedMultiContainer"
        style="display: flex; gap: 24px; margin-bottom: 24px"
      >
        <comet-options
          @option-change="${this.handleChange}"
          .items="${this.multiSelectedBrowsers}"
          .multiSelect=${true}
        ></comet-options>
        <comet-options
          @option-change="${this.handleChange}"
          .items="${this.multiSelectedCarriers}"
          .multiSelect=${true}
        >
        </comet-options>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        Usage Examples: Integrated Co-Pilot
      </h3>

      <div
        id="examplesContainer"
        style="display: flex; gap: 24px; margin-bottom: 24px;"
      >
        <div style="width: 33%">
          <div style="position: relative; top: -8px;">
            ${this.renderChooseTopicOptions()}
            <div
              @click=${this.togglePrompVisibility}
              tabindex="0"
              style="display: flex; align-items: center; width: max-content;"
            >
              <comet-icon
                name="copilot"
                type="three-dimensional"
                size="40"
                style="height: 40px;"
              ></comet-icon>
              <comet-icon
                name="${this.promptVisible
                  ? "arrow-drop-up"
                  : "arrow-drop-down"}"
                size="24"
                style="height: 24px;"
              ></comet-icon>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderChooseTopicOptions() {
    if (!this.promptVisible) return null;
    return html` <div
      style="position: absolute; left: 0; bottom: 50px; width: 250px;"
    >
      <comet-options
        .items="${this.chooseTopicsOptions}"
        .multiSelect=${true}
        .toggleButtonVisibility=${true}
        title="Co-Pilot"
        description="Tell me the topic and I'll provide you a prompt."
        label="TOPICS"
        buttonLabel="Submit selection"
        @action-button-click=${this.handleActionButtonClick}
      >
        <div
          slot="title"
          style="padding: 16px 12px; display: flex; align-items: center;"
        >
          <comet-icon
            name="copilot"
            type="three-dimensional"
            style="height: 32px;"
          ></comet-icon
          ><span
            style="padding-left: 12px; font-size: 1.275rem; color: var(--primary-50); font-weight: bold;"
            >Co-Pilot</span
          >
        </div>
      </comet-options>
    </div>`;
  }

  static styles = css`
    comet-options,
    vaadin-combo-box {
      width: 100%;
    }
  `;
}
