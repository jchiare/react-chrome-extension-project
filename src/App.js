/*global chrome*/
import React, { Component } from 'react';
import './App.css';

function Tabs(props){

  const handleChange = (event) => {

    // maybe if checked true, then add, if false remove,
    console.log(event.target);
    console.log(event.target.checked);
    console.log(event.target.dataset.tab_id);
    props.oncheck(event.target);
  };

  const ListTabs = props.window.map((tab) => 
    <li className="tabs" key={tab.id}>
      <label>
        <input 
          type="checkbox" 
          onChange={handleChange}
          data-tab_id={tab.id}
        />
        {tab.title}
      </label>
    </li>
  );
  return (
    <div>
      {ListTabs}
    </div>
  );
}

function Window(props){
  const ListWindows = props.chrome.map((window) => 
    <ul className="tabs-list">
      <h3>Chrome Window</h3>
      <Tabs 
        window={window}
        oncheck={props.oncheck}
      />
    </ul>
  );
  return (
    <div>
      {ListWindows}
    </div>
  );
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      chrome: []
    };
    this.addTabs = this.addTabs.bind(this);
  }
  
  handleSubmit(event){
    event.preventDefault();
    alert('hiy');
  }

  addTabs(tabs){
    this.setState({chrome:this.state.chrome.concat(tabs)});
  };

  handleCheckChange(event){
    console.log('changed + ' + event);
  }

  componentDidMount(){
    chrome.tabs.query({},(function(tabs){
      let last_window_id = tabs[0].windowId;
      const all_tabs = [];
      let new_set_tabs = [];

      // sort through all tabs
      // add tab to the array if it's windowid property matches other tabs within the array 
      // if windowid does not match, then create a new array
      tabs.forEach((tab) => {
        if(tab.windowId!= last_window_id){
          last_window_id = tab.windowId;
          all_tabs.push(new_set_tabs);
          new_set_tabs = [];
        } 
        new_set_tabs.push(tab);
      });
      all_tabs.push(new_set_tabs);
      this.addTabs(all_tabs);
    }).bind(this));

    /*chrome.storage.sync.set({john:'doe'}, function() {
    });
    chrome.storage.sync.get('john', function(result) {
      console.log('Value currently is ' + JSON.stringify(result));
      console.log(result['john']);
    });*/
  }

  render() {
    return (
      <div className="app">
          <Window 
            chrome={this.state.chrome}
            oncheck={this.handleCheckChange}
          />
          <form onSubmit={this.handleSubmit} className="save-button">
            <input type="submit" id="save-tabs"/>
          </form>
      </div>
    );
  }
}

export default App;