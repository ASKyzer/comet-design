import "@vaadin/button";
import "@vaadin/horizontal-layout";
import "@vaadin/number-field";
import "@vaadin/vertical-layout";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/button/comet-button";
import "../../components/default-button/comet-default-button";

@customElement("demo-button")
export class DemoButton extends LitElement {
  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">vaadin Button</h1>
      <vaadin-vertical-layout theme="spacing">
        <div class="section-title">Button themes</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button>Comet Default</comet-default-button>
          <vaadin-button theme="primary">Primary</vaadin-button>
          <vaadin-button theme="primary-inverted"
            >Primary inverted</vaadin-button
          >
          <vaadin-button theme="subtle">Subtle</vaadin-button>
          <vaadin-button theme="link">Link</vaadin-button>
          <comet-button label="Comet button"></comet-button>
          <vaadin-button theme="success">Success</vaadin-button>
          <vaadin-button theme="warning">Warning</vaadin-button>
          <vaadin-button theme="danger">Danger</vaadin-button>
          <vaadin-button theme="info">Info</vaadin-button>
        </vaadin-horizontal-layout>

        <div class="section-title">Button themes (disabled)</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button disabled>Comet Default</comet-default-button>
          <vaadin-button disabled theme="primary">Primary</vaadin-button>
          <vaadin-button disabled theme="primary-inverted"
            >Primary inverted</vaadin-button
          >
          <vaadin-button disabled theme="subtle">Subtle</vaadin-button>
          <vaadin-button disabled theme="link">Link</vaadin-button>
          <comet-button disabled label="Comet button"></comet-button>
          <vaadin-button disabled theme="success">Success</vaadin-button>
          <vaadin-button disabled theme="warning">Warning</vaadin-button>
          <vaadin-button disabled theme="danger">Danger</vaadin-button>
          <vaadin-button disabled theme="info">Info</vaadin-button>
        </vaadin-horizontal-layout>

        <div class="section-title">Button themes size large</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button size="large"
            >Comet Default</comet-default-button
          >
          <vaadin-button theme="large primary">Primary</vaadin-button>
          <vaadin-button theme="large primary-inverted"
            >Primary inverted</vaadin-button
          >
          <vaadin-button theme="large subtle">Subtle</vaadin-button>
          <vaadin-button theme="large link">Link</vaadin-button>
          <comet-button size="large" label="Comet button"></comet-button>
          <vaadin-button theme="large success">Success</vaadin-button>
          <vaadin-button theme="large warning">Warning</vaadin-button>
          <vaadin-button theme="large danger">Danger</vaadin-button>
          <vaadin-button theme="large info">Info</vaadin-button>
        </vaadin-horizontal-layout>

        <div class="section-title">Button themes size large (disabled)</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button disabled size="large"
            >Comet Default</comet-default-button
          >
          <vaadin-button disabled theme="large primary">Primary</vaadin-button>
          <vaadin-button disabled theme="large primary-inverted"
            >Primary inverted</vaadin-button
          >
          <vaadin-button disabled theme="large subtle">Subtle</vaadin-button>
          <vaadin-button disabled theme="large link">Link</vaadin-button>
          <comet-button
            disabled
            size="large"
            label="Comet button"
          ></comet-button>
          <vaadin-button disabled theme="large success">Success</vaadin-button>
          <vaadin-button disabled theme="large warning">Warning</vaadin-button>
          <vaadin-button disabled theme="large danger">Danger</vaadin-button>
          <vaadin-button disabled theme="large info">Info</vaadin-button>
        </vaadin-horizontal-layout>

        <div class="section-title">Button themes size small</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button size="small"
            >Comet Default</comet-default-button
          >
          <vaadin-button theme="small primary">Primary</vaadin-button>
          <vaadin-button theme="small primary-inverted"
            >Primary inverted</vaadin-button
          >
          <vaadin-button theme="small subtle">Subtle</vaadin-button>
          <vaadin-button theme="small link">Link</vaadin-button>
          <comet-button size="small" label="Comet button"></comet-button>
          <vaadin-button theme="small success">Success</vaadin-button>
          <vaadin-button theme="small warning">Warning</vaadin-button>
          <vaadin-button theme="small danger">Danger</vaadin-button>
          <vaadin-button theme="small info">Info</vaadin-button>
        </vaadin-horizontal-layout>

