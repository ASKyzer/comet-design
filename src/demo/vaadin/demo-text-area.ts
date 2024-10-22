import "@vaadin/text-area";
import { TextAreaValueChangedEvent } from "@vaadin/text-area";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-text-area")
export class DemoTextArea extends LitElement {
  private loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel semper libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.

  Proin volutpat, sapien ut facilisis ultricies, eros purus blandit velit, at ultrices mi libero quis ante. Curabitur scelerisque metus et libero convallis consequat. Pellentesque feugiat pulvinar nisl sed pellentesque.`;

  private charLimit = 600;

  @state()
  private text = "Great job. This is excellent!";

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">vaadin Text Area</h1>

      <div class="text">
        Text Area is an input field component for multi-line text input
      </div>

      <vaadin-text-area
        label="Description"
        value="${this.loremIpsum}"
        style="width:100%"
      ></vaadin-text-area>

      <vaadin-text-area
        label="Comment"
        .maxlength="${this.charLimit}"
        .value="${this.text}"
        .helperText="${`${this.text.length}/${this.charLimit}`}"
        @value-changed="${(event: TextAreaValueChangedEvent) => {
          this.text = event.detail.value;
        }}"
        style="width:100%"
      ></vaadin-text-area>

      <vaadin-text-area
        label="Label"
        helper-text="Helper text"
        placeholder="Placeholder"
        clear-button-visible
        style="width:100%"
      >
        <comet-icon
          slot="prefix"
          name="sunset-sea"
          size="24"
          primaryColor="neutral-60"
        ></comet-icon>
        <span slot="suffix">:)</span>
      </vaadin-text-area>

      <vaadin-text-area
        required
        minlength="5"
        maxlength="50"
        pattern="^[A-Z]([A-Za-z0-9,-s])*.$"
        allowed-char-pattern="[A-Za-z0-9,.-s]"
        label="Sentence"
        helper-text="Must be one complete sentence ending in a period, between 5 and 50 characters long"
        style="width:100%"
      >
        <div slot="error-message">Required</div>
      </vaadin-text-area>

      <vaadin-text-area
        readonly
        label="Read-only"
        value="Value"
        style="width:100%"
      ></vaadin-text-area>

      <vaadin-text-area
        disabled
        label="Disabled"
        helper-text="Disabled helper text"
        style="width:100%"
      ></vaadin-text-area>

      <vaadin-text-area
        theme="align-right small helper-above-field"
        label="Label"
        helper-text="Helper text"
        value="Value"
        style="--vaadin-input-field-border-width: 1px; width: 100%;"
      >
      </vaadin-text-area>

      <vaadin-text-area
        label="Invalid"
        helper-text="Helper text"
        placeholder="Placeholder"
        clear-button-visible
        style="width:100%"
        required
        invalid
      >
        <comet-icon
          slot="prefix"
          name="sunset-sea"
          size="24"
          primaryColor="neutral-60"
        ></comet-icon>
        <span slot="suffix">:)</span>
        <div slot="error-message">Required field</div>
      </vaadin-text-area>

      <vaadin-text-area
        label="Description"
        .maxlength="600"
        .value="${this.loremIpsum}"
        .helperText="${`${this.text.length}/${this.charLimit}`}"
        @value-changed="${(event: TextAreaValueChangedEvent) => {
          this.text = event.detail.value;
        }}"
        style="width:100%"
      ></vaadin-text-area>
    `;
  }

  static styles = css`
    .text {
      color: var(--primary-60);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-text-area": DemoTextArea;
  }
}
