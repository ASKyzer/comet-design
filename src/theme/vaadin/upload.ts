import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-upload",
  css`
    /* Styles which will be included in vaadin-upload local scope */

    :host {
      font-family: var(--lumo-font-family);
    }

    :host::part(primary-buttons) {
      text-align: center;
    }

    ::slotted([slot="add-button"]) {
      // background-color: var(--primary-50);
      border-radius: 4px !important;
      // color: var(--neutral-0);
    }

    ::slotted([slot="drop-label-icon"]),
    ::slotted([slot="drop-label"]) {
      color: var(--neutral-70);
    }

    :host([dragover-valid]) {
      background-color: var(--primary-10);
      border-color: var(--primary-50);
    }
  `
);

registerStyles(
  "vaadin-upload-file",
  css`
    /* Styles which will be included in vaadin-upload local scope */

    :host {
      font-family: var(--lumo-font-family);
    }

    :host::part(name),
    :host::part(remove-button),
    :host::part(retry-button),
    :host::part(start-button) {
      color: var(--comet-color-font-dark);
    }

    :host([focused])::part(start-button) {
      box-shadow: 0 0 0 2px red !important;
    }

    :host::part(error),
    :host::part(warning-icon) {
      color: var(--comet-color-invalid);
    }

    :host::part(done-icon),
    :host::part(done-icon)::before {
      color: var(--primary-40);
    }
  `
);
