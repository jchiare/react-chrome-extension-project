/*global chrome*/
import React, { Component } from 'react';
import '../.././App.css';
import { goBack } from 'route-lite';

function ListTabs(props){
    
    let ListProjectTabs;
    if (props.tabs){

        ListProjectTabs = props.tabs.map(tab => 
            <li className="tabs" key={tab.id}>
                <a href={tab.url} target="_blank" rel="noopener noreferrer" >{tab.title}</a>
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
    
    return (
        <ul className="tabs-list">
            <h3>{props.title}</h3>
            <ListTabs tabs={props.tab}/>
        </ul>
    );
    
}

function SavedProjects(props){
    if (props.storage && props.storage.tabs_project){
        const parsed_tabs = props.storage.tabs_project;
        const ListSavedProject = parsed_tabs.map(tabs => 
                <SavedTabs title={tabs.project_title} tab={tabs.tabs}/>
        );
        return ListSavedProject;
    }

    return <p>No projects saved.</p>;
}

class ViewProjects extends Component{
    constructor(props){
        super(props);
        this.state = {
            project:[],
            clear_storage:false
        }
    }

    clearStorage = () => {
        this.setState(
            {clear_storage: !this.state.clear_storage},
            () => chrome.storage.sync.clear()
        );
    };

    componentDidMount(){
        chrome.storage.sync.get('tabs_project',(function(result){
            this.setState({project:result});
        }).bind(this));
    }

    componentDidUpdate(){
        chrome.storage.sync.get('tabs_project',(function(result){
            this.setState({project:result});
        }).bind(this));
    }
    render(){
        return (
            <div className="app">
                <button onClick={() => goBack()}> Select more tabs</button>
                <button onClick={this.clearStorage}>Clear Storage</button>
                <SavedProjects storage={this.state.project}/>
            </div>
        );
    }
}

export default ViewProjects;