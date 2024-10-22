import { Notification } from "@vaadin/notification";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/result/comet-result";

@customElement("demo-result")
export class DemoResultElement extends LitElement {
  buttonClickHandler(type: string) {
    return (event: CustomEvent) => {
      Notification.show(
        `${type.toUpperCase()} button clicked, now do something!!`,
        {
          position: "bottom-start",
          theme: type,
          duration: 5000,
        }
      );
    };
  }

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet Result</h1>

      <div class="container">
        <comet-result
          id="result-warning"
          type="warning"
          message="Oops, internal server error"
          description="The server encountered an error and was unable to complete the request"
        >
          <comet-default-button
            @click="${this.buttonClickHandler("warning")}"
            id="result-warning-button"
            >Reload Page</comet-default-button
          >
        </comet-result>
      </div>

      <hr />

      <div class="container">
        <comet-result
          id="result-info"
          type="info"
          message="All went well"
          description="You will receive an email in the next two days"
        >
        </comet-result>
      </div>

      <hr />

      <div class="container">
        <comet-result
          id="result-success"
          type="success"
          message="All good"
          description="You have successfully done whatever"
        >
          <comet-default-button
            @click="${this.buttonClickHandler("success")}"
            id="result-success-button"
            >Go Home</comet-default-button
          >
        </comet-result>
      </div>

      <hr />

      <div class="container">
        <comet-result
          id="result-error"
          type="error"
          message="All bad"
          description="Something bad happened. Sorry :("
        >
          <comet-default-button
            @click="${this.buttonClickHandler("danger")}"
            id="result-error-button"
            >Retry</comet-default-button
          >
        </comet-result>
      </div>
    `;
  }

  static styles = css`
    .container {
      width: 50%;
      margin: auto;
      margin-bottom: 30px;
    }
  `;
}
