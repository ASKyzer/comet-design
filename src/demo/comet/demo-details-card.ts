import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/details-card/comet-details-card";

@customElement("demo-details-card")
export class DemoDetailsCard extends LitElement {
  public items: { label: string; value: string }[] = [
    {
      label: "Customer name",
      value: "Severus Snape",
    },
    {
      label: "Birthdate",
      value: "23/02/1978",
    },
    {
      label: "Ocuppation",
      value: "Teacher",
    },
    {
      label: "Smoker",
      value: "Yes",
    },
    {
      label: "Sum-insured",
      value: "€300,00",
    },
  ];

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        Comet Details Card
      </h1>

      <div style="margin-bottom: 16px;" id="cardContainer">
        <comet-details-card
          id="firstCard"
          title="Customer Information"
          .items="${this.items}"
          .underlined=${true}
        ></comet-details-card>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        Comet details card with two columns responsive display display breaking
        to 1 column at 900px.
      </h3>

      <div id="secondCardContainer" style="margin-bottom: 16px;">
        <comet-details-card
          id="secondCard"
          .twoColumns="${true}"
          title="Customer Information"
          .items="${this.items}"
        >
          <div slot="action-button">
            <vaadin-button
              theme="small primary"
              style="display: flex; align-items: center;"
            >
              <comet-icon
                name="edit"
                primaryColor="white"
                size="20"
                slot="prefix"
                style=" margin-right: 4px;"
              ></comet-icon>
              Edit</vaadin-button
            >
          </div>
        </comet-details-card>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        If we have a set width for the details card, we can just display it with
        the default of twoColumns = false.
      </h3>

      <div style="margin-bottom: 16px; max-width: 599px;" id="fixed-width">
        <comet-details-card
          title="Customer Information"
          .items="${this.items}"
        ></comet-details-card>
      </div>

      <h3 style="color: var(--primary-50); margin-top: 24px">
        Theme = vertical (horizontal is the defalt) where the label and value
        are vertically aligned. Label above the value.
      </h3>

      <div style="margin-bottom: 16px;" id="vertical">
        <comet-details-card
          title="Customer Information"
          .items="${this.items}"
          theme="vertical"
        ></comet-details-card>
      </div>
    `;
  }

  static styles = css``;
}
