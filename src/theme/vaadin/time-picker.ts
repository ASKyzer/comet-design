import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-time-picker",
  css`
    /* Styles which will be included in vaadin-time-picker local scope */

    :host {
      font-family: var(--lumo-font-family);
    }

    :host {
      font-family: var(--lumo-font-family);
    }

    :host::part(input-field) {
      height: 50px;
    }

    ::slotted(label[slot="label"]) {
      color: var(--comet-color-font-dark);
      font-size: var(--typo-body-size);
      font-weight: var(--typo-font-weights-semibold);
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

    :host(:hover)::part(input-field) {
      background-color: var(--comet-color-hover) !important;
    }

    :host::part(decrease-button),
    :host::part(increase-button) {
      color: var(--comet-color-font-dark);
    }

    ::slotted(input[slot="input"]) {
      color: var(--comet-color-font-dark) !important;
    }

    ::slotted(input[slot="input"])::placeholder {
      color: var(--comet-color-placeholder) !important;
    }

    ::slotted(div[slot="error-message"]) {
      color: var(--comet-color-invalid);
      font-size: var(--typo-caption-size);
    }

    ::slotted(comet-icon[slot="suffix"]),
    ::slotted(comet-icon[slot="prefix"]) {
      padding-top: 4px;
      margin-top: 2px;
    }

    ::slotted(div[slot="suffix"]),
    ::slotted(div[slot="prefix"]) {
      color: var(--comet-color-font-dark) !important;
      font-size: var(--typo-body-size);
      margin-top: 1.5px;
    }

    ::slotted(div[slot="helper"]) {
      color: var(--comet-color-font-dark);
      font-size: var(--typo-caption-size);
    }

    :host([disabled])::slotted(div[slot="helper"]) {
      color: red;
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
  `
);

registerStyles(
  "vaadin-time-picker-item",
  css`
    /* Styles which will be included in vaadin-combo-box-item local scope */

    :host {
      color: var(--comet-color-font-dark);
      font-family: var(--lumo-font-family);
    }

    :host(:hover) {
      background-color: var(--comet-color-hover) !important;
    }

    :host([selected]) {
      background-color: var(--comet-color-selected-light);
      box-shadow: 0 0 0 2px var(--comet-color-selected);
    }

    :host([focused]:not([disabled])) {
      box-shadow: 0 0 0 2px var(--comet-color-selected);
    }
  `
);