        <div class="section-title">Button themes size small (disabled)</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button disabled size="small"
            >Comet Default</comet-default-button
          >
          <vaadin-button disabled theme="small primary">Primary</vaadin-button>
          <vaadin-button disabled theme="small primary-inverted"
            >Primary inverted</vaadin-button
          >
          <vaadin-button disabled theme="small subtle">Subtle</vaadin-button>
          <vaadin-button disabled theme="small link">Link</vaadin-button>
          <comet-button
            disabled
            size="small"
            label="Comet button"
          ></comet-button>
          <vaadin-button disabled theme="small success">Success</vaadin-button>
          <vaadin-button disabled theme="small warning">Warning</vaadin-button>
          <vaadin-button disabled theme="small danger">Danger</vaadin-button>
          <vaadin-button disabled theme="small info">Info</vaadin-button>
        </vaadin-horizontal-layout>

        <div class="section-title">Button with left icons - icon size 24</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button leadingIcon="arrow-left"
            >Comet Default</comet-default-button
          >

          <vaadin-button theme="primary">
            <comet-icon
              slot="prefix"
              name="user"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Primary</vaadin-button
          >
          <vaadin-button theme="primary-inverted"
            ><comet-icon
              slot="prefix"
              name="node"
              primaryColor="primary-50"
              size="24"
            ></comet-icon
            >Primary inverted</vaadin-button
          >
          <vaadin-button theme="subtle">
            <comet-icon
              slot="prefix"
              name="snow-icon"
              primaryColor="neutral-70"
              size="24"
            ></comet-icon
            >Subtle</vaadin-button
          >
          <vaadin-button theme="link">
            <comet-icon
              slot="prefix"
              name="url"
              primaryColor="primary-50"
              size="24"
            ></comet-icon
            >Link</vaadin-button
          >
          <comet-button leadingIcon="like" label="Comet button"> </comet-button>
          <vaadin-button theme="success">
            <comet-icon
              slot="prefix"
              name="check"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Success</vaadin-button
          >
          <vaadin-button theme="warning">
            <comet-icon
              slot="prefix"
              name="flash"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Warning</vaadin-button
          >
          <vaadin-button theme="danger">
            <comet-icon
              slot="prefix"
              name="temperature"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Danger</vaadin-button
          >
          <vaadin-button theme="info">
            <comet-icon
              slot="prefix"
              name="notification"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Info</vaadin-button
          >
        </vaadin-horizontal-layout>

        <div class="section-title">Button with left icons(disabled)</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button disabled leadingIcon="arrow-left"
            >Comet Default</comet-default-button
          >

          <vaadin-button disabled theme="primary">
            <comet-icon
              slot="prefix"
              name="user"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
            >Primary</vaadin-button
          >
          <vaadin-button disabled theme=" primary-inverted"
            ><comet-icon
              slot="prefix"
              name="node"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
            >Primary inverted</vaadin-button
          >
          <vaadin-button disabled theme="subtle">
            <comet-icon
              slot="prefix"
              name="snow-icon"
              primaryColor="neutral-50"
              size="24"
            ></comet-icon
            >Subtle</vaadin-button
          >
          <vaadin-button disabled theme="link">
            <comet-icon
              slot="prefix"
              name="url"
              primaryColor="neutral-50"
              size="24"
            ></comet-icon
            >Link</vaadin-button
          >
          <comet-button
            disabled
            leadingIcon="like"
            label="Comet button"
          ></comet-button>

