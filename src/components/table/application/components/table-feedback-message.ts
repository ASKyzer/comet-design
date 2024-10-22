import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TableFeedback } from "../domain/interfaces/table-feedback.interface";
import { localized, msg } from "../domain/localization/lit-localize";
import { FilterService } from "../domain/services/filter.service";

@customElement("table-feedback-message")
@localized()
export class TableFeedbackMessage extends LitElement {
  // Properties
  @property({ type: Object })
  feedbackMessage: TableFeedback;
  @property({ type: Object })
  filterService: FilterService;

  render() {
    return html`
      <div class="feedback-container">
        <comet-feedback-message
          @primary-action=${() => {
            this._sendEvent("reload", {
              currentPage: 0,
              filter: {},
              searchBarValue: "",
            });
            this.filterService.modifyFilterValues({ clear: true });
          }}
          theme=${this.feedbackMessage?.theme}
          .title=${this.feedbackMessage?.title}
          primaryButtonText=${this.feedbackMessage?.hasReload
            ? msg("Reload")
            : undefined}
        >
          <p style="text-align:center;">${this.feedbackMessage?.subtitle}</p>
        </comet-feedback-message>
      </div>
    `;
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
    .feedback-container {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
}
