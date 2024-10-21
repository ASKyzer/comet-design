import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-notification-card",
  css`
    /* Styles which will be included in vaadin-notification-card local scope */

    :host {
      font-family: var(--lumo-font-family);
    }

    :host::part(content) {
      border-radius: var(--border-s);
      color: var(--neutral-80);
    }

    :host([theme~="success"])::part(overlay) {
      background-color: var(--success-20);
    }

    :host([theme~="success"])::part(content) {
      background-color: var(--success-20);
      color: var(--success-80);
    }

    :host([theme~="danger"])::part(overlay) {
      background-color: var(--danger-20);
    }

    :host([theme~="danger"])::part(content) {
      background-color: var(--danger-20);
      color: var(--danger-80);
    }

    :host([theme~="info"])::part(overlay) {
      background-color: var(--info-20);
    }

    :host([theme~="info"])::part(content) {
      background-color: var(--info-20);
      color: var(--info-80);
    }

    :host([theme~="warning"])::part(overlay) {
      background-color: var(--warning-20);
    }

    :host([theme~="warning"])::part(content) {
      background-color: var(--warning-20);
      color: var(--warning-80);
    }

    :host([theme~="comms-error"]) [part~="content"] {
      padding: 0px;
    }

    :host([theme~="comms-error"]) [part~="overlay"] {
      width: 100%;
    }

    :host([theme~="copilot-success"]) [part~="content"] {
      padding: 0px;
    }

    :host([theme~="copilot-success"]) [part~="overlay"] {
      width: 100%;
    }

    :host([theme~="contrast"])::part(overlay) {
      background-color: var(--primary-100) !important;
    }

    :host([theme~="contrast"])::part(content) {
      background-color: var(--primary-100) !important;
      color: var(--neutral-0) !important;
    }
  `
);
