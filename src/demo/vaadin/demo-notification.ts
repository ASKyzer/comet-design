import "@vaadin/button";
import "@vaadin/horizontal-layout";
import "@vaadin/notification";
import type {
  NotificationOpenedChangedEvent,
  NotificationPosition,
} from "@vaadin/notification";
import { Notification } from "@vaadin/notification";
import { notificationRenderer } from "@vaadin/notification/lit.js";
import "@vaadin/vertical-layout";
// import { applyTheme } from 'Frontend/generated/theme';
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-notification")
export class DemoNotification extends LitElement {
  @state()
  notificationOpenedSuccess = false;
  notificationOpenedInfo = false;
  notificationOpenedWarning = false;
  notificationOpenedDanger = false;
  notificationOpenedContrast = false;

  protected override createRenderRoot() {
    const root = super.createRenderRoot();
    // Apply custom theme (only supported if your app uses one)
    // applyTheme(root);
    return root;
  }

  handleClickSuccess() {
    const notification = Notification.show(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      {
        position: "bottom-start",
      }
    );
    this.notificationOpenedSuccess = true;
    notification.setAttribute("theme", "success");
    const handleOpenChanged = (e: NotificationOpenedChangedEvent) => {
      if (!e.detail.value) {
        this.notificationOpenedSuccess = false;
        notification.removeEventListener("opened-changed", handleOpenChanged);
      }
    };
    notification.addEventListener("opened-changed", handleOpenChanged);
  }

  handleClickInfo() {
    const notification = Notification.show(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      {
        position: "bottom-start",
      }
    );
    this.notificationOpenedInfo = true;
    notification.setAttribute("theme", "info");
    const handleOpenChanged = (e: NotificationOpenedChangedEvent) => {
      if (!e.detail.value) {
        this.notificationOpenedInfo = false;
        notification.removeEventListener("opened-changed", handleOpenChanged);
      }
    };
    notification.addEventListener("opened-changed", handleOpenChanged);
  }
  handleClickWarning() {
    const notification = Notification.show(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      {
        position: "bottom-start",
      }
    );
    this.notificationOpenedWarning = true;
    notification.setAttribute("theme", "warning");
    const handleOpenChanged = (e: NotificationOpenedChangedEvent) => {
      if (!e.detail.value) {
        this.notificationOpenedWarning = false;
        notification.removeEventListener("opened-changed", handleOpenChanged);
      }
    };
    notification.addEventListener("opened-changed", handleOpenChanged);
  }
  handleClickDanger() {
    const notification = Notification.show(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      {
        position: "bottom-start",
      }
    );
    this.notificationOpenedDanger = true;
    notification.setAttribute("theme", "danger");
    const handleOpenChanged = (e: NotificationOpenedChangedEvent) => {
      if (!e.detail.value) {
        this.notificationOpenedDanger = false;
        notification.removeEventListener("opened-changed", handleOpenChanged);
      }
    };
    notification.addEventListener("opened-changed", handleOpenChanged);
  }
  handleClickContrast() {
    const notification = Notification.show(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      {
        position: "bottom-start",
      }
    );
    this.notificationOpenedContrast = true;
    notification.setAttribute("theme", "contrast");
    const handleOpenChanged = (e: NotificationOpenedChangedEvent) => {
      if (!e.detail.value) {
        this.notificationOpenedContrast = false;
        notification.removeEventListener("opened-changed", handleOpenChanged);
      }
    };
    notification.addEventListener("opened-changed", handleOpenChanged);
  }

  //@ts-ignore
  handleActionButtonClick(event: Event) {}

  protected override render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Notification
      </h1>

      <div style="margin-bottom: 48px">
        <h4 style="color: var(--comet-color-font-light">
          Basic notifications with no addional icons or actions in the toaster
        </h4>
        <vaadin-button
          @click="${this.handleClickSuccess}"
          ?disabled="${this.notificationOpenedSuccess}"
          theme="primary success"
        >
          Success Toaster
        </vaadin-button>
        <vaadin-button @click="${this.handleClickInfo}" theme="primary info">
          Info Toaster
        </vaadin-button>
        <vaadin-button
          @click="${this.handleClickWarning}"
          theme="primary warning"
        >
          Warning Toaster
        </vaadin-button>
        <vaadin-button
          @click="${this.handleClickDanger}"
          theme="primary danger"
        >
          Danger Toaster
        </vaadin-button>
        <vaadin-button @click="${this.handleClickContrast}" theme="primary">
          Contrast Toaster
        </vaadin-button>
      </div>

      <div style="margin-bottom: 48px;">
        <h3 style="color: var(--comet-color-font-light">
          <bold>Icons & Other Rich Formatting:</bold>
        </h3>
        <h4 style="color: var(--comet-color-font-light">
          Icons and other content formatting can be used to provide information
          and helpful visual cues. For example, you might do this to make error
          and success notifications easier to distinguish for users with color
          blindness.
        </h4>
        <vaadin-notification
          ${notificationRenderer(
            (notification) => html`
              <comet-banner
                @action-button-click="${(event: Event) => {
                  this.handleActionButtonClick(event);
                  notification.close();
                }}"
                @close-button-click="${(event: Event) => {
                  this.handleActionButtonClick(event);
                  notification.close();
                }}"
                buttonText="Done"
                hasCloseButton="true"
                hasIcon="true"
                theme="success"
                title="Theme success"
              >
                <div class="demo-banner-content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua!
                </div>
              </comet-banner>
            `,
            []
          )}
          id="vaadin-notification"
          duration="0"
          theme="success"
          position="middle"
        ></vaadin-notification>

