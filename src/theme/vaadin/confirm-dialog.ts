import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-confirm-dialog-overlay",
  css`
    /* Styles which will be included in vaadin-confirm-dialog local scope */

    :host {
      font-family: var(--lumo-font-family);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex !important;
      align-items: center;
      justify-content: center;
    }

    :host::part(header),
    :host::part(message) {
      color: var(--comet-color-font-dark);
    }

    :host::part(footer) {
      background-color: var(--neutral-0);
      border-top: 1px solid var(--neutral-20);
      display: flex;
      justify-content: space-between;
    }

    ::slotted([slot="cancel-button"]),
    ::slotted([slot="reject-button"]) {
      border: none;
      box-shadow: none;
      font-weight: var(--typo-font-weights-bold);
    }
  `
);
