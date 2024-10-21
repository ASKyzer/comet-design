import "@vaadin/horizontal-layout";
import { Notification } from "@vaadin/notification";
import "@vaadin/vertical-layout";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/card/comet-card";
import "../../components/feedback-message/comet-feedback-message";

@customElement("demo-feedback-message")
export class DemoFeedbackMessage extends LitElement {
  private loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel semper libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.
  Proin volutpat, sapien ut facilisis ultricies, eros purus blandit velit, at ultrices mi libero quis ante. Curabitur scelerisque metus et libero convallis consequat. Pellentesque feugiat pulvinar nisl sed pellentesque.`;

  onPrimaryButtonClick(type) {
    this.onButtonClickHandler("PRIMARY", type);
  }

  onSecondaryButtonClick(type) {
    this.onButtonClickHandler("SECONDARY", type);
  }

  onButtonClickHandler(action: string, type: string) {
    Notification.show(`${action} ACTION button clicked, now do something!!`, {
      position: "bottom-start",
      theme: type,
      duration: 5000,
    });
  }

  render() {
    return html`
      <vaadin-vertical-layout theme="spacing">
        <h1 style="color: var(--primary-50); margin-top: 0">
          Comet Feedback Message
        </h1>

        <h3 style="color: var(--primary-50); margin-top: 0">
          The Comet feedback message component is designed to fit any parent
          container with a default padding of 8px and has a transparent
          background. The text alignment by default is centered.
        </h3>

        <vaadin-horizontal-layout theme="spacing">
          <comet-feedback-message
            id="feedback-default-1"
            @primary-action="${() => this.onPrimaryButtonClick("default")}"
            theme="default"
            title="Theme default"
            primaryButtonText="Primary Action"
          >
            <p class="custom-description">${this.loremIpsum}</p>
          </comet-feedback-message>
        </vaadin-horizontal-layout>

        <h3 style="color: var(--primary-50); margin-top: 48ox">
          It can then be used in combination with the comet-card component and
          with extra padding to give it our customary feedback card look.
        </h3>

        <vaadin-horizontal-layout theme="spacing">
          <div class="container">
            <div class="feedback-container">
              <comet-card>
                <comet-feedback-message
                  id="feedback-default-2"
                  @primary-action="${() =>
                    this.onPrimaryButtonClick("warning")}"
                  @secondary-action="${() =>
                    this.onSecondaryButtonClick("warning")}"
                  theme="default"
                  title="Theme default"
                  primaryButtonText="Primary Action"
                  secondaryButtonText="Secondary Action"
                >
                  <p class="custom-description">${this.loremIpsum}</p>
                </comet-feedback-message>
              </comet-card>
            </div>
          </div>
        </vaadin-horizontal-layout>

        <vaadin-horizontal-layout theme="spacing">
          <div class="container">
            <div class="feedback-container">
              <comet-card>
                <comet-feedback-message
                  id="feedback-success"
                  @primary-action="${() =>
                    this.onPrimaryButtonClick("success")}"
                  theme="success"
                  title="Theme success"
                  primaryButtonText="Primary Action"
                >
                  <p class="custom-description">${this.loremIpsum}</p>
                </comet-feedback-message>
              </comet-card>
            </div>
          </div>
        </vaadin-horizontal-layout>

        <vaadin-horizontal-layout theme="spacing">
          <div class="container">
            <div class="feedback-container">
              <comet-card>
                <comet-feedback-message
                  id="feedback-error"
                  @primary-action="${() => this.onPrimaryButtonClick("danger")}"
                  theme="error"
                  title="Theme error"
                  primaryButtonText="Primary Action"
                >
                  <p class="custom-description">${this.loremIpsum}</p>
                </comet-feedback-message>
              </comet-card>
            </div>
          </div>
        </vaadin-horizontal-layout>

        <vaadin-horizontal-layout theme="spacing">
          <div class="container">
            <div class="feedback-container">
              <comet-card>
                <comet-feedback-message
                  id="feedback-warning"
                  @primary-action="${() =>
                    this.onPrimaryButtonClick("warning")}"
                  @secondary-action="${() =>
                    this.onSecondaryButtonClick("warning")}"
                  theme="warning"
                  title="Theme warning"
                  primaryButtonText="Primary Action"
                  secondaryButtonText="Secondary Action"
                >
                  <p class="custom-description">${this.loremIpsum}</p>
                </comet-feedback-message>
              </comet-card>
            </div>
          </div>
        </vaadin-horizontal-layout>

        <h3 style="color: var(--primary-50); margin-top: 0">
          With a slightly darker background color.
        </h3>

        <vaadin-horizontal-layout theme="spacing">
          <div class="container dark-background">
            <div class="feedback-container">
              <comet-card class="darker">
                <comet-feedback-message
                  @primary-action="${() =>
                    this.onPrimaryButtonClick("warning")}"
                  @secondary-action="${() =>
                    this.onSecondaryButtonClick("warning")}"
                  theme="warning"
                  title="Theme warning"
                  primaryButtonText="Primary Action"
                  iconSecondaryColorLight="true"
                  secondaryButtonText="Secondary Action"
                >
                  <p class="custom-description">${this.loremIpsum}</p>
                </comet-feedback-message>
              </comet-card>
            </div>
          </div>
        </vaadin-horizontal-layout>

        <h3 style="color: var(--primary-50); margin-top: 48px">
          With custom icon:
        </h3>

        <vaadin-horizontal-layout theme="spacing">
          <div class="container">
            <div class="feedback-container">
              <comet-card class="darker">
                <comet-feedback-message
                  @primary-action="${() => this.onPrimaryButtonClick("custom")}"
                  @secondary-action="${() =>
                    this.onSecondaryButtonClick("custom")}"
                  title="Custom Icon"
                  primaryButtonText="Primary Action"
                  secondaryButtonText="Secondary Action"
                >
                  <p class="custom-description">${this.loremIpsum}</p>
                  <comet-icon
                    slot="comet-feedback-message-icon"
                    type="three-dimensional"
                    name="family"
                    size="100"
                  ></comet-icon>
                </comet-feedback-message>
              </comet-card>
            </div>
          </div>
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .container {
      background-color: var(--neutral-20);
      display: flex;
      justify-content: center;
    }

    .feedback-container {
      max-width: 600px;
      margin: 64px;
    }

    .custom-description {
      color: var(--comet-color-font-dark);
    }

    .container.dark-background ::part(comet-card-container) {
      background-color: var(--primary-20);
    }

    .feedback-container ::part(comet-feedback-title) {
      color: var(--comet-color-font-dark) !important;
    }

    .feedback-container ::part(comet-feedback-wrapper) {
      margin: var(--spacing-xl) var(--spacing-xl) !important;
      padding: var(--spacing-giga) var(--spacing-xxl) !important;
    }
  `;
}
