import React, { Component } from 'react';
import './App.css';
import ExistingTabs from './components/current-tabs/getExistingTabs.js';

class App extends Component {
  render(){
    return <ExistingTabs/>
  }
}

export default App;