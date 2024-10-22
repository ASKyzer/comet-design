import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles("vaadin-tooltip", css``);

registerStyles(
  "vaadin-tooltip-overlay",
  css`
    :host {
      font-family: var(--lumo-font-family);
    }

    :host::part(overlay) {
      background: var(--neutral-0);
      border-radius: 8px;
      padding: 8px 16px;
    }

    :host([theme~="table-tooltip"])::part(overlay) {
      background: var(--secondary-10);
      color: var(--secondary-90);
      border-radius: 8px;
      padding: 8px 16px;
    }
  `
);