          <vaadin-button disabled theme="success">
            <comet-icon
              slot="prefix"
              name="check"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
            >Success</vaadin-button
          >
          <vaadin-button disabled theme="warning">
            <comet-icon
              slot="prefix"
              name="flash"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
            >Warning</vaadin-button
          >
          <vaadin-button disabled theme="danger">
            <comet-icon
              slot="prefix"
              name="temperature"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
            >Danger</vaadin-button
          >
          <vaadin-button disabled theme="info">
            <comet-icon
              slot="prefix"
              name="notification"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
            >Info</vaadin-button
          >
        </vaadin-horizontal-layout>

        <div class="section-title">Button with right icons - icon size 24</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button trailingIcon="arrow-right"
            >Comet Default</comet-default-button
          >

          <vaadin-button theme="primary">
            <comet-icon
              slot="suffix"
              name="user"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Primary</vaadin-button
          >
          <vaadin-button theme=" primary-inverted"
            ><comet-icon
              slot="suffix"
              name="node"
              primaryColor="primary-50"
              size="24"
            ></comet-icon
            >Primary inverted</vaadin-button
          >
          <vaadin-button theme="subtle">
            <comet-icon
              slot="suffix"
              name="snow-icon"
              primaryColor="neutral-70"
              size="24"
            ></comet-icon
            >Subtle</vaadin-button
          >
          <vaadin-button theme="link">
            <comet-icon
              slot="suffix"
              name="url"
              primaryColor="primary-50"
              size="24"
            ></comet-icon
            >Link</vaadin-button
          >
          <comet-button trailingIcon="like" label="Comet button"></comet-button>
          <vaadin-button theme="success">
            <comet-icon
              slot="suffix"
              name="check"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Success</vaadin-button
          >
          <vaadin-button theme="warning">
            <comet-icon
              slot="suffix"
              name="flash"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Warning</vaadin-button
          >
          <vaadin-button theme="danger">
            <comet-icon
              slot="suffix"
              name="temperature"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Danger</vaadin-button
          >
          <vaadin-button theme="info">
            <comet-icon
              slot="suffix"
              name="notification"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Info</vaadin-button
          >
        </vaadin-horizontal-layout>

        <div class="section-title">Button with right icons(disabled)</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button disabled trailingIcon="arrow-right"
            >Comet Default</comet-default-button
          >

          <vaadin-button disabled theme="primary">
            <comet-icon
              slot="suffix"
              name="user"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
            >Primary</vaadin-button
          >
          <vaadin-button disabled theme=" primary-inverted"
            ><comet-icon
              slot="suffix"
              name="node"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
            >Primary inverted</vaadin-button
          >
          <vaadin-button disabled theme="subtle">
            <comet-icon
              slot="suffix"
              name="snow-icon"
              primaryColor="neutral-50"
              size="24"
            ></comet-icon
            >Subtle</vaadin-button
          >
          <vaadin-button disabled theme="link">
            <comet-icon
              slot="suffix"
              name="url"
              primaryColor="neutral-50"
              size="24"
            ></comet-icon
            >Link</vaadin-button
          >
          <comet-button
            disabled
            trailingIcon="like"
            label="Comet button"
          ></comet-button>
          <vaadin-button disabled theme="success">
            <comet-icon
              slot="suffix"
              name="check"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
            >Success</vaadin-button
          >
          <vaadin-button disabled theme="warning">
            <comet-icon
              slot="suffix"
              name="flash"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
            >Warning</vaadin-button
          >
          <vaadin-button disabled theme="danger">
            <comet-icon
              slot="suffix"
              name="temperature"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
            >Danger</vaadin-button
          >
          <vaadin-button disabled theme="info">
            <comet-icon
              slot="suffix"
              name="notification"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
            >Info</vaadin-button
          >
        </vaadin-horizontal-layout>

        <div class="section-title">Button small with left and right icons</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button
            size="small"
            leadingIcon="home"
            trailingIcon="arrow-drop-down"
            >Two icons</comet-default-button
          >

