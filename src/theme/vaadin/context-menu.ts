import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-context-menu-item",
  css`
    /* Styles which will be included in vaadin-context-menu local scope */

    :host {
      color: var(--comet-color-font-dark);
      font-family: var(--lumo-font-family);
    }

    :host(:hover) {
      background-color: var(--comet-color-hover) !important;
    }

    :host([focused]:not([disabled])),
    :host([focus-ring]:not([disabled])) {
      box-shadow: 0 0 0 2px var(--comet-color-selected) !important;
      margin: 2px 4px;
    }

    :host::part(checkmark)::before {
      color: var(--comet-color-font-light) !important;
    }

    :host([expanded]:not([disabled])) {
      background-color: var(--comet-color-selected-light) !important;
    }
  `
);
