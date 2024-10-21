import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-tab",
  css`
    /* Styles which will be included in vaadin-tabs local scope */
    :host {
      font-family: var(--lumo-font-family);
      color: var(--neutral-60);
      font-weight: var(--typo-font-weights-semibold);
    }

    :host(:hover) {
      color: var(--comet-color-font-light);
      font-weight: var(--typo-font-weights-bold);
    }

    :host([selected]) {
      color: var(--comet-color-font-light);
      font-weight: var(--typo-font-weights-semibold);
      transition: 0.6s color;
    }

    :host([selected])::before,
    :host([selected])::after {
      background-color: var(--comet-color-font-light);
      transition: color 0.25s ease, background 0.25s ease,
        border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
      width: 100%;
    }

    :host([orientation="vertical"][selected])::before,
    :host([orientation="vertical"][selected])::after {
      width: 2px;
    }

    :host([theme="no-border-bottom"]) ::slotted(vaadin-tab) {
      border-bottom: none;
    }
  `
);
