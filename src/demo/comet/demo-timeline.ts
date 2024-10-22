import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/timeline/comet-timeline";
import { TimelineItem } from "../../components/timeline/comet-timeline";
import {
  FASHION_TIMELINE,
  HISTORY_TIMELINE,
  SPANISH_HISTORY_CARDS,
} from "../constants/timeline";

@customElement("demo-timeline")
export class DemoCometTimeline extends LitElement {
  @state() public history: TimelineItem[] = HISTORY_TIMELINE;
  @state() public fashion: TimelineItem[] = FASHION_TIMELINE;
  @state() public spanishHistoryCards = SPANISH_HISTORY_CARDS;
  @state() public currentCard = this.spanishHistoryCards[0];
  @state() public visible = false;

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    this.visible = true;
  }

  render() {
    return html`
        <h1 style="color: var(--primary-50); margin-top: 0">Comet Timeline</h1>

        <h3 style="color: var(--primary-50); margin-top: 0">Left</h3>
        <div style="display: flex; gap: 92px; margin-bottom: 32px;">
          <div style="max-width: 800px;">
            ${[...this.history]?.map((h, i) => {
              return html`
                <comet-timeline
                  .item=${{ ...h }}
                  @timeline-click=${() => {
                    if (h.active) return;

                    this.history = this.history.map((his) => {
                      his.active = his.id === h.id;
                      return his;
                    });
                    this.currentCard = this.spanishHistoryCards[i];
                    this.visible = false;

                    setTimeout(() => {
                      this.visible = true;
                    }, 0);
                  }}
                >
                  <div>${h.content}</div>
                </comet-timeline>
              `;
            })}
          </div>
          <div style="max-width: 800px; margin-bottom: 32px; margin-top: -32px;">
            <comet-card
              class="fade-in ${this.visible ? "visible" : ""}"
              imageSrc=${this.currentCard.image}
              title=${this.currentCard.title}
            >
              <div style="padding: 0 24px 24px; color: var(--primary-90); margin-top: -16px;">
                ${this.currentCard.content.map((c) => html`<p>${c}</p>`)}
              </div>
            </comet-card>
          </div>
        </div>

        <h3 style="color: var(--primary-50); text-align: center;">Centered</h3>
        <div style="max-width: 1100px; margin: 0 auto; background: white; padding: 48px;">
          ${[...this.fashion]?.map((f, i) => {
            return html`
              <comet-timeline
                .item=${{ ...f }}
                .position=${i % 2 === 0 ? "left" : "right"}
                theme="centered"
                .isLastItem=${i + 1 === this.fashion?.length}
                @timeline-click=${() => {
                  this.fashion = this.fashion.map((fash) => {
                    fash.active = fash.id === f.id;
                    return fash;
                  });
                }}
              >
                <div>${f.content}</div>
                <div slot="comet-timeline-title">Caca</div>
              </comet-timeline>
            `;
          })}
        </div>
      </div>
    `;
  }

  static styles = css`
    .fade-in {
      opacity: 0;
    }

    .fade-in.visible {
      opacity: 1;
      transition: opacity 0.5s ease;
    }
  `;
}
