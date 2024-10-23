import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/icon/comet-icon";
import "../../components/pill/comet-pill";

@customElement("demo-comet-pill")
export class DemoCometPill extends LitElement {
  @state() selected = false;

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Pill</h1>

      <div class="demo-comet-pill-main">
        <div class="demo-comet-pill-row">
          <h2>Unselectable pill</h2>

          <comet-pill
            .label=${"Unselectable pill"}
            leadingIcon="motorcycle"
            iconTheme="three-dimensional"
            label="3D Icon"
            id="unselectable-pill"
          >
          </comet-pill>
        </div>

        <div class="demo-comet-pill-row">
          <h2>Selectable pill</h2>

          <comet-pill
            .label=${"Selectable pill"}
            leadingIcon="globe"
            iconTheme="ui"
            .selectable=${true}
            @click=${() => (this.selected = !this.selected)}
            theme="primary ${this.selected ? "dark" : "default"}"
            id="selectable-pill"
          >
          </comet-pill>
        </div>

        <div class="demo-comet-pill-row">
          <h2>Icon pill</h2>

          <comet-pill
            leadingIcon="motorcycle"
            iconTheme="three-dimensional"
            theme="primary default"
            id="icon-pill"
          >
          </comet-pill>
        </div>

        <div id="sizes-container">
          <h2 style="margin-bottom: 0">Sizes</h2>
          <div class="sizes">
            <comet-pill
              size="small"
              label="Small"
              leadingIcon="life"
              iconTheme="three-dimensional"
              theme="secondary dark"
            >
            </comet-pill>
            <comet-pill
              label="Default"
              leadingIcon="life"
              iconTheme="three-dimensional"
              theme="secondary dark"
            >
            </comet-pill>
            <comet-pill
              size="large"
              label="Large"
              leadingIcon="life"
              iconTheme="three-dimensional"
              theme="secondary dark"
            >
            </comet-pill>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .demo-comet-pill-main {
      display: flex;
      flex-direction: column;
      row-gap: 2em;
      justify-content: center;
    }

    .button-wrapper {
      display: inline-flex;
    }

    .demo-comet-pill-row {
      display: inline-flex;
      flex-direction: column;
    }

    .sizes {
      display: flex;
      gap: 24px;
      align-items: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-comet-pill": DemoCometPill;
  }
}
