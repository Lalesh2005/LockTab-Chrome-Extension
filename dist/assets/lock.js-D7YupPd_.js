(function(){chrome.storage.local.get(["isLocked","password"],o=>{if(o.isLocked){const e=document.createElement("div");e.innerHTML=`
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        color: white;
        z-index: 999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
      ">
        <h1>🔒 Tab Locked</h1>
        <input 
          type="password" 
          placeholder="Enter Password" 
          style="padding: 10px; font-size: 16px; width: 80%; max-width: 300px;"
          id="locker-password-input"
        />
        <button 
          style="margin-top: 10px; padding: 8px 16px; cursor: pointer;"
          id="locker-unlock-btn"
        >
          Unlock
        </button>
      </div>
    `,document.body.appendChild(e);const t=document.getElementById("locker-password-input"),n=document.getElementById("locker-unlock-btn");n.onclick=()=>{t.value===o.password?(chrome.storage.local.set({isLocked:!1}),e.remove()):alert("❌ Wrong password!")},t.addEventListener("keyup",i=>{i.key==="Enter"&&n.click()}),t.focus()}});
})()
