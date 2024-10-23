import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/options/comet-options";
import { categorizedItem } from "../../components/options/comet-options";
import {
  EASTERN_STATES,
  NORTHERN_STATES,
  preSelectedMassCity,
  preSelectedPennCities,
  SOUTHERN_STATES,
  WESTERN_STATES,
} from "../constants/options-categories";

@customElement("demo-options-categorized")
export class DemoOptionsCategorized extends LitElement {
  @state() promptVisible = false;
  @state() moreOptionsVisible = false;
  @state() region;
  @state() selectedRegion: string = "";
  @state() selectedCategory: string = "";
  @state() selectedItem: string = "";
  @state() category: string = "";
  @state() item: string = "";
  @state() multiSelectedItems: categorizedItem[] = [];
  @state() multiSelectRegions: categorizedItem[] = [];
  @state() preSelectedSingleCity: categorizedItem[] = [];

  public easternStates = EASTERN_STATES;
  public westernStates = WESTERN_STATES;
  public northernStates = NORTHERN_STATES;
  public southernStates = SOUTHERN_STATES;

  constructor() {
    super();
    this.region = this.easternStates;

    this.preSelectedSingleCity = this.parse(this.region).map((r) => {
      if (r.category.value === "MA") {
        r = preSelectedMassCity;
      }

      return r;
    });
    this.multiSelectRegions = this.parse(this.region).map((r) => {
      if (r.category.value === "MA") {
        r = preSelectedMassCity;
      }
      if (r.category.value === "PA") {
        r = preSelectedPennCities;
      }
      return r;
    });
  }

  parse(items) {
    return JSON.parse(JSON.stringify(items));
  }

  handleChangeFirstCard({ detail }: CustomEvent) {
    if (detail) {
      const { category, items } = detail;
      this.selectedCategory = category?.label;
      this.selectedItem = items[0]?.label;
    }
  }

  handleChangeSecondCard({ detail }: CustomEvent) {
    if (detail) {
      const { category, items } = detail;
      this.category = category?.label;
      this.item = items[0]?.label;
    }
  }

  handleActionButtonClick({ detail }: CustomEvent) {
    if (detail) {
      const { category, items } = detail;
      if (category && items) {
        setTimeout(() => {
          alert(`You selected city is ${items[0].label}, ${category.label}`);
        }, 200);
      }
    }
  }

  getRegion(cat?) {
    if (cat) {
      const state = cat[0].category?.value;
      switch (state) {
        case "NY":
          return "EAST COAST";
        case "CA":
          return "WEST";
        case "IL":
          return "NORTH";
        case "TX":
          return "SOUTH";
      }
    }
  }

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Options with Categories</h1>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        This demonstrates the usage of the Comet Options component to render lists with different categories. The
        categories are displayed using the vaadin tabs and the list items are displayed as they normally would in the
        options component.
      </h3>

