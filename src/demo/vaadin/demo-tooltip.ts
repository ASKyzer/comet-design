import "@vaadin/horizontal-layout";
import "@vaadin/tooltip";
import "@vaadin/vertical-layout";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("demo-tooltip")
export class DemoTooltip extends LitElement {
  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0;">vaadin Tooltip</h1>

      <vaadin-vertical-layout theme="spacing">
        <vaadin-horizontal-layout theme="spacing">
          <h2 id="heading-1">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-light"
              for="heading-1"
              position="bottom-start"
              text="Tooltip with position bottom-start"
            ></vaadin-tooltip>
          </h2>

          <h2 id="heading-2">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-light"
              for="heading-2"
              position="bottom"
              text="Tooltip with position bottom"
            ></vaadin-tooltip>
          </h2>

          <h2 id="heading-3">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-light"
              for="heading-3"
              position="bottom-end"
              text="Tooltip with position bottom-end"
            ></vaadin-tooltip>
          </h2>
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout theme="spacing">
          <h2 id="heading-4">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-light"
              for="heading-4"
              position="end"
              text="Tooltip with position end"
            ></vaadin-tooltip>
          </h2>

          <h2 id="heading-5">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-light"
              for="heading-5"
              position="start"
              text="Tooltip with position start"
            ></vaadin-tooltip>
          </h2>
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout theme="spacing">
          <h2 id="heading-6">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-light"
              for="heading-6"
              position="top-start"
              text="Tooltip with position top-start"
            ></vaadin-tooltip>
          </h2>

          <h2 id="heading-7">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-light"
              for="heading-7"
              position="top"
              text="Tooltip with position top"
            ></vaadin-tooltip>
          </h2>

          <h2 id="heading-8">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-light"
              for="heading-8"
              position="top-end"
              text="Tooltip with position top-end"
            ></vaadin-tooltip>
          </h2>
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>

      <vaadin-vertical-layout theme="spacing">
        <vaadin-horizontal-layout theme="spacing">
          <h2 id="heading-9">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-dark"
              for="heading-9"
              position="bottom-start"
              text="Tooltip with position bottom-start"
            ></vaadin-tooltip>
          </h2>

          <h2 id="heading-10">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-dark"
              for="heading-10"
              position="bottom"
              text="Tooltip with position bottom"
            ></vaadin-tooltip>
          </h2>

          <h2 id="heading-11">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-dark"
              for="heading-11"
              position="bottom-end"
              text="Tooltip with position bottom-end"
            ></vaadin-tooltip>
          </h2>
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout theme="spacing">
          <h2 id="heading-12">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-dark"
              for="heading-12"
              position="end"
              text="Tooltip with position end"
            ></vaadin-tooltip>
          </h2>

          <h2 id="heading-13">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-dark"
              for="heading-13"
              position="start"
              text="Tooltip with position start"
            ></vaadin-tooltip>
          </h2>
        </vaadin-horizontal-layout>
        <vaadin-horizontal-layout theme="spacing">
          <h2 id="heading-14">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-dark"
              for="heading-14"
              position="top-end"
              text="Tooltip with position top-end"
            ></vaadin-tooltip>
          </h2>

          <h2 id="heading-15">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-dark"
              for="heading-15"
              position="top"
              text="Tooltip with position top"
            ></vaadin-tooltip>
          </h2>

          <h2 id="heading-16">
            h2 with tooltip
            <vaadin-tooltip
              overlay-class="theme-dark"
              for="heading-16"
              position="top-start"
              text="Tooltip with position top-start"
            ></vaadin-tooltip>
          </h2>
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
    `;
  }

  static styles = css`
    vaadin-vertical-layout {
      width: 624px;
      height: 300px;
      justify-content: center;

      padding: 0 20px;
      border-radius: 8px;
    }

    vaadin-horizontal-layout {
      width: 100%;
      justify-content: space-between;
    }

    vaadin-vertical-layout:last-child {
      background-color: var(--neutral-100);
    }

    vaadin-vertical-layout:last-child h2 {
      color: var(--neutral-0);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-tooltip": DemoTooltip;
  }
}
