import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("comet-skeleton")
export class CometSkeleton extends LitElement {
  @property() public theme:
    | "circle"
    | "square"
    | "line"
    | "rectangle"
    | "oval" = "line";
  @property() public size = "5rem";
  @property() public height = "1rem";
  @property() public width = "100%";

  getSize(): string {
    if (this.theme === "circle" || this.theme === "square") {
      this.width = this.size;
      this.height = this.size;
    }

    return `height: ${this.height}; width: ${this.width}`;
  }

  render() {
    return html`
      <div
        part="comet-skeleton-container"
        class="comet-skeleton comet-skeleton--${this.theme}"
        style="${this.getSize()}"
      ></div>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    div[part="comet-skeleton-container"] {
      animation: loading-bg 1.5s infinite;
      background: linear-gradient(
        90deg,
        var(--neutral-30) 25%,
        var(--neutral-20) 50%,
        var(--neutral-30) 75%
      );
      background-size: 200% 100%;
      display: block;
    }

    .comet-skeleton--circle {
      border-radius: 9999px;
    }

    .comet-skeleton--oval {
      border-radius: 50px;
    }

    @keyframes loading-bg {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;
}
