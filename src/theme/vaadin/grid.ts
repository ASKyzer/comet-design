import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-grid",
  css`
    /* Styles which will be included in vaadin-button local scope */
    :host {
      background-color: unset !important;
      min-height: 600px !important;
      height: auto !important;
    }
    :host [part~="cell"] {
      background-color: unset !important;
      border: none !important;
      min-height: 60px !important;
    }
    :host [part~="row"] {
      background-color: unset !important;
      position: relative !important;
      transform: none !important;
    }
    :host [part~="header-cell"] {
      background-color: var(--neutral-0) !important;
    }
    :host [part~="header-cell"] ::slotted(vaadin-grid-cell-content) {
      border-right: solid 1px #e9e6ed !important;
      padding: 0px !important;
    }
    :host [part~="details-cell"] {
      z-index: initial !important;
    }
    :host [part~="odd-row"] > td {
      background-color: var(--primary-10, #faf7ff) !important;
    }
    :host [part~="even-row"] > td {
      background-color: var(--neutral-0) !important;
    }
    :host #scroller {
      flex-grow: 1 !important;
    }
    :host #table {
      flex-grow: 1 !important;
    }
    :host #items {
      display: flex !important;
      flex-direction: column !important;
      height: auto !important;
    }

    /* Space table */
    :host([type~="space"])::part(body-cell) {
      padding: var(--spacing-l) 0px !important;
    }

    /* Auto height table */
    :host([type~="auto-height"]) {
      min-height: 250px !important;
      height: auto !important;
    }
  `
);
