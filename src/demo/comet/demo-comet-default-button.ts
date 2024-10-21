import "@vaadin/button";
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/card/comet-card";
import "../../components/default-button/comet-default-button";
import "../../components/icon/comet-icon";

@customElement("demo-comet-default-button")
export class DemoCometDefaultButton extends LitElement {
  render() {
    return html`
      <h1 id="page-header" style="color: var(--primary-50); margin-top: 0">
        Comet Custom Default Button
      </h1>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        The Comet custom default button is used when the vaadin button defaut
        theme needs to be used with icons. Due to the icons being a slot, it was
        impossible to change the icon color in the focused state as we couldn't
        manipulate the vaadin button code. This compoment extends the vaadin
        button default theme and adds additional logic to change the icons
        colors.
      </h3>
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <comet-default-button>Without Icons</comet-default-button>
        <comet-default-button leadingIcon="arrow-left"
          >With ui icons</comet-default-button
        >
        <comet-default-button iconTheme="wecons-helix" leadingIcon="rocket"
          >With wecons-helix</comet-default-button
        >
        <comet-default-button iconTheme="wecons-circle" leadingIcon="mail"
          >With wecons-circle</comet-default-button
        >
        <comet-default-button
          iconTheme="three-dimensional"
          leadingIcon="birthday"
          >With 3D icons</comet-default-button
        >
        <comet-default-button iconTheme="flags" leadingIcon="ES"
          >With flags</comet-default-button
        >
        <comet-default-button
          iconTheme="ui"
          leadingIcon="home"
          trailingIcon="arrow-drop-down"
          >Two icons</comet-default-button
        >
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">Disabled State</h3>
      <div style="display: flex; gap: 16px; flex-wrap: wrap;">
        <comet-default-button disabled>Without Icons</comet-default-button>
        <comet-default-button disabled trailingIcon="globe"
          >With ui icons</comet-default-button
        >
        <comet-default-button
          disabled
          iconTheme="wecons-helix"
          trailingIcon="rocket"
          >With wecons-helix</comet-default-button
        >
        <comet-default-button
          disabled
          iconTheme="wecons-circle"
          trailingIcon="mail"
          >With wecons-circle</comet-default-button
        >
        <comet-default-button
          disabled
          iconTheme="three-dimensional"
          trailingIcon="birthday"
          >With 3D icons</comet-default-button
        >
        <comet-default-button disabled iconTheme="flags" trailingIcon="ES"
          >With flags</comet-default-button
        >
        <comet-default-button
          disabled
          .disableIconColor=${true}
          iconTheme="wecons-circle"
          trailingIcon="mail"
          >With wecons-circle</comet-default-button
        >
        <comet-default-button
          disabled
          .disableIconColor=${true}
          iconTheme="three-dimensional"
          trailingIcon="birthday"
          >With 3D icons</comet-default-button
        >
        <comet-default-button
          disabled
          .disableIconColor=${true}
          iconTheme="flags"
          trailingIcon="ES"
          >With flags</comet-default-button
        >
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px;">Sizes</h3>
      <div
        id="sizes-container"
        style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center"
      >
        <comet-default-button
          id="small-button"
          iconTheme="wecons-circle"
          leadingIcon="product-travel"
          size="small"
          >Small</comet-default-button
        >
        <comet-default-button
          id="medium-button"
          iconTheme="wecons-circle"
          leadingIcon="product-liability-household"
          >(default)</comet-default-button
        >
        <comet-default-button
          id="large-button"
          iconTheme="wecons-circle"
          leadingIcon="product-dental"
          size="large"
          >Large</comet-default-button
        >
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px;">Icon only</h3>
      <div
        style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center"
      >
        <comet-default-button
          iconTheme="wecons-circle"
          leadingIcon="product-travel"
          size="small"
        ></comet-default-button>
        <comet-default-button
          iconTheme="wecons-circle"
          leadingIcon="product-liability-household"
        ></comet-default-button>
        <comet-default-button
          iconTheme="wecons-circle"
          leadingIcon="product-dental"
          size="large"
        ></comet-default-button>
        <comet-default-button
          trailingIcon="arrow-drop-down"
          leadingIcon="globe"
          size="small"
        ></comet-default-button>
        <comet-default-button
          trailingIcon="arrow-drop-down"
          leadingIcon="phone"
          size="large"
        ></comet-default-button>
        <comet-default-button
          trailingIcon="arrow-drop-down"
          leadingIcon="stack"
          size="large"
        ></comet-default-button>
      </div>
    `;
  }

  static styles = css`
    comet-card {
      width: 100%;
    }
  `;
}
