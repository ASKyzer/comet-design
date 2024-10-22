import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-custom-field",
  css`
    /* Styles which will be included in vaadin-custom-field local scope */

    :host {
      font-family: var(--lumo-font-family);
    }

    :host::part(label) {
      color: var(--comet-color-font-dark);
      font-size: var(--typo-body-size);
      font-weight: var(--typo-font-weights-semibold);
    }

    :host::part(input-field) {
      background-color: var(--neutral-0);
      border: 1px solid var(--comet-color-border);
      border-radius: var(--border-xs);
      color: var(--comet-color-font-dark);
      font-size: var(--typo-body-size);
      height: 50px;
    }

    :host(:hover)::part(input-field) {
      background-color: var(--comet-color-hover) !important;
    }

    :host([disabled])::part(input-field) {
      background-color: var(--comet-color-disabled-bg);
      border: none;
    }

    :host([disabled])::part(label) {
      color: var(--comet-color-disabled-label) !important;
      -webkit-text-fill-color: var(--comet-color-disabled-label) !important;
    }

    :host([disabled])::part(helper-text) {
      color: var(--comet-color-disabled) !important;
      -webkit-text-fill-color: var(--comet-color-disabled) !important;
    }

    :host([invalid])::part(input-field) {
      background-color: var(--comet-color-invalid-bg);
      border: 1px solid var(--comet-color-invalid);
    }

    :host([invalid]:hover)::part(input-field) {
      background-color: var(--comet-color-invalid-hover) !important;
    }

    :host([readonly])::part(input-field) {
      border: none;
    }

    :host([readonly]:hover)::part(input-field) {
      background-color: var(--neutral-0) !important;
    }

    :host::part(helper-text) {
      color: var(--comet-color-font-dark);
      -webkit-text-fill-color: var(--comet-color-font-dark);
    }

    :host([disabled])::part(helper-text) {
      color: var(--comet-color-disabled);
      -webkit-text-fill-color: var(--comet-color-disabled);
    }

    ::slotted(div[slot="error-message"]) {
      color: var(--comet-color-invalid);
      font-size: var(--typo-caption-size);
    }
  `
);
