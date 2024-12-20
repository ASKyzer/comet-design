/**
 @license
 Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
import "@polymer/iron-flex-layout/iron-flex-layout.js";
import "@polymer/paper-styles/color.js";
import "@polymer/paper-styles/default-theme.js";
import "@polymer/polymer/polymer-legacy.js";

import { PaperCheckedElementBehavior } from "@polymer/paper-behaviors/paper-checked-element-behavior.js";
import { PaperRippleBehavior } from "@polymer/paper-behaviors/paper-ripple-behavior.js";
import { Polymer } from "@polymer/polymer/lib/legacy/polymer-fn.js";
import { setTouchAction } from "@polymer/polymer/lib/utils/gestures.js";
import { html } from "@polymer/polymer/lib/utils/html-tag.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";

/**
  Material design: [Switch](https://www.google.com/design/spec/components/selection-controls.html#selection-controls-switch)
 
  `paper-toggle-button` provides a ON/OFF switch that user can toggle the state
  by tapping or by dragging the switch.
 
  Example:
 
  <paper-toggle-button></paper-toggle-button>
 
  ### Styling
 
  The following custom properties and mixins are available for styling:
 
  Custom property | Description | Default
  ----------------|-------------|----------
  `--paper-toggle-button-unchecked-bar-color` | Slider color when the input is not checked | `#000000`
  `--paper-toggle-button-unchecked-button-color` | Button color when the input is not checked | `--paper-grey-50`
  `--paper-toggle-button-unchecked-ink-color` | Selected/focus ripple color when the input is not checked | `--dark-primary-color`
  `--paper-toggle-button-checked-bar-color` | Slider button color when the input is checked | `--primary-color`
  `--paper-toggle-button-checked-button-color` | Button color when the input is checked | `--primary-color`
  `--paper-toggle-button-checked-ink-color` | Selected/focus ripple color when the input is checked | `--primary-color`
  `--paper-toggle-button-invalid-bar-color` | Slider button color when the input is invalid | `--error-color`
  `--paper-toggle-button-invalid-button-color` | Button color when the input is invalid | `--error-color`
  `--paper-toggle-button-invalid-ink-color` | Selected/focus ripple color when the input is invalid | `--error-color`
  `--paper-toggle-button-unchecked-bar` | Mixin applied to the slider when the input is not checked | `{}`
  `--paper-toggle-button-unchecked-button` | Mixin applied to the slider button when the input is not checked | `{}`
  `--paper-toggle-button-unchecked-ink` | Mixin applied to the ripple when the input is not checked | `{}`
  `--paper-toggle-button-checked-bar` | Mixin applied to the slider when the input is checked | `{}`
  `--paper-toggle-button-checked-button` | Mixin applied to the slider button when the input is checked | `{}`
  `--paper-toggle-button-checked-ink` | Mixin applied to the ripple when the input is checked | `{}`
  `--paper-toggle-button-label-color` | Label color | `--primary-text-color`
  `--paper-toggle-button-label-spacing` | Spacing between the label and the button | `8px`
 
  This element applies the mixin `--paper-font-common-base` but does not import `paper-styles/typography.html`.
  In order to apply the `Roboto` font to this element, make sure you've imported `paper-styles/typography.html`.
 
  @element paper-toggle-button
  @demo demo/index.html
  */
