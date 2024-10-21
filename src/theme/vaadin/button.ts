import { registerStyles } from "@vaadin/vaadin-themable-mixin";
import { css } from "lit";

registerStyles(
  "vaadin-button",
  css`
    /* Styles which will be included in vaadin-button local scope */

    :host {
      background-color: var(--neutral-0);
      border: 1px solid var(--primary-50);
      border-radius: var(--border-xl);
      box-shadow: 0 1px 3px rgba(51, 55, 66, 0.06),
        0 2px 6px rgba(51, 55, 66, 0.02);
      box-sizing: border-box;
      color: var(--primary-50);
      cursor: pointer;
      display: inline-block;
      padding: var(--spacing-md);
      transition: 0.2s ease-in-out;
      font-size: var(--typo-body-size);
      font-weight: var(--typo-font-weights-semibold);
      line-height: var(--typo-body-line-height);
      padding: var(--spacing-md);
      font-size: var(--typo-body-size);
      font-weight: var(--typo-font-weights-semibold);
      line-height: var(--typo-body-line-height);
      height: 56px;
    }

    :host([theme~="large"]) {
      padding: var(--spacing-md) var(--spacing-xl);
      font-size: var(--typo-body-size);
      line-height: var(--typo-body-line-height);
      height: 56px;
    }

    :host([theme~="normal"]) {
      padding: var(--spacing-md);
      font-size: var(--typo-body-size);
      line-height: var(--typo-body-line-height);
      height: 56px;
    }

    :host([theme~="small"]) {
      padding: var(--spacing-xs) var(--spacing-md);
      font-size: var(--typo-body-size);
      line-height: var(--typo-body-line-height);
      height: 40px;
    }

    /* Default theme */
    :host([theme~="default"]) {
      background-color: var(--neutral-0);
      color: var(--primary-50);
      box-shadow: 0 1px 3px rgba(51, 55, 66, 0.06),
        0 2px 6px rgba(51, 55, 66, 0.02);
      border: 1px solid var(--primary-50);
    }

    :host([theme~="default"]:hover) {
      background-color: var(--primary-10);
      box-shadow: 0 2px 4px rgba(51, 55, 66, 0.04),
        0 4px 8px rgba(51, 55, 66, 0.04), 0 4px 12px rgba(51, 55, 66, 0.02);
    }

    :host([theme~="default"]:active) {
      background-color: var(--primary-50);
      box-shadow: none;
      border: 1px solid var(--primary-50);
      color: var(--primary-10);
    }

    :host([theme~="default"]:focus) {
      background-color: var(--primary-50);
      color: var(--primary-10);
      box-shadow: none;
      outline-color: var(--primary-80);
    }

    :host([theme~="default"][disabled]) {
      color: var(--comet-color-disabled-label);
      background-color: var(--neutral-20);

      border: 0;
      box-shadow: none;
      pointer-events: none;
    }

    /* Link theme */
    :host([theme~="link"]) {
      background-color: transparent !important;
      color: var(--primary-50);
      border: none;
      box-shadow: none;
      font-weight: var(--typo-font-weights-normal);
      padding: 0;
    }

    :host([theme~="link"]::before),
    :host([theme~="link"]::after) {
      background-color: none !important;
      box-shadow: none !important;
    }

    :host([theme~="link"]:hover) {
      background-color: none !important;
      color: var(--primary-90);
      box-shadow: none !important;
    }

    :host([theme~="link"]:hover)::before {
      opacity: 0;
    }

    :host([theme~="link"]:active),
    :host([theme~="link"]:focus) {
      background-color: none !important;
      box-shadow: none;
      border: none;
      font-weight: var(--typo-font-weights-semibold);
    }

    :host([theme~="link"][disabled]) {
      color: var(--neutral-50);
      background-color: none;

      border: 0;
      box-shadow: none;
      font-weight: var(--typo-font-weights-semibold);

      pointer-events: none;
    }

    /* Primary theme */
    :host([theme~="primary"]) {
      background-color: var(--primary-50);
      color: var(--neutral-0);
      box-shadow: 0 1px 3px rgba(51, 55, 66, 0.06),
        0 2px 6px rgba(51, 55, 66, 0.02);
      border: 1px solid var(--primary-50);
    }

    :host([theme~="primary"]:hover) {
      background-color: var(--primary-80);
      box-shadow: 0 2px 4px rgba(51, 55, 66, 0.04),
        0 4px 8px rgba(51, 55, 66, 0.04), 0 4px 12px rgba(51, 55, 66, 0.02);
    }

    :host([theme~="primary"]:active) {
      background-color: var(--primary-80);
      box-shadow: none;
      border: 1px solid var(--primary-80);
    }

    :host([theme~="primary"]:focus) {
      background-color: var(--primary-80);
      box-shadow: none;
      border: 1px solid var(--primary-80);
    }

    :host([theme~="primary"][disabled]) {
      color: var(--comet-color-disabled-label);
      background-color: var(--neutral-20);

      border: 0;
      box-shadow: none;
      pointer-events: none;
    }

    /* Primary inverted theme */
    :host([theme~="primary-inverted"]) {
      background-color: var(--secondary-40);
      color: var(--primary-50);
      box-shadow: 0 1px 3px rgba(51, 55, 66, 0.06),
        0 2px 6px rgba(51, 55, 66, 0.02);
      border: 1px solid var(--secondary-40);
    }

    :host([theme~="primary-inverted"]:hover) {
      background-color: var(--secondary-50);
      box-shadow: 0 2px 4px rgba(51, 55, 66, 0.04),
        0 4px 8px rgba(51, 55, 66, 0.04), 0 4px 12px rgba(51, 55, 66, 0.02);
    }

    :host([theme~="primary-inverted"]:active) {
      background-color: var(--secondary-50);
      box-shadow: none;
      border: 1px solid var(--secondary-50);
    }

    :host([theme~="primary-inverted"]:focus) {
      background-color: var(--secondary-50);
      box-shadow: none;
      border: 1px solid var(--primary-50);
    }

    :host([theme~="primary-inverted"][disabled]) {
      color: var(--comet-color-disabled-label);
      background-color: var(--neutral-20);

      border: 0;
      box-shadow: none;
      pointer-events: none;
    }

    /* Subtle theme */
    :host([theme~="subtle"]) {
      background-color: transparent;
      color: var(--neutral-70);
      box-shadow: none;
      border: 0;
    }

    :host([theme~="subtle"]:hover) {
      background-color: transparent;
      color: var(--neutral-100);
    }

    :host([theme~="subtle"]:active) {
      background-color: transparent;
      border: 0;
    }

    :host([theme~="subtle"]:focus) {
      background-color: transparent;
      border: 0;
    }

    :host([theme~="subtle"][disabled]) {
      color: var(--neutral-50);
      background-color: transparent;

      border: 0;
      box-shadow: none;
      pointer-events: none;
    }

    /* Success theme */
    :host([theme~="success"]) {
      background-color: var(--success-50);
      color: var(--neutral-0);
      box-shadow: 0 1px 3px rgba(51, 55, 66, 0.06),
        0 2px 6px rgba(51, 55, 66, 0.02);
      border: 1px solid var(--success-50);
    }

    :host([theme~="success"]:hover) {
      background-color: var(--success-60);
      box-shadow: 0 2px 4px rgba(51, 55, 66, 0.04),
        0 4px 8px rgba(51, 55, 66, 0.04), 0 4px 12px rgba(51, 55, 66, 0.02);
    }

    :host([theme~="success"]:active) {
      background-color: var(--success-60);
      border: 1px solid var(--success-60);
      box-shadow: none;
    }

    :host([theme~="success"]:focus) {
      background-color: var(--success-60);
      border: 1px solid var(--success-60);
      box-shadow: none;
    }

    :host([theme~="success"][disabled]) {
      color: var(--comet-color-disabled-label);
      background-color: var(--neutral-20);

      border: 0;
      box-shadow: none;
      pointer-events: none;
    }

    /* Warning theme */
    :host([theme~="warning"]) {
      background-color: var(--warning-50);
      color: var(--neutral-0);
      box-shadow: 0 1px 3px rgba(51, 55, 66, 0.06),
        0 2px 6px rgba(51, 55, 66, 0.02);
      border: 1px solid var(--warning-50);
    }

    :host([theme~="warning"]:hover) {
      background-color: var(--warning-60);
      box-shadow: 0 2px 4px rgba(51, 55, 66, 0.04),
        0 4px 8px rgba(51, 55, 66, 0.04), 0 4px 12px rgba(51, 55, 66, 0.02);
    }

    :host([theme~="warning"]:active) {
      background-color: var(--warning-60);
      border: 1px solid var(--warning-60);
      box-shadow: none;
    }

    :host([theme~="warning"]:focus) {
      background-color: var(--warning-60);
      border: 1px solid var(--warning-60);
      box-shadow: none;
    }

    :host([theme~="warning"][disabled]) {
      color: var(--comet-color-disabled-label);
      background-color: var(--neutral-20);

      border: 0;
      box-shadow: none;
      pointer-events: none;
    }

    /* Danger theme */
    :host([theme~="danger"]) {
      background-color: var(--danger-50);
      color: var(--neutral-0);
      box-shadow: 0 1px 3px rgba(51, 55, 66, 0.06),
        0 2px 6px rgba(51, 55, 66, 0.02);
      border: 1px solid var(--danger-50);
    }

    :host([theme~="danger"]:hover) {
      background-color: var(--danger-60);
      box-shadow: 0 2px 4px rgba(51, 55, 66, 0.04),
        0 4px 8px rgba(51, 55, 66, 0.04), 0 4px 12px rgba(51, 55, 66, 0.02);
    }

    :host([theme~="danger"]:active) {
      background-color: var(--danger-60);
      border: 1px solid var(--danger-60);
      box-shadow: none;
    }

    :host([theme~="danger"]:focus) {
      background-color: var(--danger-60);
      border: 1px solid var(--danger-60);
      box-shadow: none;
    }

    :host([theme~="danger"][disabled]) {
      color: var(--comet-color-disabled-label);
      background-color: var(--neutral-20);

      border: 0;
      box-shadow: none;
      pointer-events: none;
    }

    /* Info theme */
    :host([theme~="info"]) {
      background-color: var(--info-50);
      color: var(--neutral-0);
      box-shadow: 0 1px 3px rgba(51, 55, 66, 0.06),
        0 2px 6px rgba(51, 55, 66, 0.02);
      border: 1px solid var(--info-50);
    }

    :host([theme~="info"]:hover) {
      background-color: var(--info-60);
      box-shadow: 0 2px 4px rgba(51, 55, 66, 0.04),
        0 4px 8px rgba(51, 55, 66, 0.04), 0 4px 12px rgba(51, 55, 66, 0.02);
    }

    :host([theme~="info"]:active) {
      background-color: var(--info-60);
      border: 1px solid var(--info-60);
      box-shadow: none;
    }

    :host([theme~="info"]:focus) {
      background-color: var(--info-60);
      border: 1px solid var(--info-60);
      box-shadow: none;
    }

    :host([theme~="info"][disabled]) {
      color: var(--comet-color-disabled-label);
      background-color: var(--neutral-20);

      border: 0;
      box-shadow: none;
      pointer-events: none;
    }
  `
);
