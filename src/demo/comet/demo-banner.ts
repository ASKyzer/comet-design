import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/banner/comet-banner";

@customElement("demo-banner")
export class DemoBanner extends LitElement {
  closeButtonClick = function onCloseButtonClick() {
    alert("Closing the banner");
  };

  actionButtonClick = function secondaryButtonAction() {
    alert("Action button clicked now do something!!");
  };

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Banner</h1>
      <div class="comet-banner" id="basicBannerContainer">
        <comet-banner
          id="firstCometBanner"
          @close-button-click="${this.closeButtonClick}"
          @action-button-click="${this.actionButtonClick}"
          buttonLabel="Done"
          .hasIcon="${true}"
          theme="success"
          title="Theme success"
        >
          <div class="demo-banner-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua!
          </div>
        </comet-banner>
      </div>
      <div class="comet-banner">
        <comet-banner
          @close-button-click="${this.closeButtonClick}"
          @action-button-click="${this.actionButtonClick}"
          buttonLabel="Close"
          .hasIcon="${true}"
          theme="info"
          title="Theme info"
        >
          <div class="demo-banner-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua!
          </div>
        </comet-banner>
      </div>
      <div class="comet-banner">
        <comet-banner
          @close-button-click="${this.closeButtonClick}"
          @action-button-click="${this.actionButtonClick}"
          buttonLabel="Continue"
          .hasIcon="${true}"
          ="true"
          theme="warning"
          title="Theme warning"
        >
          <div class="demo-banner-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua!
          </div>
        </comet-banner>
      </div>
      <div class="comet-banner">
        <comet-banner
          @close-button-click="${this.closeButtonClick}"
          @action-button-click="${this.actionButtonClick}"
          buttonLabel="Try again"
          .hasIcon="${true}"
          theme="error"
          title="Theme error"
        >
          <div class="demo-banner-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua!
          </div>
        </comet-banner>
      </div>

      <div class="comet-banner">
        <comet-banner
          @close-button-click="${this.closeButtonClick}"
          @action-button-click="${this.actionButtonClick}"
          icon="sun"
          buttonLabel="Start a claim"
          .hasIcon="${true}"
          ="true"
          theme="default"
          title="Theme default"
        >
          <div class="demo-banner-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua!
          </div>
        </comet-banner>
      </div>

      <div class="comet-banner comet-banner-no-theme">
        <p style="color: var(--comet-color-font-light);">
          No theme. The container part can be selected to remove the border and
          add box shadow
        </p>
        <comet-banner
          @close-button-click="${this.closeButtonClick}"
          @action-button-click="${this.actionButtonClick}"
          buttonLabel="Start a claim"
          theme="default"
          title="No theme"
        >
          <p style="padding-bottom: none;">
            These are the themes that you can use for the banner component.
          </p>
          <ul>
            <li>success</li>
            <li>info</li>
            <li>warning</li>
            <li>error</li>
            <li>default</li>
          </ul>
        </comet-banner>
      </div>
    `;
  }

  static styles = css`
    .demo-banner-content {
      margin: 8px 0;
    }

    .comet-banner {
      margin-bottom: 16px !important;
    }

    .comet-banner-no-theme {
      background-color: var(--neutral-20);
      padding: 24px;
    }

    /* Uncomment to see the no border and box shadow applied and play with other properties */

    // :host::part(comet-banner-container) {
    //   border: none;
    //   box-shadow: var(--shadow-large);
    // }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-banner": DemoBanner;
  }
}
