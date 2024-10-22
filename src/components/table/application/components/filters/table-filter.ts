import { css, html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { filter, fromEvent, map, Subscription } from "rxjs";
import { FilterService } from "../../domain/services/filter.service";
import "./filter-content";

@customElement("table-filter")
export class TableFilter extends LitElement {
  // Properties
  @property({ type: Object })
  filterConfig;

  @property({ type: String })
  displayKey: string;

  @property({ type: String })
  headerLabel: string;

  @property()
  filterService: FilterService;

  // State properties
  @state()
  showFilterContainer: boolean = false;

  // Query parameters
  @query("#filter-pop-up")
  filterPopUp: HTMLElement;

  @query("#filter-icon")
  filterIcon: HTMLElement;

  private _clickEventSubscription: Subscription;

  connectedCallback(): void {
    super.connectedCallback();

    this._clickEventSubscription = fromEvent(document, "click")
      .pipe(
        map(
          (e) =>
            !e.composedPath().includes(this.filterPopUp) &&
            !e.composedPath().includes(this.filterIcon) &&
            this.showFilterContainer
        ),
        filter(Boolean)
      )
      .subscribe(this._onFilterClicked.bind(this));
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this._clickEventSubscription)
      this._clickEventSubscription.unsubscribe();
  }

  render() {
    return html`
      <div class="filter-cell-container">
        <comet-icon
          id="filter-icon"
          data-testid="${this.displayKey}-filter-icon"
          @click=${this._onFilterClicked}
          name="${this.filterConfig.type === "FILTER_STRING"
            ? "search"
            : "filters"}"
          style="display: flex;"
          size="24"
          primaryColor="primary-50"
        ></comet-icon>

        <div
          class="filter-container show-pop-up"
          id="filter-pop-up"
          style="display: ${this.showFilterContainer ? "block" : "none"};"
        >
          <filter-content
            @close-pop-up=${() => this._onFilterClicked()}
            @on-filter-content-changed=${({ detail }) =>
              this._fetchNewData(detail)}
            ?showFilterContainer=${this.showFilterContainer}
            .filterConfig=${this.filterConfig}
            .filterService=${this.filterService}
            .displayKey=${this.displayKey}
            .headerLabel=${this.headerLabel}
          >
          </filter-content>
        </div>
      </div>
    `;
  }

  private async _onFilterClicked(): Promise<void> {
    const { add, remove } = this.showFilterContainer
      ? { add: "hide-pop-up", remove: "show-pop-up" }
      : { add: "show-pop-up", remove: "hide-pop-up" };

    this.filterPopUp.classList.remove(remove);
    this.filterPopUp.classList.add(add);

    if (this.showFilterContainer) {
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 200);
      });
    } else {
      const parent = (this.getRootNode() as HTMLElement).querySelector(
        "vaadin-grid"
      );
      setTimeout(() => {
        const { right: childRight } = this.filterPopUp.getBoundingClientRect();
        const { right: parentRight } = parent.getBoundingClientRect();

        if (childRight > parentRight) {
          this.filterPopUp.style.right = "0px";
          this.filterPopUp.style.left = "";
        } else {
          this.filterPopUp.style.left = "0px";
          this.filterPopUp.style.right = "";
        }
      });
    }

    this.showFilterContainer = !this.showFilterContainer;
  }

  private _fetchNewData(detail): void {
    this._sendEvent("filter-column", detail);
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
    .filter-cell-container {
      position: relative;
    }

    .filter-cell-container > comet-icon {
      cursor: pointer;
    }

    .filter-container {
      position: absolute;
      top: 30px;
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
