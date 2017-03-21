import React, { Component } from 'react'
import _ from 'lodash' 
import {Dropdown, Input, Form} from 'semantic-ui-react'
import {prefixLink} from 'gatsby-helpers'
import NumberPicker from 'semantic-ui-react-numberpicker';

export var ShopItem = React.createClass({
  onChange: function(e, data) {
    this.setState({amount: data.value})
    this.props.onChange( { name:this.props.item.name,  text:this.props.item.text, amount:data.value, price:this.props.item.price} )
  },
  updateNumberPicker: function (e) {
    /*
     * The value is expected as string to avoid warnings 
     * append an empty string to your possibly numberic value
    */
    this.setState({amount: e.value + ''})
    this.props.onChange( { name:this.props.item.name,  text:this.props.item.text, amount:e.value, price:this.props.item.price} )
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

        <Form.Field inline>
          <label> {this.props.item.text} </label>
            <NumberPicker  name={this.props.item.name} value={amount} onChange={this.updateNumberPicker} min={0}
                max={10} compact />
            x  {this.props.item.price} EURO
        </Form.Field> 

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
        <div className="ui container">

              {/* InstanceBeginEditable name="Inhoud" */}
              <p>U kan hier  uw bestelling  doorgeven. We contacteren u vervolgens per email voor de leverings- en betalingsmodaliteiten.</p>             <p>Voor meer informatie:  <a href="mailto:info@menstis.be">info@menstis.be</a></p>
              <Form  name="formulier" id="formulier" action="http://www.all2all.org/cgi-bin/FormMail.pl" method="POST" onSubmit={this.onSubmit()} >
                      <Form.Field inline>
                        <label>Naam</label>
                        <input type="text" name="realname" size='40' />
                      </Form.Field>
                      <Form.Field inline>
                        <label>Adres Regel 1</label>
                        <input type="text" name="straat" size="60" />
                      </Form.Field>
                      <Form.Field inline>
                        <label>Adres Regel 2</label>
                        <input type="text" name="gemeente" size="40" />
                      </Form.Field>
                      <Form.Field inline>
                           <label>Email</label>
                            <input type="text" name="email" size="60" />
                      </Form.Field>
                      {children}
                      <Form.Field inline>
                        <label>Opmerkingen</label>
                          <textarea name="deelnemers" cols={40} rows={5} defaultValue={""} />
                      </Form.Field>

                          Totale Kostprijs: <span>{total} </span> euro (levering niet inbegrepen)
                        <div>
                        <input type="submit" defaultValue="Verzend" /> {' '}<input type="reset" defaultValue="Annuleer" /> 
                        
                        </div>
                    
                <input type="hidden" name="recipient" defaultValue="sylvain@menstis.be" />
                <input type="hidden" name="subject" defaultValue="Online bestelling" />
                <input type="hidden" name="redirect" defaultValue={'http://www.menstis.be/shop/bestellingsbevestiging/'} />
                <input type="hidden" name="print_blank_fields" defaultValue={1} />
              </Form>
            </div>
    );
  }
});

