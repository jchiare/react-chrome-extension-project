/*global chrome*/

function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0;
}

function formatData(name,data){
  const object = {
    project_title: name,
    tabs:data
  };
  return object;
}

export function addProjectToData(app_name,project_name,data){
  
  chrome.storage.sync.get(app_name,function(result){

    const formatted_data = formatData(project_name,data);

    let retrived_data = []
    if (isEmpty(result)){
      retrived_data.push(formatted_data)
    } else {
      retrived_data = result[app_name].concat(formatted_data);
    }    
    
    chrome.storage.sync.set({[app_name]:retrived_data});
  });
}

export function getOutgoingTabIDs(tabs){
    return tabs.map(e => e.id);
}

export function removeTabs(tabs){
  chrome.tabs.remove(tabs);
}

export function getCurrentTabs(){
    chrome.tabs.query({},(function(tabs){
        let last_window_id = tabs[0].windowId;
        const all_tabs = [];
        let new_set_tabs = [];
  
        // sort through all tabs
        // add tab to the array if it's windowid property matches other tabs within the array 
        // if windowid does not match, then create a new array
        tabs.forEach((tab) => {
          if(tab.windowId!== last_window_id){
            last_window_id = tab.windowId;
            all_tabs.push(new_set_tabs);
            new_set_tabs = [];
          } 
          new_set_tabs.push(tab);
        });
        all_tabs.push(new_set_tabs);
        this.addTabs(all_tabs);
      }).bind(this));
}

export function openTab(event){
  chrome.tabs.get(parseInt(event.target.dataset.tab_id), function(tab) {
    
    chrome.tabs.highlight({
      windowId:tab.windowId,
      'tabs': tab.index
    },

    function(result){

      // if the tab that is highlighted is not in the focused window
      // then bring the window that contains the select tab
      if(!result.focused){ 
        chrome.windows.update(result.id,{focused:true})
      }
    });
  });
}

export function openWindow(tabs){
  chrome.windows.create({url:tabs});
}

export function removeProject(app_name,project_name){
  
  chrome.storage.sync.get(app_name,function(result){

    const filtered_data = result[app_name].filter(project => project.project_title != project_name)

    chrome.storage.sync.set({[app_name]:filtered_data});
  });
}