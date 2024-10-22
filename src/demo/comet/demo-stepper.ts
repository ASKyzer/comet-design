import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/stepper/comet-stepper";
import Stepper from "../../components/stepper/interfaces/stepper.interface";

@customElement("demo-stepper")
export class DemoStepperElement extends LitElement {
  @state() currentStepIndex = 0;
  @state()
  data: Stepper = {
    id: "aa",
    text: "hola",
    value: 2,
    steps: [
      {
        id: "1",
        caption: "STEP 1",
        description: "Insured Information",
        done: false,
        current: true,
      },
      {
        id: "2",
        caption: "STEP 2",
        description: "Price Selection",
        done: false,
        current: false,
      },
      {
        id: "3",
        caption: "STEP 3",
        description: "Contract",
        done: false,
        current: false,
      },
      {
        id: "4",
        caption: "STEP 4",
        description: "Summary",
        done: false,
        current: false,
      },
    ],
  };

  handleStepSubmit() {
    const newSteps = this.data.steps.map((step, index) => {
      step.done = this.currentStepIndex >= index ? true : false;
      step.current = index === this.currentStepIndex + 1 ? true : false;
      return step;
    });
    this.data = { ...this.data, steps: newSteps };
    this.currentStepIndex++;
  }

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Stepper</h1>

      <h3 style="color: var(--primary-50); margin: 48px 0">
        The Comet Stepper component renders each Comet Step component with the
        theme horizontal based on how many steps are needed in a process.
      </h3>
      ${this.data
        ? html` <div id="container">
            <comet-stepper .data=${this.data}> </comet-stepper>
            <div
              style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 200px;"
            >
              <h3>${this._getStepContent()}</h3>
              ${this.currentStepIndex < this.data.steps.length
                ? html` <comet-button
                    @click=${this.handleStepSubmit}
                    label="${this._getButtonLabel()}"
                    trailingIcon="arrow-right"
                  >
                  </comet-button>
            </div>`
                : null}
            </div>
          </div>`
        : null}
    `;
  }

  private _getStepContent() {
    if (this.currentStepIndex === this.data.steps.length)
      return "Congratulations!  Your application has been submitted";
    return `Step ${this.currentStepIndex + 1} Content`;
  }

  private _getButtonLabel() {
    if (this.currentStepIndex < this.data.steps.length - 1) return "Next step";
    return "Submit";
  }

  static styles = css``;
}
