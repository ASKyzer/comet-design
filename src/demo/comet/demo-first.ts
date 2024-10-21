import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/first/comet-first";

@customElement("demo-first")
export class DemoFirst extends LitElement {
  render() {
    return html`<comet-first name="Comet Design"></comet-first>`;
  }
}
