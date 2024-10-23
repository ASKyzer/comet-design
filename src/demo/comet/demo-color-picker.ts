import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/color-picker/comet-color-picker";

@customElement("demo-color-picker")
export class DemoColorPicker extends LitElement {
  @state() cometColor = "";
  @state() materialColor = "";
  @state() cometColorSmall = "";
  @state() materialColorSmall = "";

  handleColorChangeComet({ detail }) {
    this.cometColor = detail.color;
  }

  handleColorChangeMaterial({ detail }) {
    this.materialColor = detail.color;
  }

  handleColorChangeCometSmall({ detail }) {
    this.cometColorSmall = detail.color;
  }

  handleColorChangeMaterialSmall({ detail }) {
    this.materialColorSmall = detail.color;
  }

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        Comet Color Picker
      </h1>

      <div style="display: flex; gap: 48px; margin-bottom: 48px;">
        <div style="display: flex; gap: 48px">
          <div class="container" id="color-picker">
            <h3 style="margin: 0 0 8px;">palette: comet</h3>
            <h3 style="margin: 0 0 16px;">theme: small</h3>
            <comet-color-picker
              @color-change=${this.handleColorChangeCometSmall}
              theme="small"
              .initialColor=${{ color_index: 2, variation_index: 7 }}
            ></comet-color-picker>
          </div>
          <div class="container" id="color-picker">
            <h3 style="margin: 0 0 8px;">palette: material</h3>
            <h3 style="margin: 0 0 16px;">theme: small</h3>
            <comet-color-picker
              @color-change=${this.handleColorChangeMaterialSmall}
              theme="small"
              palette="material"
              .initialColor=${{ color_index: 8, variation_index: 6 }}
            ></comet-color-picker>
          </div>
        </div>
        <div>
          <div>
            Comet Color: <span>${this.cometColorSmall.toUpperCase()}</span>
          </div>
          <div
            style="background-color: ${this
              .cometColorSmall}; border: 1px solid var(--neutral-50); border-radius: 12px; margin-top: 8px; width: 250px; height: 40px;  margin-bottom: 24px;"
          ></div>
          <div>
            Material Color:
            <span>${this.materialColorSmall.toUpperCase()}</span>
          </div>
          <div
            style="background-color: ${this
              .materialColorSmall}; border: 1px solid var(--neutral-50); border-radius: 12px; margin-top: 8px; width: 250px; height: 40px; "
          ></div>
        </div>
      </div>

      <div style="display: flex; gap: 48px">
        <div style="display: flex; gap: 48px;">
          <div class="container" id="color-picker">
            <h3 style="margin: 0 0 8px;">palette: comet</h3>
            <h3 style="margin: 0 0 16px;">theme: default</h3>
            <comet-color-picker
              @color-change=${this.handleColorChangeComet}
            ></comet-color-picker>
          </div>
          <div class="container" id="color-picker">
            <h3 style="margin: 0 0 8px;">palette: material</h3>
            <h3 style="margin: 0 0 16px;">theme: default</h3>
            <comet-color-picker
              @color-change=${this.handleColorChangeMaterial}
              palette="material"
            ></comet-color-picker>
          </div>
        </div>
        <div>
          <div>Comet Color: <span>${this.cometColor.toUpperCase()}</span></div>
          <div
            style="background-color: ${this
              .cometColor}; border: 1px solid var(--neutral-50); border-radius: 12px; margin-top: 8px; width: 250px; height: 40px;  margin-bottom: 24px;"
          ></div>
          <div>
            Material Color: <span>${this.materialColor.toUpperCase()}</span>
          </div>
          <div
            style="background-color: ${this
              .materialColor}; border: 1px solid var(--neutral-50); border-radius: 12px; margin-top: 8px; width: 250px; height: 40px; "
          ></div>
        </div>
      </div>
    `;
  }

  static styles = css``;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-color-picker": DemoColorPicker;
  }
}
