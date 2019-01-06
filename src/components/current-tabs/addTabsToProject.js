import React, { Component } from 'react';
import '../.././App.css';

function Tabs(props){
    const handleChange = (event) => {
      props.oncheck({
        id:parseInt(event.target.dataset.tab_id),
        url:event.target.dataset.url,
        title:event.target.dataset.title,
        isChecked:event.target.checked
      })
    };
    let ListTabs;
    if (props.window){
       ListTabs = props.window.map((tab) => 
        <li className="tabs" key={tab.id}>
          <label>
            <input 
              type="checkbox" 
              onChange={handleChange}
              data-tab_id={tab.id}
              data-url={tab.url}
              data-title={tab.title}
            />
            {tab.title}
          </label>
        </li>
      );
    }
    return (
      <div>
        {ListTabs}
      </div>
    );
  }
  
export default function Window(props){
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