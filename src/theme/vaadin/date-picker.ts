import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-date-picker",
  css`
    /* Styles which will be included in vaadin-date-picker local scope */

    :host {
      font-family: var(--lumo-font-family);
    }

    :host::part(input-field) {
      background-color: var(--neutral-0);
      border: 1px solid var(--comet-color-border);
      border-radius: var(--border-xs);
      color: var(--comet-color-font-dark);
      font-size: var(--typo-body-size);
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
  "vaadin-input-container",
  css`
    /* Styles which will be included in vaadin-input-container local scope */

    :host {
      background-color: var(--neutral-0);
      border: 1px solid var(--comet-color-border);
      font-family: var(--lumo-font-family);
    }

    ::slotted(div[slot="suffix"])::before {
      color: var(--neutral-60) !important;
    }
  `
);

registerStyles(
  "vaadin-date-picker-overlay-content",
  css`
    /* Styles which will be included in vaadin-date-picker-year-scroller local scope */

    :host {
      color: var(--comet-color-font-dark);
    }

    ::slotted([slot="today-button"]),
    ::slotted([slot="cancel-button"]) {
      border: none;
      box-shadow: none;
      color: var(--primary-40);
    }
  `
);

registerStyles(
  "vaadin-date-picker-year",
  css`
    /* Styles which will be included in vaadin-date-picker-year-scroller local scope */

    :host([current])::part(year-number) {
      color: var(--primary-40) !important;
      font-weight: var(--typo-font-weights-bold) !important;
    }
  `
);

registerStyles(
  "vaadin-month-calendar",
  css`
    :host,
    :host::part(month-header) {
      color: var(--comet-color-font-dark);
    }

    :host::part(date):hover::before {
      background-color: var(--comet-color-hover) !important;
      border-radius: 4px !important;
    }

    :host::part(weekday) {
      color: var(--comet-color-font-light);
    }

    :host::part(date selected)::before {
      background-color: var(--comet-color-selected-dark) !important;
      border-radius: 4px !important;
    }

    :host::part(date selected):hover::before {
      background-color: var(--comet-color-selected-dark) !important;
      border-radius: 4px !important;
    }

    :host::part(date focused)::before {
      box-shadow: 0 0 0 1px, 0 0 0 3px !important;
      color: var(--primary-20) !important;
    }
  `
);
