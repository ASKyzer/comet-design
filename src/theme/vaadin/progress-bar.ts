import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-progress-bar",
  css`
    /* Styles which will be included in vaadin-upload local scope */

    :host {
      font-family: var(--lumo-font-family);
    }

    :host::part(bar) {
      background-color: var(--neutral-30);
    }

    :host::part(value) {
      background-color: var(--primary-40);
      --lumo-progress-indeterminate-progress-bar-background: linear-gradient(
        to right,
        var(--primary-10) 10%,
        var(--primary-60)
      ) !important;
      --lumo-progress-indeterminate-progress-bar-background-reverse: linear-gradient(
        to left,
        var(--primary-10) 10%,
        var(--primary-60)
      ) !important;
    }

    :host::part(value)::before {
      background-color: var(--primary-90) !important;
    }

    :host([theme~="contrast"])::part(value) {
      background-color: var(--neutral-100) !important;
    }

    :host([theme~="error"])::part(value) {
      background-color: var(--danger-50) !important;
    }

    :host([theme~="success"])::part(value) {
      background-color: var(--success-50) !important;
    }
  `
);
