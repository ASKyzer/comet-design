import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-dialog-overlay",
  css`
    /* Styles which will be included in vaadin-dialog local scope */

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

    :host::part(header) {
      border-bottom: 1px solid var(--neutral-60);
    }

    :host::part(footer) {
      background-color: var(--neutral-0);
      border-top: 1px solid var(--neutral-20);
    }

    :host::part(backdrop) {
      background-color: var(--neutral-100);
      opacity: 0.7;
    }

    ::slotted([slot="cancel-button"]),
    ::slotted([slot="reject-button"]) {
      border: none;
      box-shadow: none;
      font-weight: var(--typo-font-weights-bold);
    }

    ::slotted([slot="title"]),
    :host::part(content) {
      color: var(--comet-color-font-dark);
    }

    #content {
      border-top: 1px solid var(--neutral-30);
      padding-top: 24px;
    }

    :host([theme~="no-padding"])::part(content) {
      padding: 0 !important;
    }

    :host([theme~="pill"])::part(overlay) {
      background-color: unset;
      border-radius: 100px;
      opacity: unset;
    }
  `
);