          <vaadin-button theme="small primary">
            <comet-icon
              slot="prefix"
              name="user"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Primary
            <comet-icon
              slot="suffix"
              name="arrow-drop-down"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button theme="small  primary-inverted"
            ><comet-icon
              slot="prefix"
              name="node"
              primaryColor="primary-50"
              size="24"
            ></comet-icon
            >Primary inverted
            <comet-icon
              slot="suffix"
              name="arrow-drop-down"
              primaryColor="primary-50"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button theme="small subtle">
            <comet-icon
              slot="prefix"
              name="snow-icon"
              primaryColor="neutral-70"
              size="24"
            ></comet-icon
            >Subtle
            <comet-icon
              slot="suffix"
              name="arrow-drop-down"
              primaryColor="neutral-70"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button theme="small link">
            <comet-icon
              slot="prefix"
              name="url"
              primaryColor="primary-50"
              size="24"
            ></comet-icon
            >Link
            <comet-icon
              slot="suffix"
              name="arrow-drop-down"
              primaryColor="primary-50"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <comet-button
            size="small"
            leadingIcon="home"
            trailingIcon="arrow-drop-down"
            label="Comet button"
          ></comet-button>
        </vaadin-horizontal-layout>

        <vaadin-horizontal-layout theme="spacing">
          <vaadin-button theme="small success">
            <comet-icon
              slot="prefix"
              name="check"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Success
            <comet-icon
              slot="suffix"
              name="arrow-drop-down"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button theme="small warning">
            <comet-icon
              slot="prefix"
              name="flash"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Warning
            <comet-icon
              slot="suffix"
              name="arrow-drop-down"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button theme="small danger">
            <comet-icon
              slot="prefix"
              name="temperature"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Danger
            <comet-icon
              slot="suffix"
              name="arrow-drop-down"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button theme="small info">
            <comet-icon
              slot="prefix"
              name="notification"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
            >Info
            <comet-icon
              slot="suffix"
              name="arrow-drop-down"
              primaryColor="neutral-0"
              size="24"
            ></comet-icon
          ></vaadin-button>
        </vaadin-horizontal-layout>

        <div class="section-title">Button with icon only - icon size 36</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button leadingIcon="arrow-left"></comet-default-button>

          <vaadin-button theme="icon primary">
            <comet-icon
              name="user"
              size="36"
              primaryColor="neutral-0"
            ></comet-icon>
          </vaadin-button>
          <vaadin-button theme="icon primary-inverted">
            <comet-icon
              name="node"
              size="36"
              primaryColor="primary-50"
            ></comet-icon
          ></vaadin-button>

          <vaadin-button theme="icon subtle">
            <comet-icon
              name="snow-icon"
              primaryColor="neutral-70"
              size="36"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button theme="icon link">
            <comet-icon
              name="url"
              primaryColor="primary-50"
              size="36"
            ></comet-icon
          ></vaadin-button>
          <comet-button leadingIcon="like"></comet-button>
          <vaadin-button theme="icon success">
            <comet-icon
              name="check"
              size="36"
              primaryColor="neutral-0"
            ></comet-icon
          ></vaadin-button>

          <vaadin-button theme="icon warning">
            <comet-icon
              name="flash"
              size="36"
              primaryColor="neutral-0"
            ></comet-icon
          ></vaadin-button>

          <vaadin-button theme="icon danger">
            <comet-icon
              name="temperature"
              size="36"
              primaryColor="neutral-0"
            ></comet-icon
          ></vaadin-button>

          <vaadin-button theme="icon info">
            <comet-icon
              name="notification"
              size="36"
              primaryColor="neutral-0"
            ></comet-icon
          ></vaadin-button>
        </vaadin-horizontal-layout>

        <div class="section-title">Button with icon only(disabled)</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button
            disabled
            leadingIcon="arrow-right"
          ></comet-default-button>

