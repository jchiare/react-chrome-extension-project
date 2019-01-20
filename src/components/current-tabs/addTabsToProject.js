import React from 'react';
import '../.././App.css';
import { openTab } from '../.././helper.js';

function TitleExpander(props){
  if (props.wind){
    return(
      <>
        <input type="checkbox" id={"menu" + props.wind[0].windowId} className="arrow-checkbox"/>
        <label for={"menu" + props.wind[0].windowId} className="arrow-label"><i id="icon" class="fa fa-arrow-down"></i><h3 className="window-title">{props.title}</h3></label>
      </>
    );
  }
  return null;
  
}

function Tabs(props){
    
  const handleChange = (event) => {
      
      // if event is a "cmd" click, open to the tab -- hidden feature
      if (event.metaKey){ 
        openTab(event);
      } 
      
      // bubble data from clicked element / tab to the main component  
      else {
        props.oncheck({
          id:parseInt(event.target.dataset.tab_id),
          url:event.target.dataset.url,
          title:event.target.dataset.title,
          isChecked:event.target.checked
        })
      }      
    
    };

    let ListTabs;
    if (props.window){
       ListTabs = props.window.map((tab) => 
        <li className="tabs" key={tab.id}>
          <label>
            <input 
              type="checkbox" 
              onClick={handleChange}
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
          <TitleExpander title="Chrome Window" wind={window}/>
          <Tabs window={window} oncheck={props.oncheck}/>
        </ul>
    );
    return (
        <div>
          {ListWindows}
        </div>
    );
}