import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/badge/comet-badge";

@customElement("demo-badge")
export class DemoBadge extends LitElement {
  public longLabel =
    "there is no limit to the size of the label. the badge will adjust";
  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Badge</h1>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        Square badge themes: default style = square, theme = grey
      </h4>

      <vaadin-horizontal-layout theme="spacing">
        <comet-badge theme="grey" label="Grey/default"></comet-badge>
        <comet-badge theme="success" label="Success"></comet-badge>
        <comet-badge theme="info" label="Info"></comet-badge>
        <comet-badge theme="warning" label="Warning"></comet-badge>
        <comet-badge theme="error" label="Error"></comet-badge>
        <comet-badge theme="light" label="Light"></comet-badge>
        <comet-badge theme="dark" label="Dark"></comet-badge>
        <comet-badge theme="secondary" label="Secondary"></comet-badge>
        <comet-badge theme="contrast" label="Contrast"></comet-badge>
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        Square badge themes with icon on the left:
      </h4>

      <vaadin-horizontal-layout theme="spacing">
        <comet-badge
          icon="globe"
          theme="grey"
          label="Grey/default"
        ></comet-badge>
        <comet-badge
          icon="feedback-success"
          theme="success"
          label="Success"
        ></comet-badge>
        <comet-badge
          icon="feedback-info"
          theme="info"
          label="Info"
        ></comet-badge>
        <comet-badge icon="flash" theme="warning" label="Warning"></comet-badge>
        <comet-badge
          icon="feedback-danger"
          theme="error"
          label="Error"
        ></comet-badge>
        <comet-badge
          icon="user-circle"
          theme="light"
          label="Light"
        ></comet-badge>
        <comet-badge icon="sun" theme="dark" label="Dark"></comet-badge>
        <comet-badge
          icon="snow"
          theme="secondary"
          label="Secondary"
        ></comet-badge>
        <comet-badge
          icon="moon-stars"
          theme="contrast"
          label="Contrast"
        ></comet-badge>
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        Square badge themes with icon on the right:
      </h4>

      <vaadin-horizontal-layout theme="spacing">
        <comet-badge
          iconPosition="right"
          icon="globe"
          theme="grey"
          label="Grey/default"
        ></comet-badge>
        <comet-badge
          iconPosition="right"
          icon="feedback-success"
          theme="success"
          label="Success"
        ></comet-badge>
        <comet-badge
          iconPosition="right"
          icon="feedback-info"
          theme="info"
          label="Info"
        ></comet-badge>
        <comet-badge
          iconPosition="right"
          icon="flash"
          theme="warning"
          label="Warning"
        ></comet-badge>
        <comet-badge
          iconPosition="right"
          icon="feedback-danger"
          theme="error"
          label="Error"
        ></comet-badge>
        <comet-badge
          iconPosition="right"
          icon="user-circle"
          theme="light"
          label="Light"
        ></comet-badge>
        <comet-badge
          iconPosition="right"
          icon="sun"
          theme="dark"
          label="Dark"
        ></comet-badge>
        <comet-badge
          iconPosition="right"
          icon="snow"
          theme="secondary"
          label="Secondary"
        ></comet-badge>
        <comet-badge
          iconPosition="right"
          icon="moon-stars"
          theme="contrast"
          label="Contrast"
        ></comet-badge>
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        Square icon only:
      </h4>

      <vaadin-horizontal-layout theme="spacing">
        <comet-badge icon="globe" theme="grey"></comet-badge>
        <comet-badge icon="feedback-success" theme="success"></comet-badge>
        <comet-badge icon="feedback-info" theme="info"></comet-badge>
        <comet-badge icon="flash" theme="warning"></comet-badge>
        <comet-badge icon="feedback-danger" theme="error"></comet-badge>
        <comet-badge icon="user-circle" theme="light"></comet-badge>
        <comet-badge icon="sun" theme="dark"></comet-badge>
        <comet-badge icon="snow" theme="secondary"></comet-badge>
        <comet-badge icon="moon-stars" theme="contrast"></comet-badge>
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        Round badge themes:
      </h4>

      <vaadin-horizontal-layout theme="spacing">
        <comet-badge
          badgeStyle="round"
          theme="grey"
          label="Grey/default"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          theme="success"
          label="Success"
        ></comet-badge>
        <comet-badge badgeStyle="round" theme="info" label="Info"></comet-badge>
        <comet-badge
          badgeStyle="round"
          theme="warning"
          label="Warning"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          theme="error"
          label="Error"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          theme="light"
          label="Light"
        ></comet-badge>
        <comet-badge badgeStyle="round" theme="dark" label="Dark"></comet-badge>
        <comet-badge
          badgeStyle="round"
          theme="secondary"
          label="Secondary"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          theme="contrast"
          label="Contrast"
        ></comet-badge>
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        Round badge themes with icon on the left:
      </h4>

