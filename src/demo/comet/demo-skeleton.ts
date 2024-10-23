import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/skeleton/comet-skeleton";

@customElement("demo-skeleton")
export class DemoSkeleton extends LitElement {
  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Skeleton</h1>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        The Comet Skeleton component consists of one pulsating element that can
        be rendered in a few different shapes (circle, square, line, and
        rectangle). The component is then used as building blocks. The size or
        height and width of each shape can then be adjusted to make it look like
        any of the elements in our design that will ultimately be rendered.
      </h3>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        AI product recommendations card
      </h3>

      <div class="container">
        <div class="card-container">
          <div class="card-header">
            <comet-skeleton
              theme="line"
              width="12rem"
              height="1.5rem"
              style="margin-right: 16px;"
            ></comet-skeleton>
            <comet-skeleton
              theme="rectangle"
              width="3rem"
              height="1.5rem"
            ></comet-skeleton>
          </div>

          <div class="card-body">
            <div class="line">
              <comet-skeleton height=".75rem" theme="line"></comet-skeleton>
            </div>
            <div class="line">
              <comet-skeleton
                height=".75rem"
                theme="line"
                width="90%"
              ></comet-skeleton>
            </div>
            <div class="line">
              <comet-skeleton
                height=".75rem"
                theme="line"
                width="95%"
              ></comet-skeleton>
            </div>
          </div>

          <div class="recommendations-container">
            ${[1, 2, 3].map(() => {
              return html`
                <div class="rec-card">
                  <div class="rec-image">
                    <comet-skeleton theme="square" size="3rem"></comet-skeleton>
                  </div>
                  <div class="rec-title">
                    <comet-skeleton theme="line" width="6rem"></comet-skeleton>
                  </div>
                  <comet-skeleton
                    theme="rectangle"
                    width="3rem"
                  ></comet-skeleton>
                </div>
              `;
            })}
          </div>
        </div>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px">Carrier Cards</h3>

      <div class="carrier-cards-container">
        ${[1, 2, 3, 4, 5, 6, 7].map(() => {
          return html`
            <div class="carrier-card">
              <comet-skeleton
                theme="circle"
                size="4rem"
                style="margin-right: 16px;"
              ></comet-skeleton>
              <div class="carrier-card-content">
                <div class="carrier-card-title">
                  <comet-skeleton
                    theme="line"
                    width="6rem"
                    height="1.5rem"
                  ></comet-skeleton>
                </div>
                <div>
                  <comet-skeleton
                    theme="rectangle"
                    width="15rem"
                  ></comet-skeleton>
                </div>
              </div>
            </div>
          `;
        })}
      </div>

      <h3 style="color: var(--primary-50); margin-top: 48px">
        Customers Table
      </h3>

      <div class="table-container">
        <div class="table-header">
          <div>
            <comet-skeleton
              theme="rectangle"
              height="2rem"
              width="15rem"
            ></comet-skeleton>
          </div>
        </div>
        <div class="filters">
          ${[1, 2, 3].map(() => {
            return html`
              <div style="width: fit-content;" class="">
                <comet-skeleton
                  theme="oval"
                  width="12rem"
                  height="2rem"
                ></comet-skeleton>
              </div>
            `;
          })}
        </div>
        <div class="content-header">
          ${[1, 2, 3, 4, 5].map(() => {
            return html`
              <div style="width: 100%;">
                <comet-skeleton height="2rem"></comet-skeleton>
              </div>
            `;
          })}
        </div>
        <div class="content-rows">
          ${[1, 2, 3, 4, 5, 6, 8, 9, 10].map(() => {
            return html`
              <div class="content-row">
                ${[1, 2, 3, 4, 5].map(() => {
                  return html`
                    <div style="width: 100%;">
                      <comet-skeleton height="2rem"></comet-skeleton>
                    </div>
                  `;
                })}
              </div>
            `;
          })}
        </div>
        <div class="paginator">
          <comet-skeleton height="1.5rem" width="400px"></comet-skeleton>
        </div>
      </div>
    `;
  }

  static styles = css`
    .card-container {
      background-color: var(--neutral-0);
      border-radius: 6px;
      box-shadow: var(--shadow-large);
      padding: 8px;
      width: 550px;
    }

    .card-header {
      align-items: center;
      border-bottom: 1px solid var(--neutral-40);
      display: flex;
      padding: 16px 8px;
    }

    .card-body {
      padding: 16px 8px;
    }

    .line {
      margin-bottom: 6px;
    }

    .recommendations-container {
      display: flex;
      gap: 8px;
      padding: 16px 8px;
    }

    .rec-card {
      border: 1px solid var(--neutral-40);
      padding: 8px;
      width: 100%;
    }

    .rec-image {
      display: flex;
      justify-content: center;
      margin-bottom: 16px;
    }

    .rec-title {
      margin-bottom: 6px;
    }

    .carrier-cards-container {
      display: flex;
      gap: 40px;
      overflow: scroll;
    }

    .carrier-card {
      align-items: center;
      background-color: var(--neutral-0);
      border: 1px solid var(--neutral-30);
      border-radius: 6px;
      box-shadow: var(--shadow-small);
      display: flex;
      padding: 16px 24px;
      margin: 8px 8px 48px;
      min-width: 400px;
    }

    .carrier-card-title {
      margin-bottom: 8px;
    }

    .table-container {
      border: 1px solid var(--neutral-40);
      border-radius: 6px;
      box-shadow: var(--shadow-large);
    }

    .content-header {
      border-bottom: 1px solid var(--neutral-40);
      display: flex;
      gap: 16px;
      justify-content: space-between;
      margin: 24px 32px 8px;
      padding-bottom: 8px;
    }

    .table-header {
      border-bottom: 1px solid var(--neutral-40);
      padding: 24px 24px 16px;
    }

    .content-row {
      display: flex;
      gap: 16px;
      justify-content: space-between;
      margin: 16px 32px 8px;
      padding-bottom: 8px;
    }

    .paginator {
      display: flex;
      justify-content: flex-end;
      margin: 24px 32px 8px;
      padding-bottom: 48px;
    }

    .filters {
      display: flex;
      gap: 24px;
      margin: 24px 32px 8px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-skeleton": DemoSkeleton;
  }
}
