import "@vaadin/button";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/button/comet-button";
import "../../components/card/comet-card";
import "../../components/icon/comet-icon";

@customElement("demo-comet-button")
export class DemoCometButton extends LitElement {
  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        Comet Custom Button
      </h1>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        The Comet custom button is the Asteroid button theme 'subtle'. It was
        impossible to override the vaadin button to create the animated
        secondary-50 colored underline. Use this component when this style of
        button is needed.
      </h3>

      <comet-button label="Custom Comet Button"></comet-button>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        The comet button can take any of our button types: ui, wecons-helix,
        wecons-circle, three-dimensional or flags. However, the primary and
        secondary colors are fixed at primary-50 and secondary-40 respectively.
      </h3>

      <div
        style="display:flex; justify-content: space-between; text-align: center"
      >
        <div>
          <div>Ui</div>
          <comet-button leadingIcon="globe" label="Ui Icons"></comet-button>
        </div>
        <div>
          <div>Wecons Helix</div>
          <comet-button
            leadingIcon="product-car"
            iconTheme="wecons-helix"
            label="Wecons Helix Icons"
          ></comet-button>
        </div>
        <div>
          <div>Wecons Circle</div>
          <comet-button
            leadingIcon="automation"
            iconTheme="wecons-circle"
            label="Wecons Circle Icons"
          ></comet-button>
        </div>
        <div>
          <div>Three Dimensional</div>
          <comet-button
            trailingIcon="motorcycle"
            iconTheme="three-dimensional"
            label="3D Icon"
          ></comet-button>
        </div>
        <div>
          <div>Flags</div>
          <comet-button
            iconTheme="flags"
            trailingIcon="ES"
            label="Flags Icon"
          ></comet-button>
        </div>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        The comet button also allows for a custom icon. To use the custom icon,
        simply use the slot="comet-button-icon" and set either the leadingIcon
        or trailingIcon to any string content.
      </h3>

      <div style="display:flex; text-align: center">
        <div style="margin-right: 36px;">
          <div>Slot with Leading Icon</div>
          <comet-button label="Slot icon leading">
            <img
              slot="comet-button-leading-icon"
              src="https://placehold.co/20x20/501e96/FFF"
            />
          </comet-button>
        </div>
        <div style="margin-right: 36px;">
          <div>Slot with Trailing Icon</div>
          <comet-button label="Slot icon trailing">
            <img
              slot="comet-button-trailing-icon"
              src="https://placehold.co/20x20/501e96/FFF"
            />
          </comet-button>
        </div>
        <div style="margin-right: 36px;">
          <div>Slot with Both Icon</div>
          <comet-button label="Slot icon both">
            <img
              slot="comet-button-leading-icon"
              src="https://placehold.co/20x20/501e96/FFF"
            />
            <img
              slot="comet-button-trailing-icon"
              src="https://placehold.co/20x20/501e96/FFF"
            />
          </comet-button>
        </div>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        Normally, the comet button has a padding of 16px all around the element.
        Sometimes, however, we need the sides to align with other items in
        various contents. We can remove the side paddings by adding
        theme="flushed" to the configuraton.
      </h3>

      <div style="display: flex; gap: 24px;">
        <comet-card .border="${true}" title="Normal config no theme">
          <div style="padding: 16px;">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
            semper nisi. Aenean vulputate eleifend tellus.
          </div>
          <div
            slot="comet-card-footer"
            style="padding: 16px; border-top: 1px solid var(--neutral-40); display: flex; justify-content: space-between;"
          >
            <comet-button
              label="Previous step"
              leadingIcon="arrow-left"
            ></comet-button>
            <vaadin-button theme="primary"
              >Next
              <span slot="suffix"
                ><comet-icon
                  name="arrow-right"
                  primaryColor="neutral-0"
                ></comet-icon
              ></span>
            </vaadin-button>
          </div>
        </comet-card>
        <comet-card .border="${true}" title="Flushed theme">
          <div style="padding: 16px;">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
            semper nisi. Aenean vulputate eleifend tellus.
          </div>
          <div
            slot="comet-card-footer"
            style="padding: 16px; border-top: 1px solid var(--neutral-40); display: flex; justify-content: space-between;"
          >
            <comet-button
              label="Previous step"
              leadingIcon="arrow-left"
              theme="flushed"
            ></comet-button>
            <vaadin-button theme="primary"
              >Next
              <span slot="suffix"
                ><comet-icon
                  name="arrow-right"
                  primaryColor="neutral-0"
                ></comet-icon
              ></span>
            </vaadin-button>
          </div>
        </comet-card>
      </div>

      <div style="color: var(--primary-50); margin-top: 24px">
        To see it displayed along side all the other vaadin button themes, go to
        <a href="/button">
          <vaadin-button style="color: var(--neutral-80);" theme="link"
            >Demo Button</vaadin-button
          >
        </a>
      </div>
    `;
  }

  static styles = css`
    comet-card {
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-comet-button": DemoCometButton;
  }
}