      <vaadin-horizontal-layout theme="spacing">
        <comet-badge
          badgeStyle="round"
          icon="globe"
          theme="grey"
          label="Grey/default"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="feedback-success"
          theme="success"
          label="Success"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="feedback-info"
          theme="info"
          label="Info"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="flash"
          theme="warning"
          label="Warning"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="feedback-danger"
          theme="error"
          label="Error"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="user-circle"
          theme="light"
          label="Light"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="sun"
          theme="dark"
          label="Dark"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="snow"
          theme="secondary"
          label="Secondary"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="moon-stars"
          theme="contrast"
          label="Contrast"
        ></comet-badge>
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        Round badge themes with icon on the right:
      </h4>

      <vaadin-horizontal-layout theme="spacing">
        <comet-badge
          iconPosition="right"
          badgeStyle="round"
          icon="globe"
          theme="grey"
          label="Grey/default"
        ></comet-badge>
        <comet-badge
          iconPosition="right"
          badgeStyle="round"
          icon="feedback-success"
          theme="success"
          label="Success"
        ></comet-badge>
        <comet-badge
          iconPosition="right"
          badgeStyle="round"
          icon="feedback-info"
          theme="info"
          label="Info"
        ></comet-badge>
        <comet-badge
          iconPosition="right"
          badgeStyle="round"
          icon="flash"
          theme="warning"
          label="Warning"
        ></comet-badge>
        <comet-badge
          iconPosition="right"
          badgeStyle="round"
          icon="feedback-danger"
          theme="error"
          label="Error"
        ></comet-badge>
        <comet-badge
          iconPosition="right"
          badgeStyle="round"
          icon="user-circle"
          theme="light"
          label="Light"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          iconPosition="right"
          icon="sun"
          theme="dark"
          label="Dark"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          iconPosition="right"
          icon="snow"
          theme="secondary"
          label="Secondary"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          iconPosition="right"
          icon="moon-stars"
          theme="contrast"
          label="Contrast"
        ></comet-badge>
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        Round icon only:
      </h4>

      <vaadin-horizontal-layout theme="spacing">
        <comet-badge badgeStyle="round" icon="globe" theme="grey"></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="feedback-success"
          theme="success"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="feedback-info"
          theme="info"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="flash"
          theme="warning"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="feedback-danger"
          theme="error"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="user-circle"
          theme="light"
        ></comet-badge>
        <comet-badge badgeStyle="round" icon="sun" theme="dark"></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="snow"
          theme="secondary"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          icon="moon-stars"
          theme="contrast"
        ></comet-badge>
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        No limit to label size: Vertical alignment
      </h4>

      <vaadin-vertical-layout theme="spacing">
        <comet-badge label="${this.longLabel}" theme="grey"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="success"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="info"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="warning"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="error"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="light"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="dark"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="secondary"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="contrast"></comet-badge>
      </vaadin-vertical-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        No limit to label size: Horizontal alignment
      </h4>

      <vaadin-horizontal-layout theme="spacing">
        <comet-badge label="${this.longLabel}" theme="grey"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="success"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="info"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="warning"></comet-badge>
      </vaadin-horizontal-layout>

      <vaadin-horizontal-layout
        theme="spacing"
        style="color: var(--primary-50); margin-top: 24px;"
      >
        <comet-badge label="${this.longLabel}" theme="error"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="light"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="dark"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="secondary"></comet-badge>
        <comet-badge label="${this.longLabel}" theme="contrast"></comet-badge>
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        No limit to label size: Horizontal alignment
      </h4>

      <vaadin-horizontal-layout theme="spacing">
        <comet-badge
          badgeStyle="round"
          label="${this.longLabel}"
          theme="grey"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          label="${this.longLabel}"
          theme="success"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          label="${this.longLabel}"
          theme="info"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          label="${this.longLabel}"
          theme="warning"
        ></comet-badge>
      </vaadin-horizontal-layout>

      <vaadin-horizontal-layout
        theme="spacing"
        style="color: var(--primary-50); margin-top: 24px;"
      >
        <comet-badge
          badgeStyle="round"
          label="${this.longLabel}"
          theme="error"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          label="${this.longLabel}"
          theme="light"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          label="${this.longLabel}"
          theme="dark"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          label="${this.longLabel}"
          theme="secondary"
        ></comet-badge>
        <comet-badge
          badgeStyle="round"
          label="${this.longLabel}"
          theme="contrast"
        ></comet-badge>
      </vaadin-horizontal-layout>
    `;
  }

  static styles = css``;
}
