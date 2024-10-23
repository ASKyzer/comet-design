import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/stepper/comet-step";

@customElement("demo-step")
export class DemoCometStep extends LitElement {
  public step;
  public productGroup;
  public selected;

  constructor() {
    super();
    this.step = {
      id: "1",
      caption: "Select Product",
      description: "Please select a related product",
      done: false,
    };

    this.productGroup = {
      id: "2",
      caption: "Select Product Group",
      description: "Please select one of those available product",
      done: false,
      helperText: "3 Available Products",
    };

    this.selected = "";
  }

  public get properties() {
    return {
      stepData: {
        id: String,
        caption: String,
        description: String,
        done: Boolean,
      },
      productGroupStepData: {
        id: String,
        caption: String,
        description: String,
        done: Boolean,
        helperText: String,
      },
    };
  }

  set stepData(val) {
    let oldVal = this.step;
    this.step = val;
    this.requestUpdate("stepData", oldVal);
  }

  get stepData() {
    return this.step;
  }

  set productGroupStepData(val) {
    let oldVal = this.step;
    this.productGroup = val;
    this.requestUpdate("productGroupStepData", oldVal);
  }

  get productGroupStepData() {
    return this.productGroup;
  }

  set selectedGroup(val) {
    let oldVal = this.step;
    this.selected = val;
    this.requestUpdate("selectedGroup", oldVal);
  }

  get selectedGroup() {
    return this.selected;
  }

  @state()
  private items = ["Denal", "Health", "Life", "Motor"];

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Step</h1>

      <h3 style="color: var(--primary-50); margin: 32px 0">
        The Comet Step vertical theme is the defalut theme. It has optional
        label(caption), description, and helper text. The content of the step is
        a slot that can take anything the user wants to render.
      </h3>

      <div id="vertical-stepper-container">
        <div id="step-container" style="margin-bottom: 16px;">
          <comet-step
            id="first-step"
            theme="vertical"
            .step="${this.productGroupStepData}"
          >
            <div style="display: flex; padding-top: 8px;">
              ${this.renderProductGroupPills()}
            </div>
          </comet-step>
        </div>

        <comet-step .step=${this.stepData} style="width: 100%;">
          <vaadin-combo-box
            label="Select Product"
            placeholder="Select"
            .items="${this.items}"
            .disabled="${!this.selectedGroup}"
            @change="${() => {
              this.stepData = { ...this.stepData, done: true };
            }}"
            style="width: 100%; max-width: 400px; padding-top: 24px;"
          ></vaadin-combo-box>
        </comet-step>
      </div>

      <h3 style="color: var(--primary-50); margin: 48px 0 32px">
        The Comet Step horizontal theme is a bit different in that it does not
        take any content and the label and description is below the icon. This
        is best used in ways like the
        <a href="/stepper" style="color: var(--neutral-80)">Comet Stepper</a>
        where there is a serious of actions before a process is completed.
      </h3>

      ${this.renderHorizontalStep()}
    `;
  }

  renderHorizontalStep() {
    const config = {
      id: "1",
      caption: "STEP 2",
      description: "Insured Information",
      done: true,
      current: false,
    };
    return html`
      <comet-step .step=${config} theme="horizontal" style="width: 100%;">
      </comet-step>
    `;
  }

  selectProductGroup(product: string) {
    this.selectedGroup = product;
    this.productGroup = { ...this.productGroup, done: true };
  }

  renderProductGroupPills() {
    const productGroupConfig = [
      {
        icon: "health",
        label: "Health",
        type: "health",
      },
      {
        icon: "car",
        label: "Car",
        type: "car",
      },
      {
        icon: "travel",
        label: "Travel",
        type: "travel",
      },
    ];

    return html`
      ${productGroupConfig.map((c) => {
        return html`
          <div
            @click="${() => this.selectProductGroup(c.type)}"
            class="product-group-item ${this.selectedGroup === c.type
              ? "selected"
              : ""}"
          >
            <comet-icon
              slot="prefix"
              name="${c.icon}"
              type="three-dimensional"
              style="margin-right: 8px; margin-top: 4px;"
              size="20"
            ></comet-icon>
            <span>${c.label}</span>
          </div>
        `;
      })}
    `;
  }

  static styles = css`
    .product-group-item {
      color: var(--primary-50);
      background-color: var(--neutral-0);
      margin-right: 16px;
      margin-top: 16px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      border: 1px solid var(--primary-50);
      width: fit-content;
      border-radius: 50px;
      margin-bottom: 16px;
      cursor: pointer;
    }

    .product-group-item.selected {
      color: var(--neutral-0);
      background-color: var(--primary-50);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-step": DemoCometStep;
  }
}
