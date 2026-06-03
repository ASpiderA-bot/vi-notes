import { useState } from 'react'

function Login(props: any) {
  const [e, setE] = useState('')
  const [p, setP] = useState('')
  const [msg, setMsg] = useState('')

  async function doLogin() {
    if (e == '' || p == '') {
      setMsg('please fill all fields')
      return
    }

    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: e, password: p })
    })

    const data = await res.json()
    console.log(data)

    if (data.msg == 'login ok') {
      props.onLogin(data.userId)
    } else {
      setMsg(data.msg)
    }
  }

  return (
    <div>
      <h1>Vi-Notes</h1>
      <h2>Login</h2>
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
      <button onClick={doLogin}>Login</button>
      <p>{msg}</p>
      <p>no account? <button onClick={props.onRegister}>register here</button></p>
    </div>
  )
}

export default Login
