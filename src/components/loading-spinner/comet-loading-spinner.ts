import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("loading-spinner")
export class LoadingSpinner extends LitElement {
  @property({ type: String }) size: "small" | "medium" | "large" = "large";
  @property({ type: String }) message = "";

  render() {
    return html` <div class="lds-dual-container">
      <div class="lds-dual-ring ${this.size} center"></div>
      ${this.message !== ""
        ? html`<p class="loading-message">${this.message}</p>`
        : ""}
    </div>`;
  }

  static styles = css`

  .loading-message {
    color: var( --comet-color-font-dark );
  }

  .lds-dual-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: var(--spacing-xs);
  }

  .lds-dual-ring {
    width: 80px;
    height: 80px;
  }

  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 6px solid #501e96;
    border-color: #501e96 transparent #501e96 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  .lds-dual-ring.medium {
    width: 56px;
    height: 56px;
  }

    .lds-dual-ring.medium:after {
    width: 48px;
    height: 48px;
    margin: 0px;
    border: 3px solid #501e96;
    border-color: #501e96 transparent #501e96 transparent;
  }


  .lds-dual-ring.small {
    width: 24px;
    height: 24px;
  }

  .lds-dual-ring.small:after {
    width: 24px;
    height: 24px;
    margin: 0px;
    border: 1px solid #501e96;
    border-color: #501e96 transparent #501e96 transparent;
  }

  @keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }

`;
}

declare global {
  interface HTMLElementTagNameMap {
    "loading-spinner": LoadingSpinner;
  }
}
