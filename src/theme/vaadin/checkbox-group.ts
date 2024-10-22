import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-checkbox-group",
  css`
    /* Styles which will be included in vaadin-checkbox-group local scope */

    :host {
      font-family: var(--lumo-font-family);
    }

    :host::part(label) {
      color: var(--comet-color-font-dark);
      font-size: var(--typo-body-size);
      font-weight: var(--typo-font-weights-semibold);
    }

    ::slotted(div[slot="helper"]) {
      color: var(--comet-color-font-dark);
      font-size: var(--typo-caption-size);
    }

    ::slotted(div[slot="error-message"]) {
      color: var(--comet-color-invalid);
      font-size: var(--typo-caption-size);
    }
    :host([disabled])::part(label) {
      color: var(--comet-color-disabled-label);
      -webkit-text-fill-color: var(--comet-color-disabled-label);
    }
  `
);
