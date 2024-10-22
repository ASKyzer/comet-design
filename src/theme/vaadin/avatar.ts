import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-avatar",
  css`
    /* Styles which will be included in vaadin-avatar local scope */
    :host {
      font-family: var(--lumo-font-family);
      color: var(--neutral-80);
      background-color: var(--neutral-20);
    }

    :host([has-color-index]) {
      color: var(--neutral-80);
    }
  `
);

registerStyles(
  "vaadin-menu-bar-button",
  css`
    :host {
      font-family: var(--lumo-font-family);
      border: none;
    }
  `
);

registerStyles(
  "vaadin-menu-bar-item",
  css`
    :host {
      font-family: var(--lumo-font-family);
    }
    :host(:hover) {
      background-color: var(--comet-color-hover) !important;
    }
    :host::part(checkmark)::before {
      color: var(--comet-color-font-light) !important;
    }
  `
);
