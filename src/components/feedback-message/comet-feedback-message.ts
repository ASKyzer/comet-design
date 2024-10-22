import "@vaadin/button";
import "@vaadin/horizontal-layout";
import "@vaadin/vertical-layout";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../icon/comet-icon";

@customElement("comet-feedback-message")
export class CometFeedbackMessage extends LitElement {
  @property()
  public title: string = "";
  @property()
  public theme: string = "default";
  @property()
  public primaryButtonText: string = "";
  @property()
  public secondaryButtonText: string = "";
  @property()
  public textAlignment: string = "center";

  private getByTheme(theme: string) {
    switch (theme) {
      case "default":
        return {
          icon: "chat",
          primaryColor: "primary-50",
          secondaryColor: "secondary-30",
        };
      case "error":
        return {
          icon: "vision-risk-prevention",
          primaryColor: "danger-50",
          secondaryColor: "danger-30",
        };
      case "success":
        return {
          icon: "check",
          primaryColor: "success-50",
          secondaryColor: "success-30",
        };
      case "warning":
        return {
          icon: "vision-risk-prevention",
          primaryColor: "warning-50",
          secondaryColor: "warning-30",
        };
    }
  }

  private _handlePrimaryButtonClick() {
    this.dispatchEvent(
      new CustomEvent("primary-action", {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleSecondaryButtonClick() {
    this.dispatchEvent(
      new CustomEvent("secondary-action", {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div
        part="comet-feedback-wrapper"
        class="feedback-wrapper"
        style="justify-content: ${this.textAlignment}; text-align: ${this
          .textAlignment};"
      >
        ${this._renderIcon()} ${this._renderTitle()}

        <slot
          data-testid="feedback-message-description"
          class="feedback-description"
        >
        </slot>
        ${this._renderActionButtons()}
      </div>
    `;
  }

  private _renderIcon() {
    return html`
      <slot name="comet-feedback-message-icon">
        <comet-icon
          data-testid="feedback-message-icon"
          name="${this.getByTheme(this.theme)?.icon}"
          type="wecons-circle"
          primaryColor="${this.getByTheme(this.theme)?.primaryColor}"
          secondaryColor="${this.getByTheme(this.theme)?.secondaryColor}"
          size="80"
        ></comet-icon>
      </slot>
    `;
  }

  private _renderTitle() {
    if (!this.title) {
      return null;
    }

    return html` <h3
      data-testid="feedback-message-title"
      part="comet-feedback-title"
      class="feedback-title"
    >
      ${this.title}
    </h3>`;
  }

  private _renderActionButtons() {
    return html`<div class="feedback-action-buttons">
      ${this.primaryButtonText
        ? html`
            <vaadin-button
              id="feedback-button-primary"
              @click="${this._handlePrimaryButtonClick}"
              theme="small primary"
              class="feedback-button feedback-button-primary"
              >${this.primaryButtonText}</vaadin-button
            >
          `
        : ""}
      ${this.secondaryButtonText
        ? html`
            <vaadin-button
              id="feedback-button-secondary"
              @click="${this._handleSecondaryButtonClick}"
              theme="small default"
              class="feedback-button feedback-button-secondary"
              >${this.secondaryButtonText}</vaadin-button
            >
          `
        : ""}
    </div> `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .feedback-wrapper {
      align-items: center;
      display: flex;
      flex-direction: column;
      padding: var(--spacing-jumbo);
    }

    .feedback-title {
      color: var(--primary-90);
      font-size: var(--typo-heading-large-size-desktop);
      font-weight: var(--typo-font-weights-bold);
      letter-spacing: 0px;
      line-height: var(--typo-display-small-line-height-tablet);
      margin: 8px 0;
    }

    .feedback-description {
      margin: 8px 0;
      color: var(--primary-90);
      font-size: var(--typo-body-large-size-desktop);
      font-weight: var(--typo-font-weights-regular);
      text-align: left;
    }

    .feedback-action-buttons {
      margin: 8px 0;
    }

    .feedback-button-secondary {
      margin-left: 8px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comet-feedback-message": CometFeedbackMessage;
  }
}
