import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/features-banner/comet-features-banner";

@customElement("demo-features-banner")
export class DemoFeaturesBanner extends LitElement {
  public primaryThemeButtonClick() {
    alert("Action button clicked on Primary banner!");
  }

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0;">
        Comet Features Banner
      </h1>

      <h2 style="color: var(--primary-50); margin-top: 48px">
        Banner theme primary
      </h2>

      <div class="primary-top" style="margin-bottom: 48px;">
        <comet-features-banner
          theme="primary"
          title="Create a claim is easy-peasy (icon = docs-protection)"
          description="Thanks to this our new feature, your customer able to make an
            informed choice and select the policy that best met their needs. How can we help you? Let's find a solution together."
          buttonLabel="Start a claim now"
          icon="docs-protection"
          @button-click="${this.primaryThemeButtonClick}"
        ></comet-features-banner>
      </div>

      <div class="primary-top" style="margin-bottom: 48px;">
        <comet-features-banner
          theme="primary"
          title="Create a claim is easy-peasy (icon = random)"
          description=" Thanks to this our new feature, your customer able to make an informed choice and select the policy that best met their needs."
          buttonLabel="Start a claim now"
          icon="random"
          @button-click="${this.primaryThemeButtonClick}"
        ></comet-features-banner>
      </div>

      <div class="primary-bottom" style="margin-bottom: 48px;">
        <comet-features-banner
          theme="primary"
          title="Create a claim is easy-peasy (icon = blocks)"
          description=" Thanks to this our new feature, your customer able to make an
            informed choice and select the policy that best met their needs."
          buttonLabel="Start a claim now"
          icon="blocks"
          @button-click="${this.primaryThemeButtonClick}"
        ></comet-features-banner>
      </div>

      <h2 style="color: var(--primary-50); margin-bottom: 48px;">
        Banner theme secondary
      </h2>

      <div class="secondary" style="margin-bottom: 48px;">
        <comet-features-banner
          theme="secondary"
          title="Do you need support?"
          description=" How can we help you? Let's find a solution together. You're not alone. How can we help you? Let's find a solution together. You're not alone."
          buttonLabel="Create cases"
          icon="shapes"
          @button-click="${this.primaryThemeButtonClick}"
          style="margin-bottom: 48px;"
        ></comet-features-banner>
      </div>

      <h2 style="color: var(--primary-50); margin-bottom: 48px;">
        Other Available Icons
      </h2>

      <div style="margin-bottom: 48px;">
        <comet-features-banner
          theme="primary"
          title="Icon = claim"
          description=" Thanks to this our new feature, your customer able to make an
            informed choice and select the policy that best met their needs."
          buttonLabel="Start a claim now"
          icon="claim"
          @button-click="${this.primaryThemeButtonClick}"
        ></comet-features-banner>
      </div>

      <div class="primary-top" style="margin-bottom: 48px;">
        <comet-features-banner
          theme="primary"
          title="Icon = viewnav"
          description=" Thanks to this our new feature, your customer able to make an
            informed choice and select the policy that best met their needs."
          buttonLabel="Start a claim now"
          icon="viewnav"
          @button-click="${this.primaryThemeButtonClick}"
        ></comet-features-banner>
      </div>

      <div class="primary-top" style="margin-bottom: 48px;">
        <comet-features-banner
          theme="primary"
          title="Icon = risk-analysis"
          description=" Thanks to this our new feature, your customer able to make an
            informed choice and select the policy that best met their needs."
          buttonLabel="Start a claim now"
          icon="risk-analysis"
          @button-click="${this.primaryThemeButtonClick}"
        ></comet-features-banner>
      </div>

      <div class="primary-top" style="margin-bottom: 48px;">
        <comet-features-banner
          theme="primary"
          title="Icon = lead-cost"
          description="You now have access to a new dashboard section for more effective management of lead costs and budgets."
          icon="lead-cost"
        ></comet-features-banner>
      </div>
    `;
  }

  static styles = css``;
}
