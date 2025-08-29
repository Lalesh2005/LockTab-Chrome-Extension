chrome.storage.local.get(['isLocked', 'password'], (data) => {
  if (data.isLocked) {
    const overlay = document.createElement('div')
    overlay.innerHTML = `
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
    `

    document.body.appendChild(overlay)
    const input = document.getElementById('locker-password-input')
    const button = document.getElementById('locker-unlock-btn')

    button.onclick = () => {
      if (input.value === data.password) {
        chrome.storage.local.set({ isLocked: false })
        overlay.remove()
      } else {
        alert('❌ Wrong password!')
      }
    }

    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') button.click()
    })

    input.focus()
  }
})