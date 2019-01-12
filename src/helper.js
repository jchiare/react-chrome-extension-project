/*global chrome*/


export function getOutgoingTabIDs(tabs){
    return tabs.map(e => e.id);
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
      if(!result.focused){ // select window if the selected tabs window is not focused
        chrome.windows.update(result.id,{focused:true})
      }
    });
  });
}