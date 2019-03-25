import React from 'react'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import {browserHistory} from 'react-router';
import access from 'safe-access'
import include from 'underscore.string/include'
import startsWith from 'lodash/startsWith'
import typography from 'utils/typography'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Header from 'components/Header'
import { Grid, Image } from 'semantic-ui-react'
import { Shop } from 'components/shop'
import '../../css/main.css'
//import {IndexImage} from 'components/IndexImage'
import {TestImage} from 'components/IndImage'
const { rhythm } = typography

const ShopPage = React.createClass({
  statics: {
    metadata () {
      return {
        title: 'Shop',
      }
    },
  },



  render () {
      return (<Shop
            items={{
                paradijs: { name:"paradijs", text:'Het aards paradijs als zinnebeeld', price: 10, amount: 0},
                beeld2010: { name:"beeld2010", text:'Leren leven met beelden: 2001 -2002 -2003 -2005 - 2007 - 2008 - 2009 - 2010', price: 2, amount: 0},
                methode: { name:"methode", text:'Methode Boek & CD', price: 10, amount: 0},
                levensbeschouwing: { name:"levensbeschouwing", text:'Levensbeschouwing democratish belicht', price: 25, amount: 0},
                meerstemmigkerkgebouw: { name:"meerstemmigkerkgebouw", text:'Meerstemmig Kerkgebouw', price: 20, amount: 0},
                aandetafel: {  name:"aandetafel",  text: "Aan de tafel van het verborgen atelier", price: 250, amount: 0},
                beloofdeland: {  name:"beloofdeland",   text:"Het Beloofde Land", price: 15, amount: 0},
                gedachtenis: {  name:"gedachtenis",  text: "Gedachtenis", price: 10, amount: 0}
            }}
        />)
  }
});

export default ShopPage
