import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

interface DetailCardItem {
  label: string;
  value: string;
}

@customElement("comet-details-card")
export class CustomDetailsCard extends LitElement {
  @property() public items: DetailCardItem[] = [];
  @property({ type: String }) public title: string = "";
  @property({ type: Boolean }) public twoColumns = false;
  @property() public theme: "horizontal" | "vertical" = "horizontal";
  @property({ type: Boolean }) public underlined = false;

  firstUpdated() {
    const slot = this.shadowRoot.querySelector("#action-slot") as any;
    if (slot?.assignedNodes()?.length) {
      let actionSlot = this.shadowRoot.getElementById("title-container");
      actionSlot.classList.add("--slotted");
    }
  }

  render() {
    return html`
      <div part="comet-card-container" class="main" theme=${this.theme}>
        <div id="title-container" class="title" part="title-container">
          <h3 data-testid="title-${this.title}">${this.title}</h3>
          <slot
            data-testid="header-action-button-slot"
            id="action-slot"
            name="action-button"
          ></slot>
        </div>

        <div class="card-small" data-testid="small-card-slot">
          <slot></slot>
        </div>

        <div
          class="content ${this.twoColumns ? "two-columns" : ""}"
          part="content-container"
        >
          ${this.items.map(
            (item) => html`
              <div
                class="content-item ${this.underlined ? "--underlined" : ""}"
                part="content-item-container"
              >
                <div
                  data-testid="label-${item.label}"
                  class="content-item__label"
                >
                  ${item.label}
                </div>
                <div
                  data-testid="value-${item.value}"
                  class="content-item__value"
                >
                  ${item.value}
                </div>
              </div>
            `
          )}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .main {
      background-color: var(--neutral-0);
      border-radius: var(--border-s);
      box-shadow: var(--shadow-default);
    }

    .title {
      align-items: center;
      border-bottom: 1px solid var(--neutral-40);
      color: var(neutral-90);
      display: flex;
      font-size: var(--typo-heading-small-size);
      padding: var(--spacing-md) var(--spacing-xl);
    }

    .title h3 {
      flex-grow: 2;
      margin: 0;
    }

    .title.--slotted {
      padding: var(--spacing-xs) var(--spacing-xl);
    }

    .content {
      padding: var(--spacing-xxs) var(--spacing-xl) var(--spacing-xl)
        var(--spacing-xl);
    }

    .content-item {
      color: var(neutral-90);
      display: flex;
      justify-content: space-between;
      padding-bottom: var(--spacing-xs);
      padding-top: var(--spacing-md);
    }

    .main[theme~="horizontal"] .content-item:not(:last-child).--underlined {
      border-bottom: 1px solid var(--neutral-20);
      margin-bottom: var(--spacing-xxs);
    }

    .content-item__label {
      color: var(--neutral-70);
    }

    .content-item__value {
      font-weight: var(--typo-font-weights-bold);
    }

    .main[theme~="horizontal"] .content.two-columns {
      column-count: 2;
      column-gap: var(--spacing-xxl);
    }

    .main[theme~="vertical"] .content-item {
      display: block;
      border-bottom: 1px solid var(--neutral-20);
    }

    .main[theme~="vertical"] .content-item:last-child {
      border-bottom: none;
    }

    .main[theme~="vertical"] .content-item__value {
      padding-bottom: var(--spacing-xs);
      padding-top: var(--spacing-xs);
    }

    @media (max-width: 1025px) {
      .main[theme~="horizontal"] .content.two-columns {
        column-count: 1;
      }
    }

    @media (max-width: 481px) {
      .content-item {
        display: block;
        border-bottom: 1px solid var(--neutral-20);
      }

      .content-item:last-child {
        border-bottom: none;
      }

      .content-item__value {
        padding-bottom: var(--spacing-xs);
        padding-top: var(--spacing-xs);
      }
    }
  `;
}
