import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "../../components/stages/comet-stages";
import { StageItem } from "../../components/stages/interfaces/stage-item.interface";

@customElement("demo-stages")
export class DemoStages extends LitElement {
  public _stagesItems: StageItem[];

  constructor() {
    super();
    this._stagesItems = [
      {
        title: "Lead Qualification",
        subtitle: "Define leads qualification",
        router_link: "stage/qualification",
        state: "done",
      },
      {
        title: "Preliminary Consultation",
        subtitle: "Contact and introduce services",
        router_link: "stage/consultation",
        state: "active",
      },
      {
        title: "Offer creation disabled",
        subtitle: "Create an offer and share",
        router_link: "stage/offer",
        state: "disabled",
      },
      {
        title: "Risk Assessment",
        subtitle: "Vary tariffs for pre-existing conditions",
        router_link: "stage/risk",
        state: "next",
      },
      {
        title: "Create Application",
        subtitle: "Complete first step of the contract",
        router_link: "stage/application",
        state: "next",
        icon: "car",
      },
    ];
  }

  set stagesItems(val) {
    let oldVal = this._stagesItems;
    this._stagesItems = val;
    this.requestUpdate("stagesItems", oldVal);
  }

  get stagesItems() {
    return this._stagesItems;
  }

  updateStages() {
    const firstNextIndex = this.stagesItems.indexOf(
      this.stagesItems.find((s) => s.state === "next")
    );

    this.stagesItems = this.stagesItems.map((i, idx) => {
      if (i.state === "active") {
        i.state = "done";
      }

      if (i.state === "next" && idx === firstNextIndex) {
        i.state = "active";
      }

      return i;
    });
  }

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">Comet stages</h1>
      <div>
        <comet-stages
          .stages="${this.stagesItems}"
          @navigate="${(event: { detail: string }) =>
            console.log(event.detail)}"
        >
        </comet-stages>
      </div>

      <comet-button
        @click=${this.updateStages}
        label="Update Stages"
        theme="flushed"
        trailingIcon="arrow-right"
      ></comet-button>
    `;
  }

  static styles = css``;
}
