import "@vaadin/button";
import "@vaadin/horizontal-layout";
import "@vaadin/progress-bar";
import "@vaadin/vertical-layout";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-progress-bar")
export class DemoProgressBar extends LitElement {
  @property()
  public uploadText: string = "Upload files...";

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Progress Bar
      </h1>

      <div class="container">
        <comet-card>
          <div class="progress-bar-container">
            <h3>Determinate:</h3>
            <div style="color: var(--primary-90);">
              <div>Processing Financials.xlsx (50%)</div>
              <vaadin-progress-bar value="0.5"></vaadin-progress-bar>
            </div>
          </div>
        </comet-card>
      </div>

      <div class="container">
        <comet-card>
          <div class="progress-bar-container">
            <h3>Indeterminate:</h3>
            <div style="color: var(--primary-90);">
              <div>Generating report...</div>
              <vaadin-progress-bar indeterminate></vaadin-progress-bar>
            </div>
          </div>
        </comet-card>
      </div>

      <div class="container">
        <comet-card>
          <div class="progress-bar-container">
            <h3>Bounds and Initial Value:</h3>
            <div style="color: var(--primary-90);">
              <div>Processing files (50/100)</div>
              <vaadin-progress-bar
                min="0"
                max="100"
                value="50"
              ></vaadin-progress-bar>
            </div>
          </div>
        </comet-card>
      </div>

      <div class="container">
        <comet-card>
          <div class="progress-bar-container">
            <h3>Theme variants:</h3>
            <div style="color: var(--primary-90);">
              <div>Processing files (50/100)</div>
              <vaadin-vertical-layout
                theme="spacing"
                style="color: var(--neutral-70);"
              >
                <div style="width: 100%;">
                  <div>Transferring files... (60/120)</div>
                  <vaadin-progress-bar
                    value="0.5"
                    theme="contrast"
                  ></vaadin-progress-bar>
                </div>

                <div style="width: 100%;">
                  <div>Tasks (15/20)</div>
                  <vaadin-progress-bar
                    value="0.75"
                    theme="success"
                  ></vaadin-progress-bar>
                </div>

                <div style="width: 100%;">
                  <div>Tasks (4/20)</div>
                  <vaadin-progress-bar
                    value="0.2"
                    theme="error"
                  ></vaadin-progress-bar>
                </div>
              </vaadin-vertical-layout>
            </div>
          </div>
        </comet-card>
      </div>

      <div class="container">
        <comet-card>
          <div class="progress-bar-container">
            <h3>With estimate completion time:</h3>
            <div style="color: var(--primary-90);">
              <div>Generating report...</div>
              <vaadin-progress-bar indeterminate></vaadin-progress-bar>
              <div style="font-size: var(--lumo-font-size-xs)">
                Process can take upwards of 10 minutes
              </div>
            </div>
          </div>
        </comet-card>
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

    .container {
      background-color: var(--neutral-10);
      padding: 24px 48px;
    }

    .progress-bar-container {
      padding: 20px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-progress-bar": DemoProgressBar;
  }
}
