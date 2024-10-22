import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "./comet-step";
import Stepper from "./interfaces/stepper.interface";

@customElement("comet-stepper")
export class CometStepper extends LitElement {
  @property({ type: Object })
  data: Stepper | undefined;

  render() {
    return html`
      <div part="comet-stepper-container" class="container">
        ${this.data?.steps.map((s, i) => {
          const isLastStep = i + 1 === this.data?.steps?.length;
          return html` <comet-step
            class="step ${isLastStep ? "compressed" : ""}"
            .isLastStep="${isLastStep}"
            .step=${{ ...s }}
            theme="horizontal"
          ></comet-step>`;
        })}
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .container {
      display: inline-flex;
      width: 100%;
    }

    .step {
      width: 100%;
    }

    .step.compressed {
      width: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-stepper": CometStepper;
  }
}
