import { Notification } from "@vaadin/notification";
import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/card/comet-card";
import { CardButtonConfig } from "../../components/card/comet-card";
import "../../components/icon/comet-icon";

@customElement("demo-card")
export class DemoCard extends LitElement {
  public userName: string = "severus.snape";
  @state() buttonConfig: CardButtonConfig = null;

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    this.buttonConfig = {
      disabled: false,
      label: "Learn more",
      theme: "info",
      icon: {
        name: "arrow-right",
        position: "suffix",
      },
    };
  }

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Card</h1>

      <div style="padding: 48px; background: var(--neutral-20)">
        <comet-card
          @action-button-click=${() =>
            Notification.show(
              ` Learn more button clicked, now do something!!`,
              {
                position: "bottom-start",
                theme: "info",
                duration: 5000,
              }
            )}
          title="Why blue in nature is so rare"
          imageSrc="https://cdn.pixabay.com/photo/2021/09/14/19/29/butterfly-6624801_1280.jpg"
          .buttonConfig=${this.buttonConfig}
        >
          <p style="margin-top: 0; padding-top: 0;">
            The rarity of blue coloration in nature is due to the absence of
            blue pigments in most plants and animals. Unlike other colors, which
            can be produced through various pigments directly absorbing and
            reflecting light, blue hues are often the result of structural
            coloration. This involves the physical structure of surfaces
            interfering with light to amplify certain wavelengths and diminish
            others, creating blue through reflection rather than pigment
            absorption.
          </p>
          <p style="margin-top: 0; padding-top: 0;">
            In plants, blue colors are especially rare because they lack blue
            pigments. Some plants that appear blue, such as blueberries or
            certain flowers, achieve their color through complex molecular
            structures that manipulate light rather than through blue pigment.
          </p>
          <p style="margin-top: 0; padding-top: 0;">
            In animals, the blue appearance is often due to structural
            coloration as well. For example, the blue of a peacock's feathers or
            the wings of a Morpho butterfly is not due to blue pigment but to
            microscopic structures that reflect light in a way that makes them
            appear blue to the human eye.
          </p>
          <p style="margin-top: 0; padding-top: 0;">
            Moreover, producing blue coloration through structural means is more
            complex and resource-intensive than producing colors via pigments.
            This complexity could be another reason why blue is less commonly
            evolved in nature. The specific mechanisms and materials required
            for structural coloration are not as widespread or as easily evolved
            as those for pigment-based coloration, making true blue colors a
            rarer sight in the natural world.
          </p>
        </comet-card>
        <comet-toggle
          @click=${() =>
            (this.buttonConfig = {
              ...this.buttonConfig,
              disabled: !this.buttonConfig.disabled,
            })}
          style="width: max-content; margin-top: 24px;"
          >Toggle button disable</comet-toggle
        >
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        Comet default card
      </h3>

      <div
        id="basic-card-container"
        style="padding: 48px; background: var(--neutral-20)"
      >
        <comet-card id="card-component" title="Title" info="* required">
          <div id="description-slot">
            <p>Hola!</p>
          </div>
        </comet-card>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        Comet card with slotted header
      </h3>

      <div
        class="third-party"
        style="padding: 48px; background: var(--neutral-0)"
      >
        <comet-card .border="${true}">
          <div
            slot="comet-card-header"
            style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--neutral-40); padding: 16px 20px;"
          >
            <comet-small-card title="Allianz" description="Comparison Tool"
              ><comet-icon
                slot="comet-small-card-icon"
                type="company-logos"
                name="allianz"
                size="40"
                style="padding-right: 8px;"
              ></comet-icon>
            </comet-small-card>
            <vaadin-button>Visit website</vaadin-button>
          </div>
          <div
            style="display: flex; justify-content: space-between; align-items: center; padding: 20px;"
          >
            <div>
              <comet-icon name="copy" size="20" type="ui"></comet-icon>
              <span style="color: var(--primary-50);"
                >username: severus.snape</span
              >
            </div>
            <div>
              <comet-icon name="copy" size="20" type="ui"></comet-icon
              ><span style="color: var(--primary-50);"
                >password: **********</span
              >
            </div>
          </div>
        </comet-card>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        Comet card with slotted footer
      </h3>

      <div
        style="padding: 48px; background: var(--neutral-20); max-width: 500px"
      >
        <comet-card>
          <div>
            <div style="padding: 20px">
              <h3>Get the best offers for your insurance needs</h3>
              <p>
                You have questions about the insurances or simply want the best
                available price on the market? Get intouch withour advisors.
              </p>
              <div
                style="display: flex; justify-content: space-between; align-items: center; border: 3px solid var(--primary-30); border-radius: 10px; padding: 0 0 0 16px; margin-bottom: 16px;"
              >
                <span>Product 1</span>
                <comet-button label="Remove"></comet-button>
              </div>
              <div
                style="display: flex; justify-content: space-between; align-items: center; border: 3px solid var(--primary-30); border-radius: 10px; padding: 0 0 0 16px; margin-bottom: 24px;"
              >
                <span>Product 2</span>
                <comet-button label="Remove"></comet-button>
              </div>
            </div>

            <div
              slot="comet-card-footer"
              style="border-top: 1px solid var(--neutral-20);"
            >
              <div style="padding: 20px">
                <div style="display: flex; margin-bottom: 16px;">
                  <comet-icon type="wecons-circle" name="coin"></comet-icon>
                  <div style="margin-left: 8px;">
                    <div>Total cost from</div>
                    <div><b style="font-size: 20px;">90 €</b> / month</div>
                  </div>
                </div>
                <vaadin-button style="width: 100%;" theme="primary"
                  >Book consultation</vaadin-button
                >
                <div style="display: flex; justify-content: center;">
                  <comet-button label="Why get advised?"></comet-button>
                </div>
              </div>
            </div>
          </div>
        </comet-card>
      </div>
    `;
  }

  static styles = css`
    ::part(comet-card-container) {
      max-width: 900px;
    }

    .third-party ::part(comet-card-container) {
      max-width: 450px;
    }

    p {
      padding: 20px;
    }

    svg {
      height: 40px;
      width: 40px;
      margin-right: var(--spacing-md);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-card": DemoCard;
  }
}
