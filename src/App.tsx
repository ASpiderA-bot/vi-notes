import { useState } from 'react'
import Login from './Login'
import Register from './Register'

function App() {
  const [page, setPage] = useState('login')
  const [uid, setUid] = useState('')
  const [text, setText] = useState('')
  const [msg, setMsg] = useState('')

  function handleLogin(id: string) {
    setUid(id)
    setPage('editor')
  }

  function handleChange(e: any) {
    setText(e.target.value)
  }

  async function saveText() {
    const res = await fetch('http://localhost:3000/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text, userId: uid })
    })
    const data = await res.json()
    if (data.msg == 'saved') {
      setMsg('saved!')
    }
  }

  if (page == 'login') {
    return <Login onLogin={handleLogin} onRegister={() => setPage('register')} />
  }

  if (page == 'register') {
    return <Register onDone={() => setPage('login')} />
  }

  return (
    <div>
      <h1>Vi-Notes</h1>
      <textarea
        value={text}
        onChange={handleChange}
        rows={10}
        cols={50}
        placeholder="start writing here..."
      />
      <br />
      <p>word count: {text.split(' ').filter(w => w != '').length}</p>
      <button onClick={saveText}>Save</button>
      <p>{msg}</p>
      <button onClick={() => setPage('login')}>Logout</button>
    </div>
  )
}

export default App
