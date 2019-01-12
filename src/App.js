import React, { Component } from 'react';
import './App.css';
import Router, { Link } from 'route-lite';
import ExistingTabs from './components/current-tabs/getExistingTabs.js';
import ViewProjects from './components/view-projects/viewProjects.js';

const Route = () => {
  return (
    <>
      <Link component={ViewProjects}>
        <button>Head to view your project</button>
      </Link>

      <ExistingTabs />
    </>
  );
}

class App extends Component {
  render(){
    return (
      <Router>
        <Route/>
      </Router>
    );
  }
}

export default App;