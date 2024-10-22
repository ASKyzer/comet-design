import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("demo-home")
export class DemoHome extends LitElement {
  render() {
    return html`
      <div class="container">
        <h1 class="title">Comet Design System</h1>

        <section>
          <h2 class="section-title">What is the Comet Design System?</h2>
          <p>
            The Comet Design System is a comprehensive UI components library
            that provides a consistent and efficient way to build web
            applications. It combines the power of Vaadin components with
            custom-built elements to create a cohesive and visually appealing
            user interface.
          </p>
        </section>

        <section>
          <h2 class="section-title">Key Features</h2>
          <ul>
            <li>Extension of Vaadin components</li>
            <li>Custom-built components</li>
            <li>Consistent styling across all elements</li>
            <li>Part of a global design system UI</li>
          </ul>
        </section>

        <section>
          <h2 class="section-title">Extending Vaadin Components</h2>
          <p>
            Comet builds upon the robust foundation of Vaadin components,
            enhancing them to fit seamlessly within our design system. We've
            extended these components to:
          </p>
          <ul>
            <li>Align with our specific design language</li>
            <li>Add new functionalities where needed</li>
            <li>Ensure consistency with our custom components</li>
            <li>
              Build on the powerful
              <a
                href="https://vaadin.com/docs/latest/components"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vaadin framework
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="section-title">Custom Components</h2>
          <p>
            In addition to extended Vaadin components, Comet includes a set of
            custom-built components. These are designed to:
          </p>
          <ul>
            <li>Fill gaps in the Vaadin component library</li>
            <li>Provide specialized functionality for our use cases</li>
            <li>
              Maintain the same high standards of performance and accessibility
            </li>
          </ul>
        </section>

        <section>
          <h2 class="section-title">Part of a Global Design System</h2>
          <p>
            The Comet Design System is not just a collection of components; it's
            part of a larger, global design system UI. This means:
          </p>
          <ul>
            <li>Consistent look and feel across all applications</li>
            <li>
              Standardized design tokens (colors, typography, spacing, etc.)
            </li>
            <li>Unified user experience across different platforms</li>
          </ul>
        </section>

        <section>
          <h2 class="section-title">Styling Vaadin Components</h2>
          <p>
            To achieve a cohesive look, we've carefully styled Vaadin components
            to match our design system. This includes:
          </p>
          <ul>
            <li>Custom CSS to align with our color scheme and typography</li>
            <li>Modifications to component structures where necessary</li>
            <li>Ensuring responsive design across all screen sizes</li>
          </ul>
        </section>
      </div>
    `;
  }

  static styles = css`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px 20px 20px;
      font-family: var(--lumo-font-family);
      color: var(--lumo-body-text-color);
    }

    .title {
      color: var(--primary-50);
      margin-top: 0;
    }

    section {
      color: var(--comet-color-font-dark);
      margin-bottom: 30px;
    }

    ul {
      padding-left: 20px;
    }

    li {
      margin-bottom: 10px;
    }

    a {
      color: var(--primary-50);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-home": DemoHome;
  }
}
