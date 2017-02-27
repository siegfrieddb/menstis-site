import React, { Component } from 'react'
import _ from 'lodash' 
import {Dropdown} from 'semantic-ui-react'

export var ShopItem = React.createClass({
  onChange: function(e, data) {
    this.setState({amount: data.value})
    this.props.onChange( { name:this.props.item.name,  text:this.props.item.text, amount:data.value, price:this.props.item.price} )
  },
  render: function() {
    var amount = 0
    if (this.state != null)
        amount = this.state.amount
    var list = [];
    for (var i = 0; i <= 10; i++) {
        list.push({ value:i, text:i });
    }
    return(
        <tr>
            <td></td>
            <td colSpan={2}>
        <div>
           
            {this.props.item.text} : Aantal                    
             <Dropdown inline defaultValue={amount}     
                      options={list}  onChange={this.onChange} />            x  {this.props.item.price} EURO
          
        </div>
        </td>
        </tr>
    )
  }
});


export var Shop = React.createClass({
    getInitialState () {
        return {
            items: null
        };
  },
  onChange: function(e) {
    var items = this.state.items 
    if (items == null){
        items = this.props.items
    }

    var newItems = {}
    _.forEach(items, (value, key) => {
        if (e.name == key)
            newItems[e.name] = e
        else
            newItems[key] = value
        
    });
    this.setState({items: newItems})
  }, 
  updateTotal: function(){

  },
  onSubmit: function(){
      
  },
  render: function() {
    var total = 0
    var items = this.state.items 
    if (items == null)
        items = this.props.items

    var children = []
    _.forEach(items, (value, key) => {
      total += value.price * value.amount;
      children.push((<ShopItem item={value} onChange={ (e) => this.onChange(e) } />))
    });
    

    return (
    
      <table border={0} cellPadding={4} cellSpacing={0} width="90%">
        <tbody><tr>
            <td valign="top" bgcolor="#FCF9FF">
              {/* InstanceBeginEditable name="Inhoud" */}
              <p>U kan hier  uw bestelling  doorgeven. We contacteren u vervolgens per email voor de leverings- en betalingsmodaliteiten.</p>             <p>Voor meer informatie:  <a href="mailto:info@menstis.be">info@menstis.be</a></p>
              <form name="formulier" id="formulier" action="http://www.all2all.org/cgi-bin/FormMail.pl" method="POST" onSubmit={this.onSubmit()} >
                <table border={0}>
                  <tbody><tr>
                      <td width={122} align="right"><font color="#7F7D82">Naam:</font></td>
                      <td colSpan={2}><input type="text" name="realname" size={40} /></td>
                    </tr>
                    <tr>
                      <td align="right" valign="top"><font color="#7F7D82">Adres:</font></td>
                      <td colSpan={2}><input type="text" name="straat" size={60} />
                        <br />
                        <input type="text" name="gemeente" size={40} /></td>
                    </tr>
                    <tr>
                      <td align="right"><font color="#7F7D82">Email:</font></td>
                      <td colSpan={2}><input type="text" name="email" size={60} /></td>
                    </tr>
                        {children}
                      

                    <tr>
                      <td align="right" valign="top"><font color="#7F7D82">Opmerkingen:</font></td>
                      <td colSpan={2}><textarea name="deelnemers" cols={40} rows={5} defaultValue={""} /></td>
                    </tr>
                    <tr>
                      <td align="right"><font color="#7F7D82">Totale Kostprijs:</font></td>
                      <td colSpan={2}><span>{total} </span>
                        euro (levering niet inbegrepen)</td>
                    </tr>
                    <tr>
                      <td colSpan={3}><input type="reset" defaultValue="Annuleer" />
                        <input type="submit" defaultValue="Verzend" /></td>
                    </tr>
                  </tbody></table>
                <input type="hidden" name="recipient" defaultValue="sylvain@menstis.be" />
                <input type="hidden" name="subject" defaultValue="Online bestelling" />
                <input type="hidden" name="redirect" defaultValue="http://www.menstis.be/uitgeverij/bestellingbevestiging.html" />
                <input type="hidden" name="print_blank_fields" defaultValue={1} />
              </form>
              {/* InstanceEndEditable */}
            </td>
          </tr>
        </tbody></table>
    );
  }
});

