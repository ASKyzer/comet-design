import { css, html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { filter, fromEvent, map, Subscription } from "rxjs";

@customElement("table-drop-down")
export class TableDropDown extends LitElement {
  // Properties
  @property({ type: Boolean })
  hasIcon: boolean = false;
  @property({ type: String })
  iconName: string;
  @property({ type: String })
  label: string = "";

  // State properties
  @state()
  showContainer: boolean = false;

  // Query parameters
  @query("#pop-up")
  popUp: HTMLElement;

  @query("#icon")
  icon: HTMLElement;

  private _clickEventSubscription: Subscription;

  connectedCallback(): void {
    super.connectedCallback();

    this._clickEventSubscription = fromEvent(document, "click")
      .pipe(
        map(
          (e) =>
            !e.composedPath().includes(this.popUp) &&
            !e.composedPath().includes(this.icon) &&
            this.showContainer
        ),
        filter(Boolean)
      )
      .subscribe(this._onIconClicked.bind(this));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this._clickEventSubscription)
      this._clickEventSubscription.unsubscribe();
  }

  render() {
    return html`
      <div class="cell-container">
        ${this.hasIcon
          ? html`
              <vaadin-button
                id="icon"
                data-testid="drop-down-actions-cell"
                theme="link icon small"
                @click=${this._onIconClicked}
              >
                <comet-icon
                  .name=${this.iconName}
                  size="24"
                  primaryColor="primary-50"
                  slot="prefix"
                ></comet-icon>
              </vaadin-button>
            `
          : html`
              <vaadin-button
                id="icon"
                data-testid="drop-down-actions-cell"
                theme="link small"
                @click=${this._onIconClicked}
              >
                ${this.label}
              </vaadin-button>
            `}
        <div
          class="container show-pop-up"
          id="pop-up"
          style="display: ${this.showContainer ? "block" : "none"};"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }

  private async _onIconClicked(): Promise<void> {
    const { add, remove } = this.showContainer
      ? { add: "hide-pop-up", remove: "show-pop-up" }
      : { add: "show-pop-up", remove: "hide-pop-up" };

    this.popUp.classList.remove(remove);
    this.popUp.classList.add(add);

    if (this.showContainer) {
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 200);
      });
    } else {
      const parent = (this.getRootNode() as HTMLElement).querySelector(
        "vaadin-grid"
      );
      setTimeout(() => {
        const { right: childRight } = this.popUp.getBoundingClientRect();
        const { bottom: childBottom } = this.icon.getBoundingClientRect();
        const { bottom: parentBottom, right: parentRight } =
          parent.getBoundingClientRect();
        const freeDownSpace = parentBottom - childBottom;
        const freeTopSpace = parent.clientHeight - freeDownSpace;

        if (childRight > parentRight) {
          this.popUp.style.right = "0px";
          this.popUp.style.left = "unset";
        } else {
          this.popUp.style.left = "0px";
          this.popUp.style.right = "unset";
        }

        if (freeDownSpace < freeTopSpace) {
          if (freeTopSpace - 90 < this.popUp.clientHeight) {
            this.popUp.style.top = `${-(freeTopSpace - 100)}px`;
            this.popUp.style.bottom = "unset";
          } else {
            this.popUp.style.bottom = "0px";
            this.popUp.style.top = "unset";
          }
        } else {
          this.popUp.style.maxHeight = `${
            freeDownSpace - 40 > 280 ? 280 : freeDownSpace - 40
          }px`;
          this.popUp.style.top = "40px";
          this.popUp.style.bottom = "unset";
        }
      });
    }

    this.showContainer = !this.showContainer;
  }

  private _sendEvent(eventType: string, eventDetail?: any): void {
    this.dispatchEvent(
      new CustomEvent(eventType, {
        composed: true,
        bubbles: true,
        detail: eventDetail,
      })
    );
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
    }
    .cell-container {
      position: relative;
    }

    #icon {
      margin: 0px;
      padding: 0px;
    }

    .cell-container > comet-icon {
      cursor: pointer;
    }

    .container {
      position: absolute;
      padding: var(--spacing-s);
      border-radius: 16px;
      border: 1px solid var(--neutral-30, #ebeae8);
      background: var(--neutral-0);
      box-shadow: 0px 4px 12px 0px rgba(51, 55, 66, 0.02),
        0px 4px 8px 0px rgba(51, 55, 66, 0.04),
        0px 2px 4px 0px rgba(51, 55, 66, 0.04);
      z-index: 1;
      transform-origin: 0% 0%;
      max-height: 280px;
      overflow-y: auto;
    }

    .show-pop-up {
      animation-name: show-pop-up-animation;
      animation-duration: 0.3s;
      animation-fill-mode: forwards;
    }

    .hide-pop-up {
      animation-name: hide-pop-up-animation;
      animation-duration: 0.3s;
      animation-fill-mode: forwards;
    }

    @keyframes show-pop-up-animation {
      0% {
        opacity: 0;
        transform: rotateX(90deg);
      }
      100% {
        opacity: 1;
        transform: rotateX(0deg);
      }
    }

    @keyframes hide-pop-up-animation {
      0% {
        opacity: 1;
        transform: rotateX(0deg);
      }
      100% {
        opacity: 0;
        transform: rotateX(90deg);
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "table-drop-down": TableDropDown;
  }
}
