import { useState } from 'react'

function Editor() {
  const [text, setText] = useState('')
  const [msg, setMsg] = useState('')

  function handleChange(e: any) {
    setText(e.target.value)
  }

  async function saveText() {
    const res = await fetch('http://localhost:3000/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text })
    })
    const data = await res.json()
    if (data.msg == 'saved') {
      setMsg('saved!')
    }
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
    </div>
  )
}

export default Editor