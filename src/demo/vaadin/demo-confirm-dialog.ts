import "@vaadin/button";
import "@vaadin/confirm-dialog";
import type { ConfirmDialogOpenedChangedEvent } from "@vaadin/confirm-dialog";
import "@vaadin/horizontal-layout";
import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("demo-confirm-dialog")
export class DemoConfirmDialog extends LitElement {
  @state()
  private dialogOpened = false;

  @state()
  private dialogRiskOpened = false;

  @state()
  private dialogCartOpened = false;

  @state()
  private status = "";

  @state()
  private shoppingStatus = "";

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">
        vaadin Confirm Dialog
      </h1>

      <h4 style="color: var(--primary-50); margin-top: 0">
        This opens a modal with all three action types: Confirm, Reject and
        Cancle. This modal has the cancel and reject themes of our button themes
        of danger for the reject and subtle for the cancel. Confirm theme by
        default is primary. The content is a slot so we can add an comet-icon in
        the content display.
      </h4>

      <vaadin-horizontal-layout
        style="align-items: center; justify-content: start;"
        theme="spacing"
      >
        <vaadin-button theme="info primary" @click="${this.open}"
          >Open confirm dialog</vaadin-button
        >

        <vaadin-confirm-dialog
          header="Unsaved changes"
          cancel-button-visible
          reject-button-visible
          reject-text="Discard"
          confirm-text="Save"
          reject-theme="danger primary"
          cancel-theme="subtle primary"
          confirm-theme="success primary"
          .opened="${this.dialogOpened}"
          @opened-changed="${this.openedChanged}"
          @confirm="${() => {
            this.status = "Saved";
          }}"
          @cancel="${() => {
            this.status = "Canceled";
          }}"
          @reject="${() => {
            this.status = "Discarded";
          }}"
        >
          <div style="display: flex;">
            <comet-icon
              type="wecons-circle"
              name="info"
              primaryColor="warning-80"
              secondaryColor="warning-20"
            ></comet-icon>
            <div style="margin-left: 16px;">
              There are unsaved changes. Do you want to discard or save them?
            </div>
          </div>
        </vaadin-confirm-dialog>

        <span ?hidden="${this.status === ""}">Status: ${this.status}</span>
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 48px;">
        This opens a modal with ONLY a button to confirm and close the modal. No
        additional action is needed. Confirm theme by default is primary. The
        header is a slot so we can add an comet-icon in the header display.
      </h4>

      <vaadin-horizontal-layout
        style="align-items: center; justify-content: start;"
        theme="spacing"
      >
        <vaadin-button theme="success primary" @click="${this.openRisk}"
          >Send Email to Client</vaadin-button
        >

        <vaadin-confirm-dialog
          header="Risk analysis link shared!"
          confirm-text="Done"
          .opened="${this.dialogRiskOpened}"
          @opened-changed="${this.openedRiskChanged}"
        >
          <div slot="header" style="display: flex; align-items: center;">
            <comet-icon
              type="wecons-circle"
              name="safety"
              style="margin-right: 16px;"
            ></comet-icon>
            <h3>Risk analysis shared!</h3>
          </div>
          The risk analysis survey has been shared with the customer. As soon as
          they complete the questionaire, you will receive an email with details
          of the results and a calculated risk profile will be displayed in the
          details pages for that customer
        </vaadin-confirm-dialog>
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 48px;">
        This opens a modal where the confirm button will invoke an action and
        the cancel button will close the modal and remain on the page (but can
        also perform an action).
      </h4>

      <vaadin-horizontal-layout
        style="align-items: center; justify-content: start;"
        theme="spacing"
      >
        <vaadin-button theme="primary" @click="${this.openCart}"
          >Add to shopping cart</vaadin-button
        >

        <vaadin-confirm-dialog
          header="Items added to cart!"
          cancel-button-visible
          confirm-text="Checkout"
          cancel-text="Continue shopping"
          .opened="${this.dialogCartOpened}"
          @opened-changed="${this.openedCartChanged}"
          @confirm="${() => {
            this.shoppingStatus = "You are being redirected to checkout.";
          }}"
          @cancel="${() => {
            this.shoppingStatus =
              "Please add more items to your shopping cart.";
          }}"
        >
          The items have been successfully added to your shopping cart. Do you
          wish to checkout now or continue shopping?
        </vaadin-confirm-dialog>
        <span ?hidden="${this.shoppingStatus === ""}"
          >${this.shoppingStatus}</span
        >
      </vaadin-horizontal-layout>
    `;
  }

  openedChanged(e: ConfirmDialogOpenedChangedEvent) {
    this.dialogOpened = e.detail.value;
    if (this.dialogOpened) {
      this.status = "";
    }
  }

  openedRiskChanged(e: ConfirmDialogOpenedChangedEvent) {
    this.dialogRiskOpened = e.detail.value;
  }

  openedCartChanged(e: ConfirmDialogOpenedChangedEvent) {
    this.dialogCartOpened = e.detail.value;
  }

  private open() {
    this.dialogOpened = true;
  }

  private openRisk() {
    this.dialogRiskOpened = true;
  }

  private openCart() {
    this.dialogCartOpened = true;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }

    .section-title {
      color: var(--primary-50);
      font-weight: var(--typo-font-weights-bold);
      font-size: 1.35rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-confirm-dialog": DemoConfirmDialog;
  }
}
