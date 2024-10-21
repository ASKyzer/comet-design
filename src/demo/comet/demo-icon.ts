import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/icon/comet-icon";

@customElement("demo-icon")
export class DemoIcon extends LitElement {
  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Icon</h1>

      <div class="icons-container">
        <h2 style="color: var(--primary-50); margin-top: 0">ui theme</h2>
        <div id="first-container">
          <comet-icon
            id="first-icon-component"
            name="user"
            size="100"
          ></comet-icon>
        </div>

        <h2 style="color: var(--primary-50); margin-top: 24px">
          wecons-helix theme
        </h2>
        <comet-icon
          name="globe"
          primaryColor="success-70"
          size="100"
          type="wecons-helix"
        ></comet-icon>

        <h2 style="color: var(--primary-50); margin-top: 24px">
          wecons-circle theme
        </h2>
        <comet-icon
          name="value-communicate-clearly"
          size="100"
          type="wecons-circle"
        ></comet-icon>

        <h2 style="color: var(--primary-50); margin-top: 24px">
          three-dimensional theme
        </h2>
        <comet-icon
          type="three-dimensional"
          name="life"
          size="100"
        ></comet-icon>

        <h2 style="color: var(--primary-50); margin-top: 24px">flags theme</h2>
        <comet-icon
          name="UnionofSouthAmericannations"
          size="100"
          type="flags"
        ></comet-icon>
        <comet-icon name="LA" size="100" type="flags"></comet-icon>
        <comet-icon name="ES" size="100" type="flags"></comet-icon>

        <h2 style="color: var(--primary-50); margin-top: 24px">
          company-logos theme
        </h2>
        <comet-icon
          name="swiss-life"
          size="100"
          type="company-logos"
        ></comet-icon>

        <h2 style="color: var(--primary-50); margin-top: 24px">URL theme</h2>
        <comet-icon
          src="https://cdn-web.wefox.com/public/pkg/@wefox/icons/1.7.11/svg/company-logos/allianz.svg"
          size="100"
          type="url"
        ></comet-icon>
        <comet-icon
          src="https://cdn-web.wefox.com/public/pkg/@wefox/icons/1.7.11/svg/three-dimensional/copilot.svg"
          size="100"
          type="url"
        ></comet-icon>
        <comet-icon
          src="https://cdn.pixabay.com/photo/2022/08/17/08/57/butterfly-7391954_1280.jpg"
          size="100"
          type="url"
        ></comet-icon>
      </div>
    `;
  }

  static styles = css`
    .icons-container {
      align-items: start;
      display: flex;
      flex-direction: column;
      padding: var(--spacing-jumbo);
    }
  `;
}
