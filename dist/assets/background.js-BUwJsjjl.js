chrome.runtime.onMessage.addListener((e,s,o)=>{e.action==="lock"&&chrome.storage.local.set({isLocked:!0})});