      <h3 style="color: var(--primary-50); margin-top: 24px"></h3>
      <div id="firstOptionContainer">
        <h3>Choose your Region</h3>
        <div style="width: 100%; display: inline-flex; gap: 16px; margin-bottom: 24px;">
          <comet-pill
            .selectable=${true}
            label="East"
            @click=${() => (this.region = this.easternStates)}
            theme="primary ${
              this.getRegion(this.region) === "EAST COAST" ? "dark" : "default"
            }"
          ></comet-pill>
          <comet-pill
            .selectable=${true}
            label="West"
            @click=${() => (this.region = this.westernStates)}
            theme="primary ${
              this.getRegion(this.region) === "WEST" ? "dark" : "default"
            }"
          ></comet-pill>
          <comet-pill
            .selectable=${true}
            label="North"
            @click=${() => (this.region = this.northernStates)}
            theme="primary ${
              this.getRegion(this.region) === "NORTH" ? "dark" : "default"
            }"
          ></comet-pill>
          <comet-pill
            .selectable=${true}
            label="South"
            @click=${() => (this.region = this.southernStates)}
            theme="primary ${
              this.getRegion(this.region) === "SOUTH" ? "dark" : "default"
            }"
          ></comet-pill>
        </div>
        <div style="display: flex; gap: 24px; width: 100%;">
          <comet-options
            .categorizedItems="${this.region}"
            .searchBar="${true}"
            .toggleButtonVisibility=${true}
            @option-change="${this.handleChangeFirstCard}"
            @action-button-click=${this.handleActionButtonClick}
            radioButton=${true}
            title="States by Region"
            label=${this.getRegion(this.region)}
            description="description: Lorem ipsum dolor sit amet consectetur adipiscing elit commodo lacinia, feugiat hendrerit eros morbi dignissim dis non arcu, dui donec et erat magna ligula dictum sociosqu. Nec morbi leo rutrum a placerat ultricies quisque eu commodo cras arcu."
            buttonLabel="Sumbit selection"
            style="width: 550px;"
          >
          </comet-options>
          <div>
            <p>Selected Category: ${this.selectedCategory}</p>
            <p>Selected Item: ${this.selectedItem}</p>
          </div>
        </div>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px">With pre-selected category and item</h3>
      <div id="secondContainer">
        <div style="display: flex; gap: 24px; width: 100%;">
          <comet-options
            .categorizedItems="${this.preSelectedSingleCity}"
            .toggleButtonVisibility=${false}
            @option-change="${this.handleChangeSecondCard}"
            @action-button-click=${this.handleActionButtonClick}
            title="States by Region"
            label=${this.getRegion(this.preSelectedSingleCity)}
            description="description: Lorem ipsum dolor sit amet consectetur adipiscing elit commodo lacinia, feugiat hendrerit eros morbi dignissim dis non arcu, dui donec et erat magna ligula dictum sociosqu. Nec morbi leo rutrum a placerat ultricies quisque eu commodo cras arcu."
            buttonLabel="Sumbit request"
          >
          </comet-options>
          <div>
            <p>Selected Category: ${this.category}</p>
            <p>Selected Item: ${this.item}</p>
          </div>
        </div>

        <h3>Choose your Region</h3>
        <div style="width: 100%; display: inline-flex; gap: 16px; margin-bottom: 24px;">
          <comet-pill
            .selectable=${true}
            label="East"
            @click=${() =>
              (this.preSelectedSingleCity = this.parse(this.region).map((r) => {
                if (r.category.value === "MA") {
                  r = preSelectedMassCity;
                }

                return r;
              }))}
            theme="primary ${
              this.getRegion(this.preSelectedSingleCity) === "EAST COAST"
                ? "dark"
                : "default"
            }"
          ></comet-pill>
          <comet-pill
            .selectable=${true}
            label="West"
            @click=${() => (this.preSelectedSingleCity = this.westernStates)}
            theme="primary ${
              this.getRegion(this.preSelectedSingleCity) === "WEST"
                ? "dark"
                : "default"
            }"
          ></comet-pill>
          <comet-pill
            .selectable=${true}
            label="North"
            @click=${() => (this.preSelectedSingleCity = this.northernStates)}
            theme="primary ${
              this.getRegion(this.preSelectedSingleCity) === "NORTH"
                ? "dark"
                : "default"
            }"
          ></comet-pill>
          <comet-pill
            .selectable=${true}
            label="South"
            @click=${() => (this.preSelectedSingleCity = this.southernStates)}
            theme="primary ${
              this.getRegion(this.preSelectedSingleCity) === "SOUTH"
                ? "dark"
                : "default"
            }"
          ></comet-pill>
        </div>
      </div>

        <h3 style="color: var(--primary-50); margin-top: 24px">Demo Fixed Height & Multi-Selections</h3>
        <p>
          If, when searching, and the shrinking of the container is not desired, determin the height of the vaadin
          tabsheet with all it's content and then pass that onto the component with the property fixedHeight. In this
          case, it is 292.
        </p>

        <div id="thirdContainer" class="fixed-height" style="min-width: 500px; margin-top: 24px;">
          <h3>Choose your Region</h3>
          <div style="width: 100%; display: inline-flex; gap: 16px; margin-bottom: 24px;">
            <comet-pill
              .selectable=${true}
              label="East"
              @click=${() =>
                (this.multiSelectRegions = this.parse(this.region).map((r) => {
                  if (r.category.value === "MA") {
                    r = preSelectedMassCity;
                  }
                  if (r.category.value === "PA") {
                    r = preSelectedPennCities;
                  }
                  return r;
                }))}
              theme="primary ${
                this.getRegion(this.multiSelectRegions) === "EAST COAST"
                  ? "dark"
                  : "default"
              }"
            ></comet-pill>
            <comet-pill
              .selectable=${true}
              label="West"
              @click=${() => (this.multiSelectRegions = this.westernStates)}
              theme="primary ${
                this.getRegion(this.multiSelectRegions) === "WEST"
                  ? "dark"
                  : "default"
              }"
            ></comet-pill>
            <comet-pill
              .selectable=${true}
              label="North"
              @click=${() => (this.multiSelectRegions = this.northernStates)}
              theme="primary ${
                this.getRegion(this.multiSelectRegions) === "NORTH"
                  ? "dark"
                  : "default"
              }"
            ></comet-pill>
            <comet-pill
              .selectable=${true}
              label="South"
              @click=${() => (this.multiSelectRegions = this.southernStates)}
              theme="primary ${
                this.getRegion(this.multiSelectRegions) === "SOUTH"
                  ? "dark"
                  : "default"
              }"
            ></comet-pill>
          </div>
          <div style="display: flex; gap: 24px; width: 100%;">
            <comet-options
              .categorizedItems="${this.multiSelectRegions}"
              .searchBar="${true}"
              .multiSelect="${true}"
              .toggleButtonVisibility=${true}
              .fixedHeight="${316}"
              @option-change="${this.handleMultiSelectChange}"
              title="States by Region"
              label=${this.getRegion(this.multiSelectRegions)}
              description="description: Lorem ipsum dolor sit amet consectetur adipiscing elit commodo lacinia, feugiat hendrerit eros morbi dignissim dis non arcu, dui donec et erat magna ligula dictum sociosqu. Nec morbi leo rutrum a placerat ultricies quisque eu commodo cras arcu."
              buttonLabel="Sumbit selection"
              style="width: 550px;"
            >
            </comet-options>

            ${
              this.multiSelectedItems?.length
                ? this.multiSelectedItems?.map(
                    (item, i) => html` <div style="margin-top: 24px;">
                      <div>State: ${item.category.label}</div>
                      Cities:
                      <ol style="margin-top: 4px;">
                        ${item.items.map((li) => html` <li>${li.label}</li> `)}
                      </ol>
                    </div>`
                  )
                : null
            }
          </div>
        </div>
      </div>
    `;
  }

  handleMultiSelectChange({ detail }) {
    this.multiSelectedItems = detail;
  }

  static styles = css`
    vaadin-combo-box {
      width: 100%;
    }

    comet-options {
      max-width: 500px;
      width: 100%;
    }

    ::part(options-container) {
      border-radius: 16px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-options-categorized": DemoOptionsCategorized;
  }
}