Polymer({
  is: "comet-toggle",
  /** @override */
  _template: html`
    <style>
      :host {
        display: inline-block;
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --paper-font-common-base;
      }

      :host([disabled]) {
        pointer-events: none;
      }

      :host(:focus) {
        outline: none;
      }

      .toggle-bar {
        position: absolute;
        height: 24px;
        width: 40px;
        top: -6px;
        left: -3px;
        border-radius: 16px;
        pointer-events: none;
        opacity: 1;
        transition: background-color linear 0.08s;
        background-color: var(--neutral-30);
        border: 1px solid var(--neutral-40);

        @apply --paper-toggle-button-unchecked-bar;
      }

      .toggle-button {
        position: absolute;
        top: -3px;
        left: 1px;
        right: auto;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.6);
        transition: -webkit-transform linear 0.08s,
          background-color linear 0.08s;
        transition: transform linear 0.08s, background-color linear 0.08s;
        will-change: transform;
        background-color: var(--neutral-0);
        cursor: pointer;

        @apply --paper-toggle-button-unchecked-button;
      }

      :host(:dir(rtl)) .toggle-button,
       /* Shady DOM workaround */
       :host([dir="rtl"]) .toggle-button {
        right: 0;
        left: auto;
      }

      .toggle-button.dragging {
        -webkit-transition: none;
        transition: none;
      }

      :host([checked]:not([disabled])) .toggle-bar {
        opacity: 1;
        background-color: var(--primary-50);
        border: 1px solid var(--primary-60);

        @apply --paper-toggle-button-checked-bar;
      }

      :host([checked]) .toggle-button {
        -webkit-transform: translate(14px, 0);
        transform: translate(14px, 0);
      }

      :host(:dir(rtl)):host([checked]) .toggle-button,
       /* Shady DOM workaround */
       :host([dir="rtl"][checked]) .toggle-button {
        -webkit-transform: translate(-16px, 0);
        transform: translate(-16px, 0);
      }

      :host([disabled]) .toggle-bar {
        background-color: var(--primary-20);
        border: 1px solid var(--primary-20);
      }

      :host([disabled]) .toggle-button {
        background-color: var(--neutral-0);
        border: 1px solid var(--neutral-40);
        box-shadow: none;
        opacity: 1;
        -webkit-transform: translate(13px, -1px);
        transform: translate(13px, -1px);
      }

      :host([disabled]:not([checked])) .toggle-bar {
        background-color: var(--neutral-0);
        border: 1px solid var(--neutral-40);
      }

      :host([disabled]:not([checked])) .toggle-button {
        background-color: var(--neutral-30);
        border: none;
        -webkit-transform: translate(-1px, 0);
        transform: translate(-1px, 0);
      }

      .toggle-ink {
        position: absolute;
        top: -14px;
        left: -14px;
        right: auto;
        bottom: auto;
        width: 48px;
        height: 48px;
        opacity: 1;
        pointer-events: none;
        color: var(--primary-50);

        @apply --paper-toggle-button-unchecked-ink;
      }

      :host([checked]) .toggle-ink {
        color: var(--primary-50);

        @apply --paper-toggle-button-checked-ink;
      }

      .toggle-container {
        display: inline-block;
        position: relative;
        width: 36px;
        height: 14px;
        /* The toggle button has an absolute position of -3px; The extra 1px
         /* accounts for the toggle button shadow box. */
        margin: 4px 1px;
      }

      .toggle-label {
        position: relative;
        display: inline-block;
        vertical-align: middle;
        padding-left: var(--paper-toggle-button-label-spacing, 30px);
        pointer-events: none;
        color: var(
          --paper-toggle-button-label-color,
          var(--primary-text-color)
        );
      }

      /* invalid state */
      :host([invalid]) .toggle-bar {
        background-color: var(--danger-50);
        border: 1px solid var(--danger-60);
      }

      :host([invalid]:not([checked])) .toggle-button {
        background-color: var(--danger-10);
      }

      :host([invalid]) .toggle-ink {
        color: var(--paper-toggle-button-invalid-ink-color, var(--error-color));
      }
    </style>

    <div part="comet-toggle-container" class="toggle-container">
      <div
        id="toggleBar"
        part="comet-toggle-toggle-bar"
        class="toggle-bar"
      ></div>
      <div
        id="toggleButton"
        part="comet-toggle-button"
        class="toggle-button"
      ></div>
    </div>

    <div part="comet-toggle-label" class="toggle-label"><slot></slot></div>
  `,

  behaviors: [PaperCheckedElementBehavior],

  /** @private */
  hostAttributes: { role: "button", "aria-pressed": "false", tabindex: 0 },

  properties: {
    /**
     * Fired when the checked state changes due to user interaction.
     *
     * @event change
     */
    /**
     * Fired when the checked state changes.
     *
     * @event iron-change
     */
  },

  listeners: { track: "_ontrack" },

  __calculateIsRtl: function () {
    const compStyle = window.getComputedStyle(this);
    const dir = compStyle.direction;
    return dir === "rtl";
  },

  /** @override */
  attached: function () {
    var isRtl = this.__calculateIsRtl();
    if (isRtl) {
      this.setAttribute("dir", "rtl");
    }

    afterNextRender(this, function () {
      setTouchAction(this, "pan-y");
    });
  },

  _ontrack: function (event) {
    var track = event.detail;
    if (track.state === "start") {
      this._trackStart(track);
    } else if (track.state === "track") {
      this._trackMove(track);
    } else if (track.state === "end") {
      this._trackEnd(track);
    }
  },

  _trackStart: function (track) {
    this._isRtl = this.__calculateIsRtl();
    this._width = this.$.toggleBar.offsetWidth / 2;
    /*
     * keep an track-only check state to keep the dragging behavior smooth
     * while toggling activations
     */
    this._trackChecked = this.checked;
    this.$.toggleButton.classList.add("dragging");
  },

  _trackMove: function (track) {
    var dx = track.dx;

    if (this._isRtl) {
      this._x = Math.max(
        -this._width,
        Math.min(0, this._trackChecked ? -this._width + dx : dx)
      );
    } else {
      this._x = Math.min(
        this._width,
        Math.max(0, this._trackChecked ? this._width + dx : dx)
      );
    }

    this.translate3d(this._x + "px", 0, 0, this.$.toggleButton);

    if (this._isRtl) {
      this._userActivate(this._x < -this._width / 2);
    } else {
      this._userActivate(this._x > this._width / 2);
    }
  },

  _trackEnd: function (track) {
    this.$.toggleButton.classList.remove("dragging");
    this.transform("", this.$.toggleButton);
  },

  // customize the element's ripple
  _createRipple: function () {
    this._rippleContainer = this.$.toggleButton;
    var ripple = PaperRippleBehavior._createRipple();
    ripple.id = "ink";
    ripple.setAttribute("recenters", "");
    ripple.classList.add("circle", "toggle-ink");
    return ripple;
  },

  /** @override */
  registered() {
    this._template.setAttribute("strip-whitespace", "");
  },
});
