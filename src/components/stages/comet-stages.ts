import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icon/comet-icon";
import { StageItem } from "./interfaces/stage-item.interface";
import { polygons } from "./polygons";

@customElement("comet-stages")
export class CometStages extends LitElement {
  @property({ type: Array }) stages: StageItem[] | undefined;

  private _getIconName(state: string) {
    if (state === "done") {
      return "step-done";
    }
    return "step-next";
  }

  private _selectItem(item: StageItem) {
    if (item.state !== "disabled") {
      this.dispatchEvent(
        new CustomEvent("navigate", {
          bubbles: true,
          composed: true,
          detail: item,
        })
      );
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    this._scrollToActiveStage();
  }

  private _scrollToActiveStage() {
    const activeStage = this.shadowRoot?.querySelector(
      ".stage__icon--active"
    ) as HTMLElement | null;
    if (activeStage) {
      activeStage.scrollIntoView({ inline: "start", behavior: "smooth" });
    }
  }

  render() {
    return html`
      <ul class="stages">
        ${this.stages?.map((item, index) => {
          return html`
            <li
              data-testid="${"stage" + index}"
              @click="${() => this._selectItem(item)}"
              class="${`stage stage--${item.state}`}"
            >
              <div class="${`stage__content stage__content--${item.state}`}">
                <comet-icon
                  type="ui"
                  name="${this._getIconName(item.state)}"
                  class="stage__icon stage__icon--${item.state}"
                ></comet-icon>
                <div class="stage__texts">
                  <span class="${`stage__title stage__title--${item.state}`}">
                    ${item.title}
                  </span>
                  <span
                    class="${`stage__subtitle stage__subtitle--${item.state}`}"
                  >
                    ${item.subtitle}
                  </span>
                </div>
                <comet-icon
                  type="${item.icon_type || "three-dimensional"}"
                  name="${item.icon}"
                ></comet-icon>
              </div>
            </li>
          `;
        })}
      </ul>
    `;
  }

  static styles = [
    polygons,
    css`
      :host {
        font-family: var(--lumo-font-family);
        font-size: 1rem;
      }

      .stages {
        display: flex;
        margin: 0;
        padding: 0;
        align-items: center;
        list-style: none;
        overflow: auto;
      }

      .stage {
        width: 100%;
        margin-bottom: 0.5rem;
        padding: 0.05rem 0.075rem;
        background: var(--neutral-60);
        cursor: pointer;
        clip-path: var(--polygon-middle-stage);
        -webkit-clip-path: var(--polygon-middle-stage);
      }

      .stage--done {
        background: var(--primary-60);
      }

      .stage--active {
        background: var(--primary-60);
      }

      .stage--disabled {
        cursor: default;
        background: var(--neutral-50);
      }

      .stage:first-child {
        clip-path: var(--polygon-first-stage);
        -webkit-clip-path: var(--polygon-first-stage);
      }

      .stage:last-child {
        clip-path: var(--polygon-last-stage);
        -webkit-clip-path: var(--polygon-last-stage);
      }

      .stage:first-child .stage__content {
        padding-left: 0.5rem;
        clip-path: var(--polygon-first-stage);
        -webkit-clip-path: var(--polygon-first-stage);
      }

      .stage:last-child .stage__content {
        clip-path: var(--polygon-last-stage);
        -webkit-clip-path: var(--polygon-last-stage);
      }

      .stage__content {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex: 100%;
        padding: 0.5rem 1.5rem 0.5rem 1.5rem;
        background: var(--neutral-0);
        clip-path: var(--polygon-middle-stage);
        -webkit-clip-path: var(--polygon-middle-stage);
      }

      .stage__content--done {
        background: var(--primary-60);
      }

      .stage__icon {
        padding-top: 0.25rem;
      }

      .stage__icon--done {
        --primary-50: var(--success-50);
      }

      .stage__icon--next {
        --primary-50: var(--neutral-60);
      }

      .stage__icon--disabled {
        --primary-50: var(--neutral-50);
      }

      .stage__texts {
        display: flex;
        flex-direction: column;
        margin: 0 0.5rem;
      }

      .stage__title {
        font-size: 0.875rem;
        font-weight: 600;
        line-height: 1.5rem;
        letter-spacing: 0em;
        text-align: left;
        white-space: nowrap;
      }

      .stage__title--done {
        color: var(--neutral-0);
      }

      .stage__title--active {
        color: var(--primary-50);
      }

      .stage__title--disabled {
        color: var(--neutral-50);
      }

      .stage__subtitle {
        font-size: 0.75rem;
        font-weight: 400;
        line-height: 1rem;
        letter-spacing: 0;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .stage__subtitle--done {
        color: var(--neutral-0);
      }

      .stage__subtitle--active {
        color: var(--primary-50);
      }

      .stage__subtitle--next {
        color: var(--neutral-60);
      }

      .stage__subtitle--disabled {
        color: var(--neutral-50);
      }
    `,
  ];
}
