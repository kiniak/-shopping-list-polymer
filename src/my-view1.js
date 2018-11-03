/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
import 'fontawesome-icon';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-button/paper-button.js';
import './shared-styles.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';     
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
      temperature: {
        type: String,
        value(){
          return ""
        }
      }
      
    };
    

  }

  
  add(){
    if(this.products.find(item => item.product.toUpperCase()===this.product.toUpperCase())){
      this.message= this.product.toLowerCase() + " jest już na liście zakupów";
      this.product="";}
      else if(!this.product){
        return
      }else{
        this.push('products', {product: this.product.toLowerCase(), editable: false});
        this.message = '';
        this.product = '';
      
      }
 
  
  };
  

  remove(e){
    
    e.model.item = {
      ...e.model.item,
      editable: true
    }
   
  }


  edit(e) {
    e.model.item = {
      ...e.model.item,
      editable: true,
      current: e.model.item.product
    }
  }

  confirm(e) {
    e.model.item = {
      ...e.model.item,
      editable: false
    }
  }

  cancel(e) {
    e.model.item = {
      product: e.model.item.current,
      editable: false
    }
  }

  serchWeather() {
    let path = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20u%3D'c'%20and%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURI(this.localization)}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
    fetch(path).then(response => {
      return response.json();
    }).then(data =>{ console.log(data);
      this.temperature = data.query.results.channel.item.forecast[0].low
    
    });
  } 

  delete(e) {
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
          padding-top: 8px;
        }
        .editProduct{
          display: flex;
        }
        .myLists p{
          font-size: 16px;
          font-weight: bold;
        }
        .product{
          min-width: 182px;
          paddint-top: 10px;
          border-bottom: 1px solid white;
        }

      </style>

  
          
        <div class="card">
            <div class="circle">1</div>
            <h1>lista zakupów</h1>
            
              <template is="dom-repeat" items="{{products}}">
                <template  is="dom-if" if="{{!item.editable}}">
                  <div class="myLists">
                    <p class="product">[[item.product]]</p><paper-button on-click="edit"><fontawesome-icon prefix="fas" name="edit" fixed-width></fontawesome-icon></paper-button><paper-button class="delete" on-click="delete"><fontawesome-icon prefix="fas" name="trash-alt" fixed-width></fontawesome-icon></paper-button>
                  </div>
                </template>
                <template is="dom-if" if="{{item.editable}}">
                  <div class="editProduct">
                    <p><paper-input no-label-float label="wpisz produkt" value="{{item.product}}"></paper-input></p>
                    <paper-button on-click="confirm"><fontawesome-icon prefix="fas" name="check-circle" fixed-width></fontawesome-icon></paper-button>
                    <paper-button on-click="cancel"><fontawesome-icon prefix="fas" name="times-circle" fixed-width></fontawesome-icon></paper-button>
                  </div>
                </template>
              </template>
              <p class="doubleProduct">{{message}}</p>

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
          <div class="card">
                  <p>sprawdz pogodę w swoim mieście</p>
              <form>
          
                <paper-input no-label-float label="Podaj lokalizacje" value="{{localization}}"></paper-input>
                <paper-button class="add" on-click="serchWeather">dodaj</paper-button>
              </form>
            <template is="dom-if" if="{{temperature}}">
              <p>
                {{temperature}}
              </p>
            </template>
          </div> 
     <!--https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Szczecin%2C%20PL%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys-->
    `;  
    }
  
   



}

window.customElements.define('my-view1', MyView1);
