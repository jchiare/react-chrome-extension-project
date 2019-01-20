import React, { Component } from 'react';
import Window from './addTabsToProject.js';
import '../.././App.css';
import { getCurrentTabs, getOutgoingTabIDs, addProjectToData, removeTabs } from '../.././helper.js';

class ExistingTabs extends Component {
    constructor(props){
      super(props);
      this.state = {
        chrome: []
      };
      this.checked_tabs = [];
      this.project_name = React.createRef();
    }

    handleSubmit = (event) => {
      const save_project_name = this.project_name.current.value || 'No Name';
      addProjectToData('tabs_project',save_project_name,this.checked_tabs);

      const outgoing_tab_ids = getOutgoingTabIDs(this.checked_tabs);
      removeTabs(outgoing_tab_ids);

      this.setState({chrome:this.state.chrome.map(window => {
        window.filter(tab => !outgoing_tab_ids.includes(tab.id))
      })},event.preventDefault);

    };
    
    addTabs = (tabs) => {
      this.setState({chrome:this.state.chrome.concat(tabs)});
    };
  
    handleCheckChange= (tab) => {
      if(tab.isChecked){
        this.checked_tabs = this.checked_tabs.concat({
            id:tab.id,
            url:tab.url,
            title:tab.title
        })
      } else {
        this.checked_tabs = this.checked_tabs.filter(e => e.id !== tab.id);
      }
    }
  
    componentDidMount(){
        getCurrentTabs.call(this);
    }
  
    render() {
      return (
        <div className="app">
            <label>
              <strong>Project name:</strong>
              <input type="text" ref={this.project_name}/>
            </label>
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

export default ExistingTabs;