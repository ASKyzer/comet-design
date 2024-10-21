import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/toggle/comet-toggle.js";

@customElement("demo-toggle")
export class DemoToggle extends LitElement {
  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Toggle</h1>

      <vaadin-vertical-layout theme="spacing">
        <comet-toggle>Unchecked</comet-toggle>
        <comet-toggle disabled>Unchecked disabled</comet-toggle>
        <comet-toggle checked>Checked</comet-toggle>
        <comet-toggle checked disabled>Checked disabled</comet-toggle>
        <comet-toggle invalid>Invalid</comet-toggle>
      </vaadin-vertical-layout>
      <br />

      <h3>Focused State</h3>
      <br />

      <vaadin-vertical-layout theme="spacing">
        <div style="padding:16px">
          <comet-toggle focused>Focused unchecked</comet-toggle>
        </div>
        <div style="padding:16px">
          <comet-toggle focused checked>Focused checked</comet-toggle>
        </div>
        <div style="padding:16px">
          <comet-toggle focused invalid>Focused invalid</comet-toggle>
        </div>
      </vaadin-vertical-layout>

      <h3>No Ink</h3>
      <p>
        If true, the element will not produce a ripple effect when interacted
        with via the pointer.
      </p>

      <vaadin-vertical-layout theme="spacing">
        <comet-toggle noink>No Ink</comet-toggle>
        <comet-toggle noink invalid>No Ink Invalid</comet-toggle>
      </vaadin-vertical-layout>
    `;
  }

  static styles = css``;
}
