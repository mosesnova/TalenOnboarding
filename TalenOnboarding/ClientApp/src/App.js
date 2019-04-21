import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { FetchCustomer } from './components/Talent/FetchCustomer'
import { AddCustomer } from './components/Talent/AddCustomer'
import { FetchStore } from './components/Talent/FetchStore'
import { AddStore } from './components/Talent/AddStore'
import { FetchProduct } from './components/Talent/FetchProduct'
import { AddProduct } from './components/Talent/AddProduct'
import { FetchSales } from './components/Talent/FetchSales'
import { AddSales } from './components/Talent/AddSales'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/FetchCustomer' component={FetchCustomer} />
        <Route path='/AddCustomer' component={AddCustomer} />
        <Route path='/FetchStore' component={FetchStore} />
        <Route path='/AddStore' component={AddStore} />
        <Route path='/FetchProduct' component={FetchProduct} />
        <Route path='/AddProduct' component={AddProduct} />
        <Route path='/FetchSales' component={FetchSales} />
        <Route path='/AddSales' component={AddSales} />


      </Layout>
    );
  }
}
