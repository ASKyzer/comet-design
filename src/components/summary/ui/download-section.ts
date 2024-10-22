import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { DownloadData } from "../interfaces/summary-data";

@customElement("download-section")
export class DownloadSection extends LitElement {
  @property({ type: Object }) data: DownloadData;

  render() {
    return html`
      <span class="title" data-testid="download-title">${this.data.title}</span>
      <hr class="divider" />
      <p class="description" data-testid="download-description">
        ${unsafeHTML(this.data.description)}
      </p>
      <a
        class="download-button"
        href=${this.data.url}
        target="_blank"
        download
        data-testid="download-link"
      >
        <comet-icon
          slot="prefix"
          name="file-download"
          primaryColor="neutral-0"
          size="24"
          data-testid="download-icon"
        ></comet-icon>
        ${this.data.btnText}
      </a>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .download-button {
      background-color: var(--primary-50);
      border-radius: 50px;
      color: var(--neutral-0);
      gap: 4px;
      height: 56px;
      text-decoration: none;
      min-width: 90px;
      width: max-content;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 16px;
      padding-right: 16px;
    }

    .download-button:hover {
      background-color: var(--primary-60);
    }

    a {
      color: var(--primary-50);
      font-weight: var(--typo-font-weights-bold);
    }

    .divider {
      border-top: 0.5px solid var(--neutral-20);
    }

    .title {
      color: var(--primary-60, #3d127a);
      font-size: 19px;
      font-weight: 600;
    }

    .description {
      color: var(--primary-80, #3d127a);
      font-size: 14px;
      font-weight: 400;
    }
  `;
}