        <vaadin-notification
          ${notificationRenderer(
            (notification) => html`
              <div>
                <div
                  style="display: flex; justify-content: center; align-items: start"
                >
                  <comet-icon
                    name="feedback-danger"
                    primaryColor="danger-50"
                    size="40"
                  ></comet-icon>
                  <div style="padding: 0 48px 0 16px;">
                    <div style="font-size: 1.33rem; font-weight: bold">
                      Title
                    </div>
                    <div>
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua',!
                    </div>
                  </div>
                  <comet-icon
                    name="x"
                    @click="${() => notification.close()}"
                    primaryColor="danger-80"
                  >
                  </comet-icon>
                </div>
                <div style="margin: 16px 0 0 32px;">
                  <vaadin-button
                    theme="danger small"
                    style="margin: 0 0 0 var(--lumo-space-l)"
                    @click="${() => notification.close()}"
                  >
                    Try again
                  </vaadin-button>
                </div>
              </div>
            `,
            []
          )}
          theme="danger"
          position="middle"
        ></vaadin-notification>

        <vaadin-notification
          ${notificationRenderer(
            (notification) => html`
              <vaadin-horizontal-layout
                theme="spacing"
                style="align-items: start"
              >
                <div style="display: flex; align-items: center;">
                  <div style="margin-right: 16px;">
                    <comet-icon
                      name="chat"
                      type="wecons-circle"
                      size="40"
                    ></comet-icon>
                  </div>
                  <div>
                    <b>Rocio Garrido</b> mentioned you in
                    <a href="/" target="_blank">Jira ticket number WIPO-8346</a>
                  </div>
                </div>

                <comet-icon
                  @click="${() => notification.close()}"
                  name="x"
                ></comet-icon>
              </vaadin-horizontal-layout>
            `,
            []
          )}
          duration="0"
          position="middle"
        ></vaadin-notification>

        <vaadin-notification
          ${notificationRenderer(
            (notification) => html`
              <vaadin-horizontal-layout style="align-items: start">
                <vaadin-icon
                  icon="vaadin:check-circle"
                  style="color: var(--lumo-success-color)"
                ></vaadin-icon>
                <div style="margin-right: 16px;">
                  <b
                    style="color: var(--success-60); font-size: var(--typo-heading-small-size"
                    >Upload successful!</b
                  >
                  <div style="color: var(--comet-color-font-dark)">
                    <b>Financials.xlsx</b> is now available in
                    <a href="/documents">Documents</a>
                  </div>
                </div>

                <comet-icon
                  @click="${() => notification.close()}"
                  name="x"
                ></comet-icon>
              </vaadin-horizontal-layout>
            `,
            []
          )}
          position="middle"
        ></vaadin-notification>

        <vaadin-button
          @click="${this.open}"
          data-which="3"
          theme="success primary"
        >
          Success Icons & Action button
        </vaadin-button>
        <vaadin-button
          @click="${this.open}"
          data-which="4"
          theme="danger primary"
        >
          Danger Icons & Action button
        </vaadin-button>
        <vaadin-button @click="${this.open}" data-which="5"
          >No theme
        </vaadin-button>
        <vaadin-button @click="${this.open}" data-which="6" theme="info primary"
          >Click Me!
        </vaadin-button>
      </div>

      <div>
        <h3 style="color: var(--comet-color-font-light);">
          <bold>Positioning:</bold>
        </h3>

        <vaadin-button @click="${this.show}">top-stretch</vaadin-button>
        <vaadin-button @click="${this.show}">top-start</vaadin-button>
        <vaadin-button @click="${this.show}">top-center</vaadin-button>
        <vaadin-button @click="${this.show}">top-end</vaadin-button>
        <vaadin-button @click="${this.show}">middle</vaadin-button>
        <vaadin-button @click="${this.show}">bottom-start</vaadin-button>
        <vaadin-button @click="${this.show}">bottom-center</vaadin-button>
        <vaadin-button @click="${this.show}">bottom-end</vaadin-button>
        <vaadin-button @click="${this.show}">bottom-stretch</vaadin-button>
      </div>
    `;
  }

  open(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const notification = this.renderRoot.querySelector<Notification>(
      `vaadin-notification:nth-child(${target.dataset.which})`
    );
    notification?.open();
  }

  show(event: MouseEvent) {
    // Use the button label as the location
    const position = (event.target as HTMLElement)
      .textContent as NotificationPosition;

    const notification = Notification.show(position, { position });
    notification.setAttribute("theme", "contrast");
  }

  static styles = css``;
}
