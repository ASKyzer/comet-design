import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-radio-group",
  css`
    :host {
      font-family: var(--lumo-font-family);
    }

    :host::part(label) {
      color: var(--comet-color-font-dark);
      font-size: var(--typo-body-size);
      font-weight: var(--typo-font-weights-semibold);
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

    :host([disabled])::part(helper-text) {
      color: var(--comet-color-disabled);
      -webkit-text-fill-color: var(--comet-color-disabled);
    }

    ::slotted(div[slot="helper"]) {
      color: var(--comet-color-font-dark);
      font-size: var(--typo-caption-size);
    }

    :host vaadin-group-field-container {
      color: red !important;
    }

    ::slotted(div[slot="error-message"]) {
      color: var(--comet-color-invalid);
      font-size: var(--typo-caption-size);
    }
  `
);

registerStyles(
  "vaadin-radio-button",
  css`
    :host {
      font-family: var(--lumo-font-family);
      cursor: pointer;
    }

    ::slotted(label[slot="label"]) {
      color: var(--comet-color-font-dark);
      font-size: var(--typo-body-size);
    }

    :host([disabled]) {
      color: var(--comet-color-disabled);
    }

    :host::part(radio) {
      background-color: var(--neutral-0);
      border: 1px solid var(--neutral-50);
    }

    :host::part(radio)::before {
      transform: scale(1.6);
    }

    :host(:hover)::part(radio) {
      background-color: var(--comet-color-hover) !important;
    }

    :host([disabled]hover)::part(radio):hover {
      background-color: var(--comet-color-disabled-label) !important;
    }

    :host([checked])::part(radio) {
      background-color: var(--comet-color-font-light) !important;
    }

    :host([disabled])::part(radio) {
      background-color: var(--comet-color-disabled-bg) !important;
      border: 1px solid var(--comet-color-disabled-bg) !important;
    }

    :host([disabled])::part(radio):hover {
      background-color: var(--comet-color-disabled-bg) !important;
      border: 1px solid var(--comet-color-disabled-bg) !important;
    }

    :host([invalid])::part(radio) {
      border: 1px solid var(--comet-color-invalid);
    }

    :host([invalid]:hover)::part(radio) {
      background-color: var(--comet-color-invalid-hover) !important;
    }
  `
);
