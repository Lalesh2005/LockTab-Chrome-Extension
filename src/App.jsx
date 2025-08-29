import { useState } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const lockCurrentTab = () => {
    if (!password) {
      setError('Password is required!')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match!')
      return
    }

    // Save password & lock status
    chrome.storage.local.set({ password, isLocked: true }, () => {
      // Inject lock.js into the current tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['src/content/lock.js'],
        })
      })
      window.close() // Close popup after locking
    })
  }

  return (
    <div className="popup">
      <h1>🔒 Tab Locker</h1>
      <input
        type="password"
        placeholder="Set Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button onClick={lockCurrentTab}>Lock This Tab</button>
    </div>
  )
}

export default App