import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/small-card/comet-small-card";

@customElement("demo-small-card")
export class DemoSmallCard extends LitElement {
  public icon: {
    name?: string;
    type?: string;
    primaryColor?: string;
    secondaryColor?: string;
    size?: string;
  } = {
    name: "document",
    type: "ui",
    primaryColor: "primary-50",
    secondaryColor: "tertiary-50",
    size: "48",
  };

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Small Card</h1>

      <vaadin-vertical-layout>
        <div style="margin-bottom: 16px">
          <h2>Small Card Used In Application Summary</h2>
          <div class="application-summary">
            <comet-small-card
              title="#PAA2100001"
              description="Application Number"
              .icon="${this.icon}"
              hasBorder="true"
            >
            </comet-small-card>
          </div>
        </div>

        <hr />

        <div style="margin-bottom: 16px">
          <h2>Small Card Used In External Tool pills</h2>
          <vaadin-horizontal-layout theme="spacing">
            <div class="product-excerpt">
              <comet-small-card title="Allianz">
                <comet-icon
                  slot="comet-small-card-icon"
                  size="58"
                  name="allianz"
                  type="company-logos"
                  style="padding-right: 15px"
                ></comet-icon>
                <a
                  href="#"
                  slot="comet-small-card-description"
                  style="line-height: 16px; color: var(--primary-60); font-size: 16px"
                  >9 available products</a
                >
              </comet-small-card>
            </div>
            <div class="product-excerpt">
              <comet-small-card class="product-excerpt" title="AXA">
                <comet-icon
                  slot="comet-small-card-icon"
                  size="58"
                  name="axa"
                  type="company-logos"
                  style="padding-right: 15px"
                ></comet-icon>
                <a
                  href="#"
                  slot="comet-small-card-description"
                  style="line-height: 16px; color: var(--primary-60); font-size: 16px"
                  >9 available products</a
                >
              </comet-small-card>
            </div>
            <div class="product-excerpt">
              <comet-small-card title="ARAG">
                <comet-icon
                  slot="comet-small-card-icon"
                  size="58"
                  name="arag"
                  type="company-logos"
                  style="padding-right: 15px"
                ></comet-icon>
                <a
                  href="#"
                  slot="comet-small-card-description"
                  style="line-height: 16px; color: var(--primary-60); font-size: 16px"
                  >12 available products</a
                >
              </comet-small-card>
            </div>
            <div class="product-excerpt">
              <comet-small-card title="ERGO">
                <comet-icon
                  slot="comet-small-card-icon"
                  size="58"
                  name="ergo"
                  type="company-logos"
                  style="padding-right: 15px"
                ></comet-icon>
                <a
                  href="#"
                  slot="comet-small-card-description"
                  style="line-height: 16px; color: var(--primary-60); font-size: 16px"
                  >1 available products</a
                >
              </comet-small-card>
            </div>
            <div class="product-excerpt">
              <comet-small-card title="Alte Leipziger">
                <comet-icon
                  slot="comet-small-card-icon"
                  size="58"
                  name="alte-leipziger"
                  type="company-logos"
                  style="padding-right: 15px"
                ></comet-icon>
                <a
                  href="#"
                  slot="comet-small-card-description"
                  style="line-height: 16px; color: var(--primary-60); font-size: 16px"
                  >9 available products</a
                >
              </comet-small-card>
            </div>
          </vaadin-horizontal-layout>
        </div>
      </vaadin-vertical-layout>
    `;
  }

  static styles = css`
    .application-summary {
      ::part(comet-small-card-title) {
        margin: 4px 0;
        font-size: var(--typo-heading-medium-size);
        color: var(--primary-80);
      }
    }

    .application-summary {
      ::part(comet-card-container) {
        background-color: var(--neutral-0);
        padding: 24px;
      }
    }

    .product-excerpt {
      ::part(comet-small-card-title) {
        margin: 4px 0;
        font-size: var(--typo-heading-small-size);
        color: var(--primary-100);
      }
    }

    :host::part(comet-small-card-description) {
      margin: 4px 0;
      font-size: var(--typo-caption-size);
      line-height: var(--typo-body-small-line-height);
      color: var(--primary-80);
    }
  `;
}
