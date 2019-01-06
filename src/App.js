import React, { Component } from 'react';
import './App.css';
import Router, { Link, goBack } from 'route-lite';
import ExistingTabs from './components/current-tabs/getExistingTabs.js';
import Test from './components/view-projects/viewProjects.js';

const Route = () => {
  return (
    <>
      <Link
        component={Test}
      >
      Head to view your project
      </Link>
      <ExistingTabs />
    </>
  );
}

class App extends Component {
  render(){
    return <Router><Route/></Router>
  }
}

export default App;