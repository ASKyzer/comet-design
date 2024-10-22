import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-select",
  css`
    /* Styles which will be included in vaadin-select local scope */

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

    :host([disabled])::part(input-field) {
      background-color: var(--comet-color-disabled-bg);
      border: none;
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

    :host([invalid])::part(input-field) {
      background-color: var(--comet-color-invalid-bg);
      border: 1px solid var(--comet-color-invalid);
    }

    :host([invalid]:hover)::part(input-field) {
      background-color: var(--comet-color-invalid-hover) !important;
    }

    :host(:hover)::part(input-field) {
      background-color: var(--comet-color-hover) !important;
      -webkit-background-color: var(--comet-color-hover) !important;
      -moz-background-color: var(--comet-color-hover) !important;
    }

    :host::placeholder {
      color: var(--comet-color-placeholder) !important;
      -webkit-color: var(--comet-color-placeholder) !important;
      -moz-color: var(--comet-color-placeholder) !important;
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
  "vaadin-select-item",
  css`
    /* Styles which will be included in vaadin-select-item local scope */

    :host {
      color: var(--comet-color-font-dark);
      font-family: var(--lumo-font-family);
    }

    :host(:hover:not(:first-child)) {
      background-color: var(--comet-color-hover);
    }

    :host(:hover:first-child) {
      background-color: var(--comet-neutral-0);
    }

    :host([selected]:not(:first-child)) {
      background-color: var(--comet-color-selected-light);
    }

    :host(:hover) {
      background-color: var(--comet-color-selected);
    }

    :host([focused]:not([disabled])) {
      box-shadow: 0 0 0 2px var(--comet-color-selected);
      margin: 2px 4px;
    }
  `
);
