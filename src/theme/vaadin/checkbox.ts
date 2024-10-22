import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-checkbox",
  css`
    /* Styles which will be included in vaadin-checkbox local scope */

    :host {
      font-family: var(--lumo-font-family);
      cursor: pointer;
    }

    :host::part(checkbox) {
      background-color: var(--neutral-0);
      border: 1px solid var(--comet-color-border);
      border-radius: var(--border-xs);
    }

    :host([checked])::part(checkbox),
    :host([checked]:hover)::part(checkbox) {
      background-color: var(--comet-color-selected-dark) !important;
      border: 1px solid var(--comet-color-selected-dark) !important;
    }

    :host([disabled])::part(checkbox) {
      border: 1px solid var(--comet-color-disabled) !important;
      background-color: var(--neutral-10) !important;
    }

    :host([disabled])::part(label) {
      color: var(--comet-color-disabled) !important;
      -webkit-text-fill-color: var(--comet-color-disabled) !important;
      -moz-text-fill-color: var(--comet-color-disabled) !important;
    }

    :host(:hover)::part(checkbox) {
      background-color: var(--comet-color-hover) !important;
    }

    :host(:hover)::part(checkbox)::before {
      background-color: var(--comet-color-hover);
    }

    :host([invalid])::part(checkbox) {
      background-color: var(--comet-color-invalid-bg);
      border: 1px solid var(--comet-color-invalid);
    }

    :host([invalid]:hover)::part(checkbox) {
      background-color: var(--comet-color-invalid-hover) !important;
    }

    :host([disabled]) {
      color: var(--comet-color-disabled) !important;
      -webkit-text-fill-color: var(--comet-color-disabled) !important;
      -moz-text-fill-color: var(--comet-color-disabled) !important;
    }

    ::slotted(label[slot="label"]) {
      color: var(--comet-color-font-dark);
    }
  `
);

registerStyles(
  "vaadin-checkbox-group",
  css`
    /* Styles which will be included in vaadin-checkbox local scope */

    :host {
      font-family: var(--lumo-font-family);
      cursor: pointer;
    }

    :host::part(checkbox) {
      background-color: var(--neutral-0);
      border: 1px solid var(--comet-color-border);
      border-radius: var(--border-xs);
    }

    :host([checked])::part(checkbox),
    :host([checked]:hover)::part(checkbox) {
      background-color: var(--comet-color-selected-dark) !important;
      border: 1px solid var(--comet-color-selected-dark) !important;
    }

    :host([disabled])::part(checkbox) {
      border: 1px solid var(--comet-color-disabled);
    }

    :host(:hover)::part(checkbox) {
      background-color: var(--comet-color-hover) !important;
    }

    :host(:hover)::part(checkbox)::before {
      background-color: var(--comet-color-hover);
    }

    :host([invalid])::part(checkbox) {
      background-color: var(--comet-color-invalid-bg);
      border: 1px solid var(--comet-color-invalid);
    }

    :host([invalid]:hover)::part(checkbox) {
      background-color: var(--comet-color-invalid-hover) !important;
    }

    :host([disabled])::part(label) {
      color: var(--comet-color-disabled-label) !important;
      -webkit-text-fill-color: var(--comet-color-disabled-label) !important;
      -moz-text-fill-color: var(--comet-color-disabled-label) !important;
    }

    :host([disabled])::part(helper-text) {
      color: var(--comet-color-disabled) !important;
      -webkit-text-fill-color: var(--comet-color-disabled) !important;
      -moz-text-fill-color: var(--comet-color-disabled) !important;
    }

    :host([disabled])::part(group-field) {
      color: var(--comet-color-disabled) !important;
      -webkit-text-fill-color: var(--comet-color-disabled) !important;
      -moz-text-fill-color: var(--comet-color-disabled) !important;
    }

    :host([disabled])::slotted(label[slot="label"]) {
      color: var(--comet-color-disabled-lable) !important;
    }

    ::slotted(label[slot="label"]) {
      color: var(--comet-color-font-dark);
    }
  `
);
