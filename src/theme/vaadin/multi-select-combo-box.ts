import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-multi-select-combo-box",
  css`
    /* Styles which will be included in vaadin-combo-box local scope */

    :host {
      font-family: var(--lumo-font-family);
    }

    :host::part(label) {
      color: var(--comet-color-font-dark);
      font-size: var(--typo-body-size);
      font-weight: var(--typo-font-weights-semibold);
    }

    :host::part(toggle-button) {
      color: var(--comet-color-border);
    }

    :host::part(input-field) {
      background-color: var(--neutral-0);
      border: 1px solid var(--comet-color-border);
      border-radius: var(--border-xs);
      color: var(--comet-color-font-dark);
      font-size: var(--typo-body-size);
      height: 50px;
    }

    :host([readonly])::part(input-field) {
      border: none;
    }

    :host([readonly]:hover)::part(input-field) {
      background-color: var(--neutral-0) !important;
    }

    :host([invalid])::part(input-field) {
      background-color: var(--comet-color-invalid-bg);
      border: 1px solid var(--comet-color-invalid);
    }

    :host([invalid]:hover)::part(input-field) {
      background-color: var(--comet-color-invalid-hover) !important;
    }

    :host([disabled])::part(input-field) {
      background-color: var(--comet-color-disabled-bg);
      border: none;
    }

    :host([disabled])::part(label) {
      color: var(--comet-color-disabled-label);
      -webkit-text-fill-color: var(--comet-color-disabled-label);
    }

    :host(:hover)::part(input-field) {
      background-color: var(--neutral-0) !important;
    }

    ::slotted(input[slot="input"])::placeholder {
      color: var(--comet-color-placeholder) !important;
    }

    ::slotted(div[slot="error-message"]) {
      color: var(--comet-color-invalid);
      font-size: var(--typo-caption-size);
    }

    ::slotted(div[slot="helper"]) {
      color: var(--comet-color-font-dark);
      font-size: var(--typo-caption-size);
    }
  `
);

registerStyles(
  "vaadin-multi-select-combo-box-chip",
  css`
    /* Styles which will be included in vaadin-combo-box-item local scope */

    :host {
      background-color: var(--primary-10);
      height: 28px;
      font-family: var(--lumo-font-family);
    }

    :host([disabled]) {
      background-color: var(--neutral-40);
    }

    :host::part(label),
    :host::part(remove-button) {
      color: var(--comet-color-font-light);
    }
    :host([slot="overflow"])::before,
    :host([slot="overflow"])::after {
      border-color: var(--primary-20);
    }
  `
);

registerStyles(
  "vaadin-multi-select-combo-box-item",
  css`
    /* Styles which will be included in vaadin-combo-box-item local scope */

    :host {
      font-family: var(--lumo-font-family);
      color: var(--comet-color-font-dark);
    }

    :host(:hover:not([disabled])) {
      background-color: var(--comet-color-hover) !important;
    }

    :host::part(checkmark)::before {
      color: var(--comet-color-font-light);
    }
  `
);

registerStyles(
  "vaadin-multi-select-combo-box-container",
  css`
    :host(:hover) {
      background-color: var(--comet-color-hover) !important;
    }
  `
);
