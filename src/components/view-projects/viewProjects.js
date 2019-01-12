/*global chrome*/
import React, { Component } from 'react';
import '../.././App.css';
import { goBack } from 'route-lite';

function AddTabsStyle(props){
    let ListProjectTabs;
    if (props.tabs){
        ListProjectTabs = props.tabs.map(tab => 
            <li className="tabs" key={tab.id}>
                <a href={tab.url} target="_blank">{tab.title}</a>
            </li>
        );  
    }
    
    return (
        <div>
            {ListProjectTabs || "No tabs in database"}
        </div>
    );
}

function SavedTabs(props){
    const ListSavedTabs = 
        <ul className="tabs-list">
            <h3>Project</h3>
            <AddTabsStyle tabs={props.savedtabs}/>
        </ul>;

    return (
        <div>
            {ListSavedTabs}
        </div>
    );
}

class ViewProjects extends Component{
    constructor(props){
        super(props);
        this.state = {
            project:[]
        }
    }

    componentDidMount(){
        chrome.storage.sync.get(['test'],(function(result){
            this.setState({project:result['test']});
        }).bind(this));
    }
    render(){
        return (
            <div className="app">
                <button onClick={() => goBack()}> Select more tabs</button>
                <SavedTabs savedtabs={this.state.project}/>
            </div>
        );
    }
}

export default ViewProjects;