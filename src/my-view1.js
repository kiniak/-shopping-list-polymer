/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
import 'fontawesome-icon'
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js'
import '@polymer/paper-input/paper-input.js'
import '@polymer/paper-checkbox/paper-checkbox.js'
import '@polymer/paper-button/paper-button.js'
import './shared-styles.js'
import '@polymer/polymer/lib/elements/dom-repeat.js'
import '@polymer/polymer/lib/elements/dom-if.js'

class MyView1 extends PolymerElement {
  static get properties () {
    return {
      products: {
        type: Array,
        value () {
          return []
        }
      }
    }
  }

  add () {
    if (this.products.find(item => item.product.toUpperCase() === this.product.toUpperCase())) {
      this.message = this.product.toLowerCase() + ' jest już na liście zakupów'
      this.product = ''
    } else if (!this.product) {

    } else {
      this.push('products', { product: this.product.toLowerCase(), editable: false })
      this.message = ''
      this.product = ''
    }
  };

  remove (e) {
    e.model.item = {
      ...e.model.item,
      editable: true
    }
  }

  edit (e) {
    e.model.item = {
      ...e.model.item,
      editable: true,
      current: e.model.item.product
    }
  }

  confirm (e) {
    e.model.item = {
      ...e.model.item,
      editable: false
    }
  }

  cancel (e) {
    e.model.item = {
      product: e.model.item.current,
      editable: false
    }
  }

  serchWeather () {
    if (!this.localization) { this.localization = 'Szczecin' }
    let localization = this.localization
    this.errorMEsage = ''
    let path = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20u%3D'c'%20and%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURI(localization)}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`

    fetch(path).then(response => {
      return response.json()
    }).then(data => {
      if (!data.query.results) {
        this.errorMEsage = 'nie znaleziono miasta ' + this.localization
      }
      /* global fetch:false */

      this.temperature = 1 * data.query.results.channel.item.condition.temp
      this.temperatureLow = data.query.results.channel.item.forecast[0].low
      this.temperatureHigh = data.query.results.channel.item.forecast[0].high
      this.wind = 1 * data.query.results.channel.wind.speed
      this.code = 1 * data.query.results.channel.item.condition.code
      this.text = data.query.results.channel.item.condition.text
      this.WidgetLocalization = this.localization.toUpperCase()

      if ((this.code >= 0 && this.code <= 7) || (this.code >= 37 && this.code <= 39)) {
        this.weatherMessage = 'Bardzo złe warunki pogodowe, lepiej pozostać w domu!'
      } else if (this.code >= 8 && this.code <= 10) {
        this.weatherMessage = 'Pogoda nie zachęca do zakupów'
      } else if ((this.code >= 11 && this.code <= 18) || (this.code === 45 || this.code === 46 || this.code === 35 || this.code === 40)) {
        this.weatherMessage = 'Mogą wystąpić różnego rodzaju opady'
      } else if (this.temperature > 15 && this.wind < 19) {
        this.weatherMessage = 'Dobra pogoda zarówno na zakupy, jak i na spacer.'
      } else if (this.wind > 40) {
        this.weatherMessage = 'Uwaga na silny wiatr.'
      } else if (this.temperature < 0) {
        this.weatherMessage = 'Możliwe przymrozki'
      } else { this.weatherMessage = 'Można ruszać na zakupy, pamiętajmy o odpowiednim stroju.' }
    })
  }

  delete (e) {
    this.splice('products', e.model.index, 1)
  }

  ready () {
    super.ready()
    this.serchWeather()
  }

  static get template () {
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
        .weatherWidget{
          display: inline-block;
          padding: 1rem;
          box-shadow: 1px 1px 9px rgba(0, 0, 0, 0.1);
          background-color: #f7f7f7;
        }
        .weatherWidget div{
          display: inline-block;
        }
        .temperatureAverage{
          font-size: 3rem;
        }
        .temperatureAverage p{
          margin: 0;
        }
        .temperatureLow, .temperatureHigh{
          margin: 0 0 0 0.5rem;;
          font-size: 0.9rem;
        }
        .weatherText{
          margin: 0;
          font-size: 0.9rem;
        }
        .weatherWidget>p{
          margin: 0;
        }
        .weatherShopping{
          display: inline-block;
          margin-right: 10rem;
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
          <div class="weatherShopping">
            <p>sprawdz czy pogoda w Twoim mieście jest odpowiednia na zakupy</p>
            <form>
              <paper-input no-label-float label="Podaj lokalizacje" value="{{localization}}"></paper-input>
              <paper-button class="add" on-click="serchWeather">ok</paper-button>
            </form>
            <p>{{errorMEsage}}</p>
            <p>{{weatherMessage}}</p>
          </div>
          <div class="weatherWidget">
            <p>{{WidgetLocalization}}, Temperatura</p>
            <div class="temperatureAverage">
              <p>{{temperature}}℃</p>
            </div>
            <div>  
              <p class="temperatureHigh">H:{{temperatureHigh}}℃</p>
              <p class="temperatureLow">L:{{temperatureLow}}℃</p>
            </div>
              <p class="weatherText">{{text}}<p>
            </div>
        </div> 

     <!--https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Szczecin%2C%20PL%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys-->
    `
  }
}

window.customElements.define('my-view1', MyView1)