          <vaadin-button disabled theme="icon primary">
            <comet-icon
              name="user"
              primaryColor="neutral-60"
              size="36"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button disabled theme="icon  primary-inverted"
            ><comet-icon
              name="node"
              primaryColor="neutral-60"
              size="36"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button disabled theme="icon subtle">
            <comet-icon
              name="snow-icon"
              primaryColor="neutral-50"
              size="36"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button disabled theme="icon link">
            <comet-icon
              name="url"
              primaryColor="neutral-50"
              size="36"
            ></comet-icon
          ></vaadin-button>
          <comet-button disabled trailingIcon="like"></comet-button>
          <vaadin-button disabled theme="icon success">
            <comet-icon
              name="check"
              primaryColor="neutral-60"
              size="36"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button disabled theme="icon warning">
            <comet-icon
              name="flash"
              primaryColor="neutral-60"
              size="36"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button disabled theme="icon danger">
            <comet-icon
              name="temperature"
              primaryColor="neutral-60"
              size="36"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button disabled theme="icon info">
            <comet-icon
              name="notification"
              primaryColor="neutral-60"
              size="36"
            ></comet-icon
          ></vaadin-button>
        </vaadin-horizontal-layout>

        <div class="section-title">
          Button with icon only small - icon size 24
        </div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button
            leadingIcon="arrow-up"
            size="small"
          ></comet-default-button>

          <vaadin-button theme="icon small primary">
            <comet-icon
              name="user"
              size="24"
              primaryColor="neutral-0"
            ></comet-icon>
          </vaadin-button>
          <vaadin-button theme="icon small primary-inverted">
            <comet-icon
              name="node"
              size="24"
              primaryColor="primary-50"
            ></comet-icon
          ></vaadin-button>

          <vaadin-button theme="icon small subtle">
            <comet-icon
              name="snow-icon"
              primaryColor="neutral-70"
              size="24"
            ></comet-icon
          ></vaadin-button>

          <vaadin-button theme="icon small link">
            <comet-icon
              name="url"
              primaryColor="primary-50"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <comet-button size="small" trailingIcon="like"></comet-button>
          <vaadin-button theme="icon small success">
            <comet-icon
              name="check"
              size="24"
              primaryColor="neutral-0"
            ></comet-icon
          ></vaadin-button>

          <vaadin-button theme="icon small warning">
            <comet-icon
              name="flash"
              size="24"
              primaryColor="neutral-0"
            ></comet-icon
          ></vaadin-button>

          <vaadin-button theme="icon small danger">
            <comet-icon
              name="temperature"
              size="24"
              primaryColor="neutral-0"
            ></comet-icon
          ></vaadin-button>

          <vaadin-button theme="icon small info">
            <comet-icon
              name="notification"
              size="24"
              primaryColor="neutral-0"
            ></comet-icon
          ></vaadin-button>
        </vaadin-horizontal-layout>

        <div class="section-title">Button with icon only small(disabled)</div>
        <vaadin-horizontal-layout theme="spacing">
          <comet-default-button
            leadingIcon="arrow-down"
            size="small"
          ></comet-default-button>

          <vaadin-button disabled theme="icon small primary">
            <comet-icon
              name="user"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button disabled theme="icon small  primary-inverted"
            ><comet-icon
              name="node"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button disabled theme="icon small subtle">
            <comet-icon
              name="snow-icon"
              primaryColor="neutral-50"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button disabled theme="icon small link">
            <comet-icon
              name="url"
              primaryColor="neutral-50"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <comet-button
            disabled
            size="small"
            trailingIcon="like"
          ></comet-button>
          <vaadin-button disabled theme="icon small success">
            <comet-icon
              name="check"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button disabled theme="icon small warning">
            <comet-icon
              name="flash"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button disabled theme="icon small danger">
            <comet-icon
              name="temperature"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
          ></vaadin-button>
          <vaadin-button disabled theme="icon small info">
            <comet-icon
              name="notification"
              primaryColor="neutral-60"
              size="24"
            ></comet-icon
          ></vaadin-button>
        </vaadin-horizontal-layout>
      </vaadin-vertical-layout>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .section-title {
      color: var(--primary-50);
      font-weight: var(--typo-font-weights-bold);
      font-size: 1.35rem;
    }
  `;
}
