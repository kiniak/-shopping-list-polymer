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
import {} from '@polymer/polymer/lib/elements/dom-repeat.js';     
import '@polymer/polymer/lib/elements/dom-if.js';


class MyView1 extends PolymerElement {
  static get properties() {
    return {
      products: {
        type: Array,
        value() {
          return [];
        }
      },
      
    };
  }

  
  add(){
    if(this.products.find(item => item.product.toUpperCase()===this.product.toUpperCase())){
      this.message= this.product + " jest już na liście zakupów";
      this.product="";}
      else if(!this.product){
        return
      }else{
        this.push('products', {product: this.product, admin: true});
        this.message = '';
        this.product = '';
      }
 
  
  };


  remove(e) {
    this.splice('products', e.model.index, 1);
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
        form{
          display: flex;
          align-items: center;
        }
        .myLists{
          display: flex;
        }

      </style>

  
          
        <div class="card">
            <div class="circle">1</div>
            <h1>lista zakupów</h1>
            
              <template is="dom-repeat" items="{{products}}" is="dom-if" if="{{products.length}}">
                <div class="myLists" >
                <p>[[item.product]]</p><paper-button class="delete" on-click="remove">usuń</paper-button>
                </div>
              </template>
              <p class="dubleProduct">{{message}}</p>

            <template is="dom-if" if="{{!products.length}}">
              <p>
                brak zakupów na liście
              </p>
            </template>
            
            <form>
              <paper-input no-label-float label="wpisz produkt" value="{{product}}"></paper-input>
              <paper-button class="add" on-click="add">dodaj</paper-button>
            </form>
          </div>


        
     
     
    `;  
    }
  
   



}

window.customElements.define('my-view1', MyView1);
