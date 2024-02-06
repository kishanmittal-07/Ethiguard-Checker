// Object that will hold state (checked/unchecked) for every tab
var states = {};

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {

  // Update state
  states[tab.id] = !states[tab.id];
  
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"check" : states[tab.id]});
  });
  // Toggle icon
  setIcon(states[tab.id]);

});

// Listen for new tab to be activated
chrome.tabs.onActivated.addListener(function(activeInfo) {
  
  if (!(activeInfo.tabId in states)) {
    states[activeInfo.tabId] = false;
  }
  setIcon(states[activeInfo.tabId]);
  
});

// Listen for current tab to be changed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  
  states[tab.id] = false;
  setIcon(false);
  
});

function setIcon(state) {
  
  newIcon = (state) ? "uncheck.png" : "check.png";
    chrome.browserAction.setIcon({
    path: newIcon
  });
  
}
