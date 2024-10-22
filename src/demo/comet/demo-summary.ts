import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/summary/comet-summary";
import { SummaryData } from "../../components/summary/interfaces/summary-data";

@customElement("demo-summary")
export class DemoSummary extends LitElement {
  @state()
  data: SummaryData = {
    lines: [
      {
        label: "Birthdate",
        value: "23/04/1987",
        startsGroup: false,
      },
      {
        label: "Smoke",
        value: "Yes",
        startsGroup: false,
      },
      {
        label: "Occupation",
        value: "Teacher",
        startsGroup: false,
      },
      {
        label: "Sum-insured",
        value: "€300,00",
        startsGroup: false,
      },
      {
        label: "Payment Frequency",
        value: "Monthly",
        startsGroup: false,
      },
      {
        label: "Carrier",
        value: "€13,20",
        startsGroup: true,
      },
    ],
    downloadData: {
      title: "Available documents",
      description:
        "Here you can find and download the latest offer document in .zip format. If you want to see all your offers for this customer, please visit offer list.",
      btnText: "Download offer",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  };

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Summary</h1>
      <div class="container">
        <comet-summary
          iconType="three-dimensional"
          icon="car"
          title="Term-life calculation"
          totallabel="Total"
          total="54,19 € / Month"
          .data=${this.data}
        >
        </comet-summary>
      </div>
    `;
  }

  static styles = css`
    .container {
      max-width: 460px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-summary": DemoSummary;
  }
}
