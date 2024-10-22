import "@vaadin/button";
import "@vaadin/dialog";
import type { DialogOpenedChangedEvent } from "@vaadin/dialog";
import {
  dialogFooterRenderer,
  dialogHeaderRenderer,
  dialogRenderer,
} from "@vaadin/dialog/lit.js";
import "@vaadin/email-field";
import "@vaadin/horizontal-layout";
import "@vaadin/text-area";
import "@vaadin/text-field";
import "@vaadin/vertical-layout";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../components/icon/comet-icon";
import { PEOPLE } from "../constants/people";

@customElement("demo-dialog")
export class DemoDialog extends LitElement {
  @state()
  private dialogNewCustomerOpened = false;
  @state()
  private dialogCloseButtonOpened = false;
  @state()
  private dialogDeleteUserOpened = false;
  @state()
  private dialogDraggableOpened = false;
  @state()
  private dialogResizableOpened = false;
  @state()
  private people?: any[] = PEOPLE;

  private user = {
    firstName: "Gigi",
    lastName: "Fritz",
    email: "gigi.fritz@gmail.com",
    address: {
      street: "7121 Healy Drive",
      city: "Springfield",
      country: "USA",
      state: "VA",
    },
  };

  render() {
    return html`
      <h1 style="color: var(--primary-50); margin-top: 0">vaadin Dialog</h1>

      <h4 style="color: var(--primary-50); margin-top: 0">
        This opens a basic modal with a confirm and cancel action types. The
        content of the dialog is then rendered through the method
        dialogRenderer() and dialogFooterRenderer() and it can be pretty much
        anything we want. In this case, it is a form for add new customers by
        first and last name.
      </h4>

      <vaadin-horizontal-layout
        style="align-items: center; justify-content: start;"
        theme="spacing"
      >
        <vaadin-dialog
          header-title="New employee"
          .opened="${this.dialogNewCustomerOpened}"
          @opened-changed="${(event: DialogOpenedChangedEvent) => {
            this.dialogNewCustomerOpened = event.detail.value;
          }}"
          ${dialogRenderer(this.renderNewCustomerDialog, [])}
          ${dialogFooterRenderer(this.renderNewCustomerFooter, [])}
        ></vaadin-dialog>

        <vaadin-button
          theme="primary"
          @click="${() => {
            this.dialogNewCustomerOpened = true;
          }}"
        >
          Add new customer
          <comet-icon
            slot="suffix"
            name="business-man"
            type="wecons-helix"
            primaryColor="neutral-0"
          ></comet-icon>
        </vaadin-button>
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        This opens an informative modal with no action buttons or footer
        rendered. We use the dialogHeaderRenderer() method to add a close icon
        to the upper right to close the modal. The text fields are read only
        inputs.
      </h4>

      <vaadin-horizontal-layout
        style="align-items: center; justify-content: start;"
        theme="spacing"
      >
        <vaadin-dialog
          header-title="Customer details"
          .opened="${this.dialogCloseButtonOpened}"
          @opened-changed="${(event: DialogOpenedChangedEvent) => {
            this.dialogCloseButtonOpened = event.detail.value;
          }}"
          ${dialogHeaderRenderer(
            () => html`
              <comet-icon
                name="x"
                primaryColor="primary-90"
                style="cursor: pointer;"
                @click="${this.closeCloseButton}"
              ></comet-icon>
            `,
            []
          )}
          ${dialogRenderer(this.renderCloseButtonDialog, this.user)}
        ></vaadin-dialog>
        <vaadin-button
          theme="info"
          @click="${() => {
            this.dialogCloseButtonOpened = true;
          }}"
          >Show customer details</vaadin-button
        >
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        Buttons for closure actions, such as Save, Cancel, Delete, and so on,
        should be placed in the footer. See the Button component for guidelines
        for the placement of buttons in dialogs. Footer content is right-aligned
        by default. Components can be left-aligned by applying a margin:
      </h4>

      <vaadin-horizontal-layout
        style="align-items: center; justify-content: start;"
        theme="spacing"
      >
        <vaadin-dialog
          header-title="${`Delete user "${this.user?.firstName} ${this.user?.lastName}"?`}"
          .opened="${this.dialogDeleteUserOpened}"
          @opened-changed="${(event: DialogOpenedChangedEvent) => {
            this.dialogDeleteUserOpened = event.detail.value;
          }}"
          ${dialogRenderer(
            () => html`Are you sure you want to delete this user permanently?`,
            []
          )}
          ${dialogFooterRenderer(
            () => html`
              <vaadin-button
                theme="danger"
                @click="${() => (this.dialogDeleteUserOpened = false)}"
                style="margin-right: auto;"
              >
                Delete
              </vaadin-button>
              <vaadin-button
                theme="subtle"
                @click="${() => {
                  this.dialogDeleteUserOpened = false;
                }}"
                >Cancel</vaadin-button
              >
            `,
            []
          )}
        ></vaadin-dialog>
        <vaadin-button
          theme="danger"
          @click="${() => {
            this.dialogDeleteUserOpened = true;
          }}"
          >Delete customer</vaadin-button
        >
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        Dialogs can be made draggable, enabling the user to move them around
        using a pointing device. It’s recommended to make non-modal dialogs
        draggable, so that the user can interact with content that might
        otherwise be obscured by the Dialog. For example, a Dialog for taking
        notes or for adding widgets to a dashboard by dragging can offer a
        better experience by allowing the user to move the Dialog around.
      </h4>

      <vaadin-horizontal-layout
        style="align-items: center; justify-content: start;"
        theme="spacing"
      >
        <vaadin-dialog
          aria-label="Add note"
          draggable
          modeless
          .opened="${this.dialogDraggableOpened}"
          @opened-changed="${(event: DialogOpenedChangedEvent) => {
            this.dialogDraggableOpened = event.detail.value;
          }}"
          ${dialogHeaderRenderer(
            () => html`
              <h2
                class="draggable"
                style="flex: 1; cursor: move; margin: 0; font-size: 1.5em; font-weight: bold; padding: var(--lumo-space-m) 0;"
              >
                Add note
              </h2>
            `,
            []
          )}
          ${dialogRenderer(
            () => html`
              <vaadin-vertical-layout
                theme="spacing"
                style="width: 28rem; max-width: 100%; align-items: stretch;"
              >
                <vaadin-vertical-layout style="align-items: stretch;">
                  <vaadin-text-field label="Title"></vaadin-text-field>
                  <vaadin-text-area label="Description"></vaadin-text-area>
                </vaadin-vertical-layout>
              </vaadin-vertical-layout>
            `,
            []
          )}
          ${dialogFooterRenderer(
            () =>
              html`
                <vaadin-button
                  theme="subtle"
                  @click="${() => (this.dialogDraggableOpened = false)}"
                  >Cancel</vaadin-button
                >
                <vaadin-button
                  theme="primary"
                  @click="${() => (this.dialogDraggableOpened = false)}"
                  >Add note</vaadin-button
                >
              `,
            []
          )}
        ></vaadin-dialog>
        <vaadin-button @click="${() => (this.dialogDraggableOpened = true)}"
          >Show draggable dialog</vaadin-button
        >
      </vaadin-horizontal-layout>

      <h4 style="color: var(--primary-50); margin-top: 24px;">
        A resizable dialog allows the user to resize the Dialog by dragging from
        the edges of the Dialog with a pointing device. Dialogs aren’t resizable
        by default.
      </h4>

      <vaadin-horizontal-layout
        style="align-items: center; justify-content: start;"
        theme="spacing"
      >
        <vaadin-dialog
          header-title="Employee list"
          resizable
          draggable
          .opened="${this.dialogResizableOpened}"
          @opened-changed="${(event: DialogOpenedChangedEvent) => {
            this.dialogResizableOpened = event.detail.value;
          }}"
          ${dialogRenderer(
            () => html`
              <vaadin-vertical-layout
                theme="spacing"
                style="max-width: 100%; min-width: 300px; height: 100%; align-items: stretch;"
              >
                <table>
                  <thead>
                    <tr>
                      ${Object.keys(this.people ? this.people[0] : []).map(
                        (header) => {
                          return html`
                            <th style="text-align: left">
                              ${header.toLowerCase().charAt(0).toUpperCase() +
                              header.toLowerCase().slice(1)}
                            </th>
                          `;
                        }
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    ${this.people?.map((person) => {
                      return html`
                        <tr>
                          ${Object.keys(person).map((prop) => {
                            return html`
                              <td
                                style="padding: 8px 16px 8px 0; border-top: 1px solid lightgrey;"
                              >
                                ${person[prop]}
                              </td>
                            `;
                          })}
                        </tr>
                      `;
                    })}
                  </tbody>
                </table>
              </vaadin-vertical-layout>
            `,
            this.people
          )}
        ></vaadin-dialog>
        <vaadin-button @click="${() => (this.dialogResizableOpened = true)}">
          Show resizable dialog
          <comet-icon
            slot="prefix"
            name="distribution"
            type="wecons-helix"
            primaryColor="primary-50"
          ></comet-icon>
        </vaadin-button>
      </vaadin-horizontal-layout>
    `;
  }

  private renderNewCustomerDialog = () => html`
    <vaadin-vertical-layout
      style="align-items: stretch; width: 24rem; max-width: 100%;"
    >
      <vaadin-text-field label="First name"></vaadin-text-field>
      <vaadin-text-field label="Last name"></vaadin-text-field>
    </vaadin-vertical-layout>
  `;

  private renderNewCustomerFooter = () => html`
    <vaadin-button @click="${this.closeNewCustomer}">Cancel</vaadin-button>
    <vaadin-button theme="primary" @click="${this.closeNewCustomer}"
      >Add</vaadin-button
    >
  `;

  private renderCloseButtonDialog = () => html`
    <vaadin-vertical-layout
      theme="spacing"
      style="width: 350px; max-width: 100%; align-items: stretch;"
    >
      <vaadin-vertical-layout style="align-items: stretch;">
        <vaadin-text-field
          label="Name"
          value="${`${this.user?.firstName} ${this.user?.lastName}`}"
          readonly
          style="padding-top: 0;"
        ></vaadin-text-field>
        <vaadin-email-field
          label="Email"
          value="${ifDefined(this.user?.email)}"
          readonly
        ></vaadin-email-field>
        <vaadin-text-field
          label="Address"
          value="${this.addressDescription()}"
          readonly
        ></vaadin-text-field>
      </vaadin-vertical-layout>
    </vaadin-vertical-layout>
  `;

  addressDescription() {
    if (!this.user) {
      return "";
    }
    const { address } = this.user;
    return `${address.street}, ${address.city}, ${address.state}, ${address.country}`;
  }

  private closeNewCustomer() {
    this.dialogNewCustomerOpened = false;
  }

  closeCloseButton() {
    this.dialogCloseButtonOpened = false;
  }

  static styles = css`
    :host {
      font-family: var(--lumo-font-family);
    }
  `;
}
