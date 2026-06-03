import { useState } from 'react'

function Register(props: any) {
  const [n, setN] = useState('')
  const [e, setE] = useState('')
  const [p, setP] = useState('')
  const [p2, setP2] = useState('')
  const [msg, setMsg] = useState('')

  async function doRegister() {
    if (n == '' || e == '' || p == '') {
      setMsg('please fill all fields')
      return
    }

    if (p != p2) {
      setMsg('passwords do not match')
      return
    }

    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: n, email: e, password: p })
    })

    const data = await res.json()
    console.log(data)
    setMsg(data.msg)

    if (data.msg == 'registered ok') {
      props.onDone()
    }
  }

  return (
    <div>
      <h1>Vi-Notes</h1>
      <h2>Register</h2>
      <input
        placeholder="name"
        value={n}
        onChange={(ev) => setN(ev.target.value)}
      />
      <br />
      <input
        placeholder="email"
        value={e}
        onChange={(ev) => setE(ev.target.value)}
      />
      <br />
      <input
        placeholder="password"
        type="password"
        value={p}
        onChange={(ev) => setP(ev.target.value)}
      />
      <br />
      <input
        placeholder="confirm password"
        type="password"
        value={p2}
        onChange={(ev) => setP2(ev.target.value)}
      />
      <br />
      <button onClick={doRegister}>Register</button>
      <p>{msg}</p>
      <p>already have an account? <button onClick={props.onDone}>login here</button></p>
    </div>
  )
}

export default Register
