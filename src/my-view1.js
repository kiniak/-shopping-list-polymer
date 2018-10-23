/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-button/paper-button.js';
import './shared-styles.js';

class MyView1 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        form{
          display: flex;
        }
      </style>

      <div class="card">
        <div class="circle">1</div>
        <h1>lista zakupów</h1>
        <form>
        <paper-checkbox></paper-checkbox>
        <paper-input always-float-label label="dodaj produkt"></paper-input>
        <paper-button class="add">dodaj</paper-button>
        </form>
      </div>
    `;
  }
}

window.customElements.define('my-view1', MyView1);
